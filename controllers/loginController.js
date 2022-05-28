const fs = require("fs");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user");
const bcrypt = require("bcrypt");

//GET
function getViewHTML(req, res) {
  res.write(fs.readFileSync("./views/Login/login.html"));
}

//POST
async function loginUser(req, res) {
  return new Promise((resolve) => {
    let body = "";

    req.on("data", function (data) {
      body += data;
    });

    req.on("end", async function () {
      try {
        const data = JSON.parse(body);
        const user = await userModel.findOne({ email: data.email });
        if (user != null) {
          if (await bcrypt.compare(data.password, user.password)) {
            const token = jwt.sign({ user }, "student");
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200, {
              "Set-Cookie": `token=${token}; HttpOnly`,
            });
            res.write(token);
            return;
          }
        }
        res.writeHead(400);
      } catch (error) {
        console.log(error);
        res.writeHead(500);
      } finally {
        resolve(); //continue, no more await
      }
    });
  });
}

async function loginUserWithGoogle(req, res) {
  const queryParams = {
    code: new URLSearchParams(req.params).get("code"),
    client_id:"",
    client_secret: "",
    redirect_uri: "http://localhost:4000/login/google",
    grant_type: "authorization_code",
  };

  const response = await fetch(
    "https://oauth2.googleapis.com/token?" + new URLSearchParams(queryParams),
    {
      method: "POST",
    }
  );
  const data = await response.json();
  const userData = JSON.parse(atob(data.id_token.split(".")[1]));

  const user = await userModel.findOne({ email: userData.email });
  if (!user) {
    res.writeHead(302, {
      Location: `http://localhost:4000/login?failed=true`,
    });
    return;
  }

  const token = jwt.sign({ user }, "student");
  res.writeHead(302, {
    Location: `http://localhost:4000`,
    "Set-Cookie": `token=${token}; HttpOnly; path=/`,
  });
}

module.exports = {
  getViewHTML,
  loginUser,
  loginUserWithGoogle,
};
