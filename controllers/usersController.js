const { userModel } = require("../model/user");
async function getAllUsers(req, res) {
  const users = await userModel.find();
  res.write(users.toString());
}

module.exports = {
  getAllUsers,
};
