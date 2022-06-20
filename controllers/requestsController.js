const fs = require("fs");
const { eventModel } = require("../model/event");
const { requestModel } = require("../model/request");
const { userModel } = require("../model/user");

function getViewHTML(req, res) {
    res.write(fs.readFileSync("./views/Requests/requests.html"));
  }

async function responseRequest(req,res){
  const idUserSender = new URLSearchParams(req.params).get("userId");
  const idRequest = new URLSearchParams(req.params).get("requestId");
  const action = new URLSearchParams(req.params).get("action");

  const receiver = await userModel.findOne({ email: req.email });
  const sender = await userModel.findOne({ _id: idUserSender });
  if (action == "accept") {
    const request= await requestModel.findOne({_id:idRequest});
    const newEvent =await  eventModel.create({ dateEvent:request.dateRequest, startEvent:request.startEvent, endEvent:request.endEvent,color:'blue', title:request.title, });
    receiver.events.push(newEvent._id); 
    sender.events.push(newEvent._id);
  }

  // sterge request
  receiver.eventsRequests = receiver.eventsRequests.filter(eventId => eventId.toString().includes(idRequest));
  await requestModel.deleteOne({_id: idRequest});
  
  await userModel.findOneAndUpdate(
    { _id: receiver._id },
    { ...receiver }
  );

  await userModel.findOneAndUpdate(
    { _id: sender._id },
    { ...sender }
  );

}

module.exports={
    getViewHTML,
    responseRequest
}
  