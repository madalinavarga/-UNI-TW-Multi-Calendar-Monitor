const fs = require("fs");

function getViewHTML(req, res) {
    res.write(fs.readFileSync("./views/Requests/requests.html"));
  }

module.exports={
    getViewHTML
}
  