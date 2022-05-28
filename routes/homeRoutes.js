const { getViewHTML } = require('../controllers/homeController')

async function homeRoutes(req, res) {
    switch (req.method) {
        case "GET":
            getViewHTML(req, res);
            break;
        default:
            res.write('method not allowed');
    }
}

module.exports = {
    homeRoutes: homeRoutes
}