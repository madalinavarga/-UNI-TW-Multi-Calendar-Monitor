const fs = require('fs');
const { getViewHTML, editProfile } = require('../controllers/userProfileController');
const { middleware } = require("../middleware/middleware")

function userProfile(req, res) {
    switch (req.method) {
        case "GET":
            middleware(req, res, getViewHTML)
            break;
    }

}

async function editUserProfile(req,res){
    switch (req.method) {
        case "PUT":
           await  middleware(req, res, editProfile)
            break;
    }
}

module.exports = {
    userProfile: userProfile,
    editUserProfile
}