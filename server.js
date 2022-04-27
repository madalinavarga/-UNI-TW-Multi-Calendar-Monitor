//entry point to app

//imports 
const http = require('http');
const fs = require('fs');
const { initDB } = require('./model');
//requests for routes
const { login } = require('./routes/loginRoutes');
const { register } = require('./routes/registerRoutes');
const { common } = require('./routes/commonRoutes');
const { getFriendsList } = require('./routes/friendsListRoutes');
const { getUserProfile } = require('./routes/userProfileRoutes');
const { usersRoutes } = require('./routes/usersRoutes');

//init db 
initDB();

//create a server object:
http.createServer(async(req, res) => {
    console.log(req.method, req.url);
    switch (req.url) {
        case "/images/logo.svg":
        case "/images//facebook-icon.png":
        case "/images//instagram-icon.png":
        case "/images//twitter-icon.png":
        case "/images/facebook-icon.png":
        case "/images/instagram-icon.png":
        case "/images/twitter-icon.png":
        case "/public/global/layoutStyle/style.css":
            common(req, res);
            break;
        case "/login":
        case "/style/login.css":
        case "/script/login.js":
            login(req, res);
            break;

        case "/register":
        case "/script/register.js":
        case "/style/register.css":
            register(req, res);
            break;
        case "/friendsList":
        case "/style/friendsList.css":
            getFriendsList(req, res);
            break;
        case "/userProfile":
        case "/style/userProfile.css":
            getUserProfile(req, res);
            break;
        case "/users":
            await usersRoutes(req, res);
            break;
        default:
            res.write('page not found!'); //write a response to the client
    }
    res.end(); //end the response
}).listen(4000, () => { console.log("Server listens on port 4000...") }); //the server object listens on port 4000