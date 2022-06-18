const fs = require("fs");
const { userModel } = require("../model/user");

function getViewHTML(req, res) {
  res.write(fs.readFileSync("./views/FriendsList/friendsList.html"));
}

async function getFriendsList(req, res) {
  const email = req.email;
  const user = await userModel.findOne({ email: email });
  if (user != null) {
    const friends = await userModel.find(
      { _id: { $in: user.friends } },
      "firstName lastName email"
    );
    res.writeHead(200);
    res.write(JSON.stringify(friends));
    return;
  }
  res.writeHead(400);
}

async function getTwitterFriends(req, res) {
  const cookie = req.headers.cookie;
  const twitterId = cookie
    .split(";")
    .find((cookie) => cookie.includes("twitterId"))
    .split("=")[1];

  const response = await fetch(
    `http://localhost:5000/friends/twitter?twitterId=${twitterId}&email=${req.email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response != null) {
    const data = await response.json();
    res.writeHead(200);
    res.write(JSON.stringify(data));
    return;
  }

  res.writeHead(400);
}

async function sendFriendRequest(req, res) {
  const idUser = new URLSearchParams(req.params).get("userId");
  const receiver = await userModel.findOne({ _id: idUser });
  const sender = await userModel.findOne({ email: req.email });
  if (!receiver.friendsRequests.includes(sender._id)) {
    await userModel.findOneAndUpdate(
      { _id: idUser },
      { $push: { friendsRequests: sender._id } }
    );
    res.writeHead(200);
    return;
  }
  res.writeHead(400);
}


module.exports = {
  getViewHTML,
  getFriendsList,
  getTwitterFriends,
  sendFriendRequest,
};
