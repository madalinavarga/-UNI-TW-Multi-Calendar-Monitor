const fs = require("fs");
const { userModel } = require("../model/user");
const { request } = require("http");

async function getRequests(req, res) {
  console.log("functie");
  const user = await userModel.findOne({ email: req.email });
  const friendsIds = user.friendsRequests;

  const users = await userModel.find(
    { _id: { $in: friendsIds } },
    "firstName lastName"
  );

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

async function acceptRequest(req, res) {
  const idUserSender = new URLSearchParams(req.params).get("userId");
  const action = new URLSearchParams(req.params).get("action");

  const receiver = await userModel.findOne({ email: req.email });
  const sender = await userModel.findOne({ _id: idUserSender });

  if (action == "accept") {
    receiver.friends.push(sender._id);
    sender.friends.push(receiver._id)  
  }

  // sterge request
  receiver.friendsRequests = receiver.friendsRequests.filter(friendId => friendId.toString() != sender._id.toString())
  
  await userModel.findOneAndUpdate(
    { _id: receiver._id },
    { ...receiver }
  );

  await userModel.findOneAndUpdate(
    { _id: sender._id },
    { ...sender }
  );
}

module.exports = {
  getRequests,
  getViewHTML,
  acceptRequest,
};
