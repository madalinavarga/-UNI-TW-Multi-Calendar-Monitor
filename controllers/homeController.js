const fs = require("fs");
const { request } = require("http");

//GET
function getViewHTML(req, res) {
  const cookie=req.headers.cookie;
  if (cookie && cookie.includes("token")) {
    res.write(fs.readFileSync("./views/Home-logged/home-logged.html"));
  } else {
    res.write(fs.readFileSync("./views/Home/home.html"));
  }
}

module.exports = {
  getViewHTML,
};
