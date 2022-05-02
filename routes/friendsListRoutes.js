const fs = require('fs');
const { getViewHTML, getViewCSS } = require("../controllers/friendsListController");

function friendsList(req, res) {
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
        case "/style/friendsList.css":
            getViewCSS(req, res);
        default:
            res.write('page not found');

    }
}

module.exports = {
    friendsList: friendsList
}