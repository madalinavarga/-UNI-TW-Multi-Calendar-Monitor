const { userModel } = require("../model/user");

async function getAllUsers(req, res) {
  const users = await userModel.find();
  res.write(users.toString());
}

async function getUser(req,res){
  const email=req.email;
  const user = await userModel.findOne({ email: email });
  res.writeHead(200);
  res.write(JSON.stringify(user))
}


async function getFriendById(req, res){
  //console.log("elementul cu indexul 2: "+ req.url.split("/")[2]);
  const friend = await userModel.findOne({ _id: req.url.split("/")[2] });
  res.writeHead(200);
  res.write(JSON.stringify(friend))
}

module.exports = {
  getAllUsers,
  getUser,
  getFriendById
};
