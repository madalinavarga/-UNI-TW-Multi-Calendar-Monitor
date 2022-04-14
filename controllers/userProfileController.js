var fs = require('fs');

function getViewHTML(req, res) {
    res.write(fs.readFileSync("./views/UserProfile/userProfile.html"));
}

function getViewUserProfile(req, res) {
    res.write(fs.readFileSync("./views/UserProfile/style/userProfile.css"));
}
module.exports = {
    getViewHTML,
    getViewUserProfile
}