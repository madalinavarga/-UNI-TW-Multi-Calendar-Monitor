const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  },
  twitterName: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
    },
  ],
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  friendsRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ]
});
const userModel = mongoose.model("users", userSchema, "users");

module.exports = {
  userModel,
};
