//entry point to app

//import 
var http = require('http');
var fs = require('fs');
//requests for routes
var { login } = require('./routes/loginRoutes');
var { register } = require('./routes/registerRoutes');
var { common } = require('./routes/commonRoutes');
var { getFriendsList } = require('./routes/friendsListRoutes');
var { getUserProfile } = require('./routes/userProfileRoutes');


//create a server object:
http.createServer((req, res) => {
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
        default:
            res.write('page not found!'); //write a response to the client
    }
    res.end(); //end the response
}).listen(4000, () => { console.log("Server listens on port 4000...") }); //the server object listens on port 4000