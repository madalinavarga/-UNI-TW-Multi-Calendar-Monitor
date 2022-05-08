//entry point to app

//imports 
const http = require('http');
const fs = require('fs');
const { initDB } = require('./model');
//requests for routes
const { login } = require('./routes/loginRoutes');
const { register } = require('./routes/registerRoutes');
const { friendsList } = require('./routes/friendsListRoutes');
const { userProfile } = require('./routes/userProfileRoutes');
const { usersRoutes } = require('./routes/usersRoutes');
const { calendarRoutes } = require('./routes/calendarRoutes');

//init db 
initDB();

function getContentTypeForFile(filename) { // exemple views/Register/register.html, images/test.png
    if (filename.endsWith(".svg")) {
        return "image/svg+xml"
    }
}

//create a server object:
http.createServer(async(req, res) => {
    console.log(req.method, req.url);
    switch (req.url) {
        case "/login":
            await login(req, res);
            break;

        case "/register":
            await register(req, res);
            break;

        case "/friendsList":
            friendsList(req, res);
            break;

        case "/userProfile":
            userProfile(req, res);
            break;

        case "/users":
            await usersRoutes(req, res);
            break;
        case "/calendar":
            await calendarRoutes(req, res);
            break;


        default:
            try {
                const contentType = getContentTypeForFile(req.url);
                if (contentType) res.setHeader("Content-Type", contentType)
                res.write(fs.readFileSync(`.${req.url}`));
            } catch {
                res.write('page not found!');
            }
    }
    res.end(); //end the response
}).listen(4000, () => { console.log("Server listens on port 4000...") }); //the server object listens on port 4000