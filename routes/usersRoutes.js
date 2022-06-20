const { getUser } = require('../controllers/usersController');
const { getFriendById } = require('../controllers/usersController');
const { middleware } = require("../middleware/middleware")

async function usersRoutes(req, res) {
    switch (req.method) {
        case 'GET':
           await middleware(req, res, getUser);
           break;
        default:
            res.write('page not found!');
    }
}

async function friendUser(req, res) {
    switch (req.method) {
      case "GET":
        await middleware(req, res, getFriendById);
        break;
      default:
        res.write("method not allowed");
    }
  }

module.exports = {
    usersRoutes,
    friendUser
}