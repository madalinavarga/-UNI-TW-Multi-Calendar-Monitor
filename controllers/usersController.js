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

module.exports = {
  getAllUsers,
  getUser
};
