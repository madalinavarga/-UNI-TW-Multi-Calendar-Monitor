const fs = require('fs');
const { getViewHTML } = require("../controllers/friendsListController");

function friendsList(req, res) {
    switch (req.method) {
        case "GET":
            getViewHTML(req, res);
            break;
        default:
            res.write('method not allowed');
    }
}

module.exports = {
    friendsList: friendsList
}