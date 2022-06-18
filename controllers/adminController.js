const fs = require("fs");
const { request } = require("http");
const { userModel } = require("../model/user");

//GET
/*
function getAdminProfile(req, res) {
  if (req.headers.cookie) {
    res.write(fs.readFileSync("./views/AdminProfile/adminProfile.html"));
  } else {
    res.write(fs.readFileSync("./views/Admin/admin.html"));
  }
}
*/

function getAdminProfile(req, res) {
  res.write(fs.readFileSync("./views/AdminProfile/adminProfile.html"));
}

async function deleteUser(req,res){

  if (req.headers.cookie) {
    let body = "";

    req.on("data", function (data) {
      body += data;
    });
  
    req.on("end", async function () {
      try {
        const data = JSON.parse(body);
        console.log("body: " + data.id);

        const user = await userModel.findOne({ _id: data.id }, 'email firstName lastName password email role friends');
        //const userData=user.json();
        console.log("user friends:" +user.friends.length);
        for(let i=0;i<user.friends.length; i++){
          console.log("am ajuns la prietenul: " + user.friends[i]);
            await userModel.updateMany(
              {
                _id: user.friends[i],
              },
              {
                $pull: {
                  friends: user.id,
                }
              }
            )
        }
        //await userModel.deleteOne({_id: user.id})
      
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

async function addAdmin(req,res){
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
          {_id: data.id},
          {
            $set: {
              role:"1"
            }
          }
        )
        
      
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
  getAdminProfile,deleteUser, addAdmin
};
