const { getEventsList } = require('../controllers/eventsListController');
const { middleware } = require("../middleware/middleware")

async function eventsList(req, res) {
    switch (req.method) {
        case 'GET':
           await middleware(req, res, getEventsList);
           //await getEventsList(req, res);
           break;
        default:
            res.write('page not found!');
    }
}

module.exports = {
    eventsList
}