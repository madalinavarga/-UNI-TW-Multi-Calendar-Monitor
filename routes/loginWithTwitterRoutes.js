const { loginUserWithTwitter } = require("../controllers/loginController");
const { middleware } = require("../middleware/middleware");

async function loginWithTwitter(req, res) {
  switch (req.method) {
    case "GET":
      await middleware(req, res, loginUserWithTwitter)
      break;

    default:
      res.write("method not allowed");
  }
}

module.exports = {
  loginWithTwitter
};