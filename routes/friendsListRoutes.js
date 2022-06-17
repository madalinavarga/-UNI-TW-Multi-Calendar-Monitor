const fs = require("fs");
const {
  getViewHTML,
  getFriendsList,
  getTwitterFriends,
} = require("../controllers/friendsListController");
const { middleware } = require("../middleware/middleware");

async function friendsList(req, res) {
  switch (req.method) {
    case "GET":
      await middleware(req, res, getViewHTML);
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

async function twitterFriends(req, res) {
  switch (req.method) {
    case "GET":
      await middleware(req, res, getTwitterFriends);
      break;
    default:
      res.write("method not allowed");
  }
}

module.exports = {
  friendsList,
  getFriends,
  twitterFriends,
};
