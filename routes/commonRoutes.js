var fs = require('fs');
var { getLogo, getImgFacebook, getImgInstagram, getImgTwitter, getViewLayout } = require('../controllers/commonController')

function common(req, res) {
    switch (req.url) {
        case "/images/logo.svg":
            switch (req.method) {
                case "GET":
                    getLogo(req, res);
                    break;

                default:
                    res.write('method not allowed');
            }
            break;
        case "/images/facebook-icon.png":
            switch (req.method) {
                case "GET":
                    getImgFacebook(req, res);
                    break;

                default:
                    res.write('method not allowed');
            }
            break;
        case "/images/twitter-icon.png":
            switch (req.method) {
                case "GET":
                    getImgTwitter(req, res);
                    break;

                default:
                    res.write('method not allowed');
            }
            break;
        case "/images/instagram-icon.png":
            switch (req.method) {
                case "GET":
                    getImgInstagram(req, res);
                    break;

                default:
                    res.write('method not allowed');
            }
            break;
        case "/public/layout.css":
            switch (req.method) {
                case "GET":
                    getViewLayout(req, res);
                    break;
                default:
                    res.write('method not allowed');
            }
        default:
            res.write('page not found!'); //write a response to the client

    }
}

module.exports = {
    common: common
}