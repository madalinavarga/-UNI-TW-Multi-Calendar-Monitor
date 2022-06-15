const fs = require("fs");
const {
  getEvents,
  createEvent,
  getViewHTML,
} = require("../controllers/calendarController");
const { middleware } = require("../middleware/middleware");

async function calendarRoutes(req, res) {
  switch (req.method) {
    case "GET":
      await middleware(req, res, getViewHTML);
      // middleware(req, res, getEvents);
      break;
    case "POST":
     await  middleware(req, res, createEvent);
     break;

    default:
      res.write("method not allowed");
  }
}

async function eventsRoutes(req, res) {
  console.log("ruta");
  switch (req.method) {
    case "GET":
      await middleware(req, res, getEvents);
      break;
      
    default:
      res.write("method not allowed");
  }
}

module.exports = {
  calendarRoutes,
  eventsRoutes,
};
