const { middleware } = require("../middleware/middleware");
const fs = require("fs");
const { getViewHTML, getRequests, acceptRequest } = require("../controllers/friendsRequestsController");

async function requestsList(req, res) {
  switch (req.method) {
    case "GET":
      await middleware(req, res, getViewHTML);
      break;
    default:
      res.write("method not allowed");
  }
}

async function getUserRequests(req,res){
    switch (req.method) {
      case "GET":
        await middleware(req, res, getRequests);
        break;
      default:
        res.write("method not allowed");
    }
  }
  
async function acceptFriendRequest(req,res){
    await middleware(req,res,acceptRequest);
}

module.exports = {
  requestsList,
  getUserRequests,
  acceptFriendRequest
};
