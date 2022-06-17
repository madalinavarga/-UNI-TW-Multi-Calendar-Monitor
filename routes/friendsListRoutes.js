const fs = require("fs");
const {
  getViewHTML,
  getFriendsList,
} = require("../controllers/friendsListController");
const { getEventsByFriendId } = require("../controllers/calendarController");
const { middleware } = require("../middleware/middleware");

function friendsList(req, res) {
  switch (req.method) {
    case "GET":
      middleware(req, res, getViewHTML);
      break;
    default:
      res.write("method not allowed");
  }
}

async function getFriends(req, res) {
  switch (req.method) {
    case "GET":
      await middleware(req, res, getFriendsList);
      break;
    default:
      res.write("method not allowed");
  }
}

async function friendsCalendar(req, res) {
  switch (req.method) {
    case "GET":
      await middleware(req, res, getEventsByFriendId);
      break;
    default:
      res.write("method not allowed");
  }
}
module.exports = {
  friendsList,
  getFriends,
  friendsCalendar,
};
