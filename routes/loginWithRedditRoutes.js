const { loginUserWithReddit } = require("../controllers/loginController");
const { middleware } = require("../middleware/middleware");

async function loginWithReddit(req, res) {
  switch (req.method) {
    case "GET":
      await middleware(req, res, loginUserWithReddit);
      break;

    default:
      res.write("method not allowed");
  }
}

module.exports = {
  loginWithReddit,
};
