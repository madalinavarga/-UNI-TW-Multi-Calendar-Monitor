var fs = require("fs");

function getViewHTML(req, res) {
  res.write(fs.readFileSync("./views/Register/register.html"));
}

module.exports = {
  getViewHTML: getViewHTML,
};
