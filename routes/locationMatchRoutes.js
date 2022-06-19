const { getLocationMatch } = require("../controllers/coordinatesController");
const { middleware } = require("../middleware/middleware");

async function locationMatchRoutes(req, res) {
  switch (req.method) {
    case "GET":
      await middleware(req, res, getLocationMatch);
      break;
    default:
      res.write("method not allowed");
  }
}

module.exports = {
  locationMatchRoutes,
}