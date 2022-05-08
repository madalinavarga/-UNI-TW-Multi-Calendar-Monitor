const fs = require('fs');
const { getViewHTML } = require('../controllers/userProfileController');

function userProfile(req, res) {
    switch (req.method) {
        case "GET":
            getViewHTML(req, res);
            break;
    }

}

module.exports = {
    userProfile: userProfile
}