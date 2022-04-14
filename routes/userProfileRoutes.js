var fs = require('fs');
var { getViewHTML, getViewUserProfile } = require('../controllers/userProfileController');

function getUserProfile(req, res) {
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
                    getViewUserProfile(req, res);
                    break;
            }
            break;

        default:
            res.write('page not found!');
    }
}

module.exports = {
    getUserProfile: getUserProfile
}