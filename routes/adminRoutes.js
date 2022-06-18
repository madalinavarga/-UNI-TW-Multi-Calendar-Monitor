const { getAdminProfile } = require('../controllers/adminController')
const { deleteUser } = require('../controllers/adminController')
const { addAdmin } = require('../controllers/adminController')
const { middleware } = require("../middleware/middleware");

async function adminRoutes(req, res) {
    switch (req.method) {
        case "GET":
            getAdminProfile(req, res);
            //middleware(req, res, getAdminProfile);
            break;
        case "DELETE":
            await  middleware(req, res, deleteUser)
            break;
        case "PUT":
            await  middleware(req, res, addAdmin)
            break;
        default:
            res.write('method not allowed');
    }
}

module.exports = {
    adminRoutes: adminRoutes
}