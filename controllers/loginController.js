var fs = require('fs');
// functions for routes requests

//GET 1 2 3
function getView(req, res) {
    res.write(fs.readFileSync('./views/login.html'));
}

// function getView(req, res) {
//     res.write(fs.readFileSync('./views/login.html'));
// }


//POST




module.exports = {
    getView: getView
}