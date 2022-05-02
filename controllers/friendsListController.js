const fs = require('fs');

function getViewHTML(req, res) {
    res.write(fs.readFileSync("./views/FriendsList/friendsList.html"));
}

function getViewCSS(req, res) {
    res.write(fs.readFileSync("./views/FriendsList/style/friendsList.css"));
}

module.exports = {
    getViewHTML,
    getViewCSS
}