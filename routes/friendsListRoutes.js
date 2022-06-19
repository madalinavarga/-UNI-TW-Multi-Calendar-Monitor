const fs = require("fs");
const {
  getViewHTML,
  getFriendsList,
  getTwitterFriends,
  sendFriendRequest,
  getRequests,
  deleteExistingFriend,
} = require("../controllers/friendsListController");
const { getEventsByFriendId } = require("../controllers/calendarController");
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

async function friendsCalendar(req, res) {
  switch (req.method) {
    case "GET":
      await middleware(req, res, getEventsByFriendId);
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

async function addFriend(req,res){
  switch (req.method) {
    case "POST":
      await middleware(req, res, sendFriendRequest);
      break;
    default:
      res.write("method not allowed");
  }
}

async function deleteFriend(req,res){
  await middleware(req,res,deleteExistingFriend);
}

module.exports = {
  friendsList,
  getFriends,
  friendsCalendar,
  twitterFriends,
  addFriend,
  deleteFriend
};
