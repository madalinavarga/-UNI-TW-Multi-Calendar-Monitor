const fs = require("fs");
const bcrypt = require('bcrypt');
const { requestModel } = require("../model/request");
const { userModel } = require("../model/user");


async function postEventRequest(req, res) {
    return await new Promise((resolve) => {
      let body = "";
  
      req.on("data", function (data) {
        body += data;
      });
  
      req.on("end", async function () {
        try {
          const data = JSON.parse(body);
          //console.log(data);
          let result = await requestModel.create(data);
          //console.log("id of new request", result.id);
          //console.log("data.toWhom", data.toWhom);
          await userModel.findOneAndUpdate(
            {
                _id: data.toWhom,
            },
            {
                $addToSet: {
                    eventsRequests: result.id,
                }
            }
          )
          //await requestModel.create({ ...data,password:encryptedPassword, role: 0, friends: [], events: []});
          res.writeHead(201);
        } catch (err) {
          console.log(err);
          res.writeHead(500);
        } finally {
          resolve(); //continue, no more await
        }
      });
    });
}


async function getRequestEventById(req, res){
    console.log("elementul cu indexul 2: "+ req.url.split("/")[2]);
    const request = await requestModel.findOne({ _id: req.url.split("/")[2] });
    res.writeHead(200);
    res.write(JSON.stringify(request))
}



/*
async function getEventsByFriendId(req, res) {
  const email = req.email;
  const user = await userModel.findOne({ email: email });
  if (user != null) {
    const friend = await userModel.findOne({
      _id: user.friends[req.url.split("/")[2]],
    });
    if (friend != null) {
      const events = await eventModel.find(
        { _id: { $in: friend.events } },
        "dateEvent startEvent endEvent color title"
      );
      if (events != null) {
        res.writeHead(201);
        res.write(JSON.stringify(events));
        return;
      }
    }
  }

  res.writeHead(400);
}

*/

module.exports = {
    postEventRequest,
    getRequestEventById,
};
  