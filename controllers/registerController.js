var fs = require('fs');

function getViewHTML(req, res) {
    res.write(fs.readFileSync('./views/register.html'));
}

module.exports = {
    getViewHTML: getViewHTML
}