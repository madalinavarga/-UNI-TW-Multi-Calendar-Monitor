const { getUser } = require('../controllers/usersController');
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

module.exports = {
    usersRoutes
}