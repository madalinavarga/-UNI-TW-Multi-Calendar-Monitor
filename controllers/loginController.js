const fs = require("fs");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user");
const bcrypt = require('bcrypt');

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

module.exports = {
  getViewHTML,
  loginUser,
};
