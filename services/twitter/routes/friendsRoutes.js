const { twitterFriends } = require("../controllers/friendsController");

async function getFriends(req,res){
    switch (req.method) {
        case "GET":
            await twitterFriends(req, res);
          break;

        default:
          res.write("method not allowed");
      }
}

module.exports = {
    getFriends,
  };