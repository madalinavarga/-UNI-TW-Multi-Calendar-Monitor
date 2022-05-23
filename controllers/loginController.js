const fs = require("fs");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user");
const bcrypt = require("bcrypt");
const { getGoogleAuthURL } = require("../utils/getGoogleAuthUrl");
const querystring = require('querystring');

//GET
function getViewHTML(req, res) {
  res.write(fs.readFileSync("./views/Login/login.html"));
}

//POST
async function loginUser(req, res) {
  return await new Promise((resolve) => {
    let body = "";

    req.on("data", function (data) {
      body += data;
    });

    req.on("end", async function () {
      const data = JSON.parse(body);
      try {
        const user = await userModel.findOne({ email: data.email });
        if (user != null)
          if (await bcrypt.compare(data.password, user.password)) {
            const token = jwt.sign({ user }, "student");
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.write(token);
            return;
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
  console.log(req.params)

  const queryParams = {
    code: new URLSearchParams(req.params).get("code"),
    client_id: "",
    client_secret: "",
    redirect_uri: "http://localhost:4000/login/google",
    grant_type: 'authorization_code',
  };

  const response = await fetch("https://oauth2.googleapis.com/token?" + new URLSearchParams(queryParams), {
    method: "POST"
  })
  const data = await response.json()
  const userData = JSON.parse(atob(data.id_token.split('.')[1]))

  console.log("google:" ,data)
  res.writeHead(200);
  res.write(JSON.stringify(userData))
}

module.exports = {
  getViewHTML,
  loginUser,
  loginUserWithGoogle,
};
