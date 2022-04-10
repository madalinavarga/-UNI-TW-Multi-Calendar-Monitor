var fs = require('fs');

function getViewHTML(req, res) {
    res.write(fs.readFileSync("./views/FriendsList/friendsList.html"));
}
module.exports = {
    getViewHTML: getViewHTML
}