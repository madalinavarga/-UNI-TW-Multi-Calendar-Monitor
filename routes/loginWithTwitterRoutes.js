const { loginUserWithTwitter } = require("../controllers/loginController");

async function loginWithTwitter(req, res) {
  switch (req.method) {
    case "GET":
      await loginUserWithTwitter(req, res);
      break;

    default:
      res.write("method not allowed");
  }
}

module.exports = {
  loginWithTwitter
};