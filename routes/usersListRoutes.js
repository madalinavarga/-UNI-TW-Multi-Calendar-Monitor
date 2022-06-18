const { getUsersList } = require("../controllers/usersListController");
const { middleware } = require("../middleware/middleware");

const { getUser } = require('../controllers/usersController');

async function usersListRoutes(req, res) {
  switch (req.method) {
    case "GET":
      await middleware(req, res, getUsersList);
      break;
    default:
      res.write("page not found!");
  }
}

module.exports = {
  usersListRoutes,
};
