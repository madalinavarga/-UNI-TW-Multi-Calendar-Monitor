const fs = require('fs');

function getViewHTML(req, res) {
    res.write(fs.readFileSync("./views/Calendar/calendar.html"));
}

module.exports = {
    getViewHTML,
}