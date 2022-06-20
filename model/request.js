const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  dateRequest: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  fromWhom:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  toWhom:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});
const requestModel = mongoose.model("requests", requestSchema, "requests");

module.exports = {
    requestModel,
};
