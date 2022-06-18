const fs = require("fs");
const bcrypt = require('bcrypt');
const { userModel } = require("../model/user");

//routes
function getViewHTML(req, res) {
  res.write(fs.readFileSync("./views/Register/register.html"));
}

async function registerUser(req, res) {
  return await new Promise((resolve) => {
    let body = "";

    req.on("data", function (data) {
      body += data;
    });

    req.on("end", async function () {
      try {
        const data = JSON.parse(body);
        const encryptedPassword = await bcrypt.hash(data.password, 10);
        await userModel.create({ ...data,password:encryptedPassword, role: 0, friends: [], events: []});
        res.writeHead(201);
      } catch (err) {
        console.log(err);
        res.writeHead(500);
      } finally {
        resolve(); //continue, no more await
      }
    });
  });
}

module.exports = {
  getViewHTML,
  registerUser,
};
