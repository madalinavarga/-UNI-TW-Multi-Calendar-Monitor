const fs = require("fs");
const { request } = require("http");

//GET
function getViewHTML(req, res) {
  const cookie = req.headers.cookie;
  if (cookie && cookie.includes("token")) {
    const token = cookie.split("token=")[1];
    const userData = JSON.parse(atob(token.split(".")[1]));
    const role = userData.user.role;
    if (role == 0) {
      res.write(fs.readFileSync("./views/Home-logged/home-logged.html"));
    } else {
      res.write(fs.readFileSync("./views/Admin/admin.html"));
    }
  } else {
    res.write(fs.readFileSync("./views/Home/home.html"));
  }
}

module.exports = {
  getViewHTML,
};
