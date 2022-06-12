const fs = require("fs");
const { userModel } = require("../model/user");

function getViewHTML(req, res) {
  res.write(fs.readFileSync("./views/UserProfile/userProfile.html"));
}

async function editProfile(req, res) {
  return new Promise((resolve) => {
    let body = "";

    req.on("data", function (data) {
      body += data;
    });

    req.on("end", async function () {
      try {
        const data = JSON.parse(body);
        const user = await userModel.findOneAndUpdate(
          { email: data.email },
          { ...data },
          { new: true }
        );
        res.writeHead(200);
        res.write(JSON.stringify(user));
      } catch (err) {
        res.writeHead(500);
      } finally {
        resolve();
      }
    });
  });
}

module.exports = {
  getViewHTML,
  editProfile,
};
