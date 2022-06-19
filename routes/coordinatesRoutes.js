const {
  updateCoordinates,
} = require("../controllers/coordinatesController");
const { middleware } = require("../middleware/middleware");

async function coordinatesRoutes(req, res) {
  switch (req.method) {
    case "PUT":
      await middleware(req, res, updateCoordinates);
      break;
    default:
      res.write("method not allowed");
  }
}

module.exports = {
  coordinatesRoutes
}