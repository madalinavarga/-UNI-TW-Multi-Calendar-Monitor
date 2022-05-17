const fs = require('fs');
const { getViewHTML } = require("../controllers/calendarController");

function calendarRoutes(req, res) {
    switch (req.method) {
        case "GET":
            getViewHTML(req, res);
            break;
        default:
            res.write('method not allowed');
    }
}

module.exports = {
    calendarRoutes
}