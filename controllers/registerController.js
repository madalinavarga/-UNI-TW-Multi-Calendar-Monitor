var fs = require('fs');

function getView(req, res) {
    res.write(fs.readFileSync('./views/register.html'));
}

module.exports = {
    getView: getView
}