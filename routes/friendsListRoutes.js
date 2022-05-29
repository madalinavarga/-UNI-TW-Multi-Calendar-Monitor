const fs = require('fs');
const { getViewHTML } = require("../controllers/friendsListController");
const { middleware } = require("../middleware/middleware")


function friendsList(req, res) {
    switch (req.method) {
        case "GET":
            middleware(req, res, getViewHTML)
            break;
        default:
            res.write('method not allowed');
    }
}

module.exports = {
    friendsList: friendsList
}