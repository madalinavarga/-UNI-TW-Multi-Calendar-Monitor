const { getViewHTML } = require('../controllers/adminController')
const { middleware } = require("../middleware/middleware");

async function adminRoutes(req, res) {
    switch (req.method) {
        case "GET":
            //getViewHTML(req, res);
            middleware(req, res, getViewHTML);
      break;
            break;
        default:
            res.write('method not allowed');
    }
}

module.exports = {
    adminRoutes: adminRoutes
}