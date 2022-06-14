const { userModel } = require("../model/user");

async function getUsersList(req, res) {
  const users = await userModel.find();
  /*res.write(users.toString());*/
  res.writeHead(200);
  res.write(JSON.stringify(users))

}

module.exports = {
    getUsersList
    //getUser
  };

