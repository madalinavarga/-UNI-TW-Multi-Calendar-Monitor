const fs = require('fs');
const { middleware } = require("../middleware/middleware");
const { postEventRequest } = require('../controllers/eventRequestController')
const { getRequestEventById } = require('../controllers/eventRequestController')
//const { getEventRequest } = require('../controllers/eventRequestController')

async function eventRequestRoutes(req, res) {
    switch (req.method) {
        case "POST":
            await middleware(req, res, postEventRequest);
            break;
        /*
        case "GET":
            await middleware(req, res, getEventRequest);
            break;
        */
        default:
            res.write('method not allowed');
    }
}


async function requestEvent(req, res) {
    switch (req.method) {
      case "GET":
        await middleware(req, res, getRequestEventById);
        break;
      default:
        res.write("method not allowed");
    }
  }


//async function eventRequestRoutes(req, res)


module.exports = {
    eventRequestRoutes,
    requestEvent,
}