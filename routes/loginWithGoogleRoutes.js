const { loginUserWithGoogle } = require('../controllers/loginController')

async function loginWithGoogle(req, res) {
    switch (req.method) {
        case "GET":
            await loginUserWithGoogle(req, res);
            break;

        default:
            res.write('method not allowed');
    }
}

module.exports = {
    loginWithGoogle: loginWithGoogle
}