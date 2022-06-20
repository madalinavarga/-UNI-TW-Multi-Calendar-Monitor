const fs = require("fs");
const {
  getEvents,
  createEvent,
  getViewHTML,
} = require("../controllers/calendarController");
const {
  getGoogleCalendarEvents,
} = require("../controllers/googleCalendarController");
const { middleware } = require("../middleware/middleware");

async function calendarRoutes(req, res) {
  switch (req.method) {
    case "GET":
      await middleware(req, res, getViewHTML);
      break;
    case "POST":
      await middleware(req, res, createEvent);
      break;
    default:
      res.write("method not allowed");
  }
}

async function eventsRoutes(req, res) {
  switch (req.method) {
    case "GET":
      await middleware(req, res, getEvents);
      break;
    default:
      res.write("method not allowed");
  }
}

async function googleCalendarRoutes(req, res) {
  switch (req.method) {
    case "GET":
      try {
        await middleware(req, res, getGoogleCalendarEvents);
      } catch {
        console.log("err");
      }
      break;
    default:
      res.write("method not allowed");
  }
}

module.exports = {
  calendarRoutes,
  eventsRoutes,
  googleCalendarRoutes,
};
