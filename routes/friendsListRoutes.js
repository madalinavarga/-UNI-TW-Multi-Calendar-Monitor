var fs = require('fs');
var { getViewHTML } = require("../controllers/friendsListController");

function getFriendsList(req, res) {
    switch (req.url) {
        case "/friendsList":
            switch (req.method) {
                case "GET":
                    getViewHTML(req, res);
                    break;
                default:
                    res.write('method not allowed');

            }
            break;

        default:
            res.write('page not found');

    }
}

module.exports = {
    getFriendsList: getFriendsList
}