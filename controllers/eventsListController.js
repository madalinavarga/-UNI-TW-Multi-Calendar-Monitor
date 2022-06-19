const { eventModel } = require("../model/event");

async function getEventsList(req,res){
  const events = await eventModel.find();
  /*res.write(users.toString());*/
  res.writeHead(200);
  res.write(JSON.stringify(events))
  }

  module.exports = {
    getEventsList
  };