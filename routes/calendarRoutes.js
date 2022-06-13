const fs = require("fs");
const {
  getEvents,
  createEvent,
  getViewHTML,
} = require("../controllers/calendarController");
const { middleware } = require("../middleware/middleware");

function calendarRoutes(req, res) {
  switch (req.method) {
    case "GET":
      middleware(req, res, getViewHTML);
      // middleware(req, res, getEvents);
      break;
    case "POST":
      middleware(req, res, createEvent);
    default:
      res.write("method not allowed");
  }
}

function eventsRoutes(req, res) {
  switch (req.method) {
    case "GET":
      middleware(req, res, getEvents);
    default:
      res.write("method not allowed");
  }
}

module.exports = {
  calendarRoutes,
  eventsRoutes,
};
