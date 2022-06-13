const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  dateEvent: {
    type: String,
    required: true,
  },
  startEvent: {
    type: String,
    required: true,
  },
  endEvent: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  //   users:[{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'users'
  //   }]
});
const eventModel = mongoose.model("events", eventSchema, "events");

module.exports = {
  eventModel,
};
