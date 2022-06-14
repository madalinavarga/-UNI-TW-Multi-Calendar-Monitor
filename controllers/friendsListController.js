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

module.exports = {
  getViewHTML,
  getFriendsList,
};
