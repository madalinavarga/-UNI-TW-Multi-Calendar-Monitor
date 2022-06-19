const fs = require("fs");
const { userModel } = require("../model/user");
const { request } = require("http");

async function getRequests(req, res) {
    const user = await userModel.findOne({ email: req.email });
    const friendsIds = user.friendsRequests;
  
    const users = await userModel.find({ _id: { $in: friendsIds } }, "firstName lastName");
  
    if (users != null) {
      res.writeHead(200);
      res.write(JSON.stringify(users));
      return;
    }
  
    res.writeHead(400);
  }

  function getViewHTML(req, res) {
    res.write(fs.readFileSync("./views/FriendsRequests/friendsRequests.html"));
  }
  module.exports = {
    getRequests,
    getViewHTML
  }