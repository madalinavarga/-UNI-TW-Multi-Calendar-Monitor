const fs = require('fs');
const { getViewHTML, getViewCSS } = require('../controllers/userProfileController');

function userProfile(req, res) {
    switch (req.url) {
        case "/userProfile":
            switch (req.method) {
                case "GET":
                    getViewHTML(req, res);
                    break;
            }
            break;
        case "/style/userProfile.css":
            switch (req.method) {
                case "GET":
                    getViewCSS(req, res);
                    break;
            }
            break;

        default:
            res.write('page not found!');
    }
}

module.exports = {
    userProfile: userProfile
}