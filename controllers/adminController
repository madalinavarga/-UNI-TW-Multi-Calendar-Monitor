const fs = require("fs");
const { request } = require("http");

//GET
function getViewHTML(req, res) {
  if (req.headers.cookie) {
    res.write(fs.readFileSync("./views/Admin/admin.html"));
  } else {
    res.write(fs.readFileSync("./views/Home/home.html"));
  }
}

module.exports = {
  getViewHTML,
};
