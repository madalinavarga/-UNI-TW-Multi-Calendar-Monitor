const { logout } = require('../controllers/logoutController')

async function logoutRoutes(req, res) {
    switch (req.method) {
        case "POST":
            logout(req, res);
            break;
        default:
            res.write('method not allowed');
    }
}

module.exports = {
    logoutRoutes: logoutRoutes
}