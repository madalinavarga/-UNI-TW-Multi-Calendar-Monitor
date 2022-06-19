const fs = require('fs');
const { getViewHTML } = require('../controllers/requestsController');


async function requestsMeetings(req, res) {
    switch (req.method) {
        case "GET":
            getViewHTML(req, res);
            break;
        default:
            res.write('method not allowed');
    }
}

module.exports = {
    requestsMeetings
}