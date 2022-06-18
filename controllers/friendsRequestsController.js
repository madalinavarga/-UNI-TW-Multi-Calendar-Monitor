const fs = require("fs");
const { request } = require("http");

async function getRequests(req, res) {
    const user = await userModel.findOne({ email: req.email });
    const friendsIds = user.friendsRequests;
  
    const users = await userModel.find({ _id: { $in: friendsIds } }, "firstName lastName");
    console.log("controooler" + users);
  
    if (users != null) {
      const data = await response.json();
      res.writeHead(200);
      res.write(JSON.stringify(data));
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