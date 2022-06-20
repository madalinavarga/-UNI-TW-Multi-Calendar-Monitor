const fs = require('fs');
const { getViewHTML, responseRequest } = require('../controllers/requestsController');
const { middleware } = require('../middleware/middleware');


async function requestsMeetings(req, res) {
    switch (req.method) {
        case "GET":
            getViewHTML(req, res);
            break;
        default:
            res.write('method not allowed');
    }
}

async function responseRequestMeet(req,res){
   await middleware(req,res,responseRequest)
}

module.exports = {
    requestsMeetings,
    responseRequestMeet
}