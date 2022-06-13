const fs = require("fs");
const {
  getEventsPerDay,
  createEvent,
  getViewHTML,
} = require("../controllers/calendarController");
const { middleware } = require("../middleware/middleware");

function calendarRoutes(req, res) {
  switch (req.method) {
    case "GET":
      middleware(req, res, getViewHTML);
      break;
    case "POST":
      middleware(req, res, createEvent);
    default:
      res.write("method not allowed");
  }
}

module.exports = {
  calendarRoutes,
};
