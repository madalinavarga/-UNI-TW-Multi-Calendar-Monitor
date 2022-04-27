const { getAllUsers } = require('../controllers/usersController');

async function usersRoutes(req, res) {
    switch (req.method) {
        case 'GET':
            await getAllUsers(req, res);
            break;
        default:
            res.write('page not found!');
    }
}

module.exports = {
    usersRoutes
}