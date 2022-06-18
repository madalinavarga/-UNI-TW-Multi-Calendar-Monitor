//entry point to app
//imports
const PORT = process.env.PORT || 4000;
const http = require("http");
const fs = require("fs");
const { initDB } = require("./model");
const { login } = require("./routes/loginRoutes");
const { loginWithGoogle } = require("./routes/loginWithGoogleRoutes");
const { register } = require("./routes/registerRoutes");
const { friendsList } = require("./routes/friendsListRoutes");
const { userProfile } = require("./routes/userProfileRoutes");
const { usersRoutes } = require("./routes/usersRoutes");
const { calendarRoutes } = require("./routes/calendarRoutes");
const { homeRoutes } = require("./routes/homeRoutes");
const { adminRoutes } = require("./routes/adminRoutes");
const { usersListRoutes } = require("./routes/usersListRoutes");
//const { deteleUserRoutes } = require("./routes/deteleUserRoutes");

//init db
initDB();

function getContentTypeForFile(filename) {
  // exemple views/Register/register.html, images/test.png
  if (filename.endsWith(".svg")) {
    return "image/svg+xml";
  }
}

//create a server object:
http
  .createServer(async (req, res) => {
    [req.url, req.params] = req.url.split("?");
    console.log(req.method, req.url, req.params);

    switch (req.url) {
      case "/":
      case "/home":
        await homeRoutes(req, res);
        break;

      case "/login":
        await login(req, res);
        break;

      case "/login/google":
        await loginWithGoogle(req, res);
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

      case "/userDetails":
        await usersRoutes(req, res);
        break;

      case "/calendar":
        await calendarRoutes(req, res);
        break;
      case "/admin":
        await adminRoutes(req, res);
        break;

      case "/usersList":
        await usersListRoutes(req, res);
        break;

      case "/deleteUser":
        await adminRoutes(req,res);
        break;

      case "/setAsAdmin":
        await adminRoutes(req,res);
        break;
  

      default:
        try {
          const contentType = getContentTypeForFile(req.url);
          if (contentType) res.setHeader("Content-Type", contentType);
          res.write(fs.readFileSync(`.${req.url}`));
        } catch {
          res.write("page not found!");
        }
    }
    res.end(); //end the response
  })
  .listen(PORT, () => {
    console.log("Server listens on port 4000...");
  }); //the server object listens on port 4000
