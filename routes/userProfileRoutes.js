const fs = require('fs');
const { getViewHTML } = require('../controllers/userProfileController');
const { middleware } = require("../middleware/middleware")

function userProfile(req, res) {
    switch (req.method) {
        case "GET":
            //getViewHTML(req, res);
            middleware(req, res, getViewHTML)
            break;
    }

}

module.exports = {
    userProfile: userProfile
}