const fs = require("fs");
const { request } = require("http");
const { userModel } = require("../model/user");

//GET

function getAdminProfile(req, res) {
  res.write(fs.readFileSync("./views/AdminProfile/adminProfile.html"));
}

async function deleteUser(req, res) {
  const idUser = new URLSearchParams(req.params).get("userId");
  const user = await userModel.findOne(
    { _id: idUser },
    "email firstName lastName password email role friends"
  );
  if (user != null) {
    userFriends = user.friends;
   
    //sterg pe rand 
    for (let i = 0; i < user.friends.length; i++) {
      let friendUser=await userModel.findOne({ _id: userFriends[i] } );
      friendUser.friends = friendUser.friends.filter(friendId => friendId.toString() != idUser.toString())
      await userModel.findOneAndUpdate(
        { _id: friendUser._id },
        { ...friendUser }
      );
    }

    //sterg user 
    await userModel.deleteOne({ _id: idUser });
    res.writeHead(200);
    return;
  }
  res.writeHead(500);
}

async function addAdmin(req, res) {
  if (req.headers.cookie) {
    let body = "";

    req.on("data", function (data) {
      body += data;
    });

    req.on("end", async function () {
      try {
        const data = JSON.parse(body);
        console.log("body: " + data.id);

        await userModel.updateOne(
          { _id: data.id },
          {
            $set: {
              role: "1",
            },
          }
        );

        res.writeHead(200);
      } catch (err) {
        console.log(err);
        res.writeHead(500);
      } finally {
        //   resolve(); //continue, no more await
      }
    });
  } else {
    console.log("admin nu e logat");
  }
}

module.exports = {
  getAdminProfile,
  deleteUser,
  addAdmin,
};
