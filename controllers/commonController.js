var fs = require('fs');

//GET
function getLogo(req, res) {
    res.setHeader("Content-Type", "image/svg+xml");
    res.write(fs.readFileSync('./images/logo.svg'));
}

function getImgFacebook(req, res) {
    res.write(fs.readFileSync('./images/facebook-icon.png'));
}

function getImgTwitter(req, res) {
    res.write(fs.readFileSync('./images/twitter-icon.png'));
}

function getImgInstagram(req, res) {
    res.write(fs.readFileSync('./images/instagram-icon.png'));
}

function getViewLayout(req, res) {
    res.write(fs.readFileSync('./public/global/layoutStyle/style.css'));
}


module.exports = {
    getLogo: getLogo,
    getImgFacebook: getImgFacebook,
    getImgInstagram: getImgInstagram,
    getImgTwitter: getImgTwitter,
    getViewLayout: getViewLayout,
}