//entry point to app
//imports
const PORT = process.env.PORT || 4000;
const http = require("http");
const fs = require("fs");
const { initDB } = require("./model");
const { login } = require("./routes/loginRoutes");
const { loginWithGoogle } = require("./routes/loginWithGoogleRoutes");
const { register } = require("./routes/registerRoutes");
const {
  friendsList,
  getFriends,
  friendsCalendar,
  twitterFriends,
  addFriend,
  deleteFriend,
} = require("./routes/friendsListRoutes");
const { userProfile } = require("./routes/userProfileRoutes");
const { usersRoutes } = require("./routes/usersRoutes");
const { calendarRoutes, eventsRoutes, googleCalendarRoutes } = require("./routes/calendarRoutes");
const { homeRoutes } = require("./routes/homeRoutes");
const { adminRoutes } = require("./routes/adminRoutes");
const { usersListRoutes } = require("./routes/usersListRoutes");
const { logout } = require("./controllers/logoutController");
const { loginWithTwitter } = require("./routes/loginWithTwitterRoutes");
const { eventsList } = require("./routes/eventsListRoutes");
const { requestsList, getUserRequests, acceptFriendRequest } = require("./routes/friendsRequests");
const { requestsMeetings } = require("./routes/requestsRoutes");


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

      case "/logout":
        await logout(req, res);
        break;

      case "/login/twitter":
        await loginWithTwitter(req, res)
        break;

      case "/login/google":
        await loginWithGoogle(req, res);
        break;

      case "/friendsTwitter":
        await twitterFriends(req, res);
        break;

      case "/register":
        await register(req, res);
        break;

      case "/friendsList":
        await friendsList(req, res);
        break;

      case "/getFriends":
        await getFriends(req, res);
        break;
        
      case "/friend":
        await deleteFriend(req,res);
        break;

      case `/getFriendEvent/${req.url.split("/")[2]}`:
        await friendsCalendar(req, res);
        break;

      case "/userProfile":
        userProfile(req, res);
        break;

      case "/userDetails":
        await usersRoutes(req, res);
        break;
      
      case "/friendsRequests":
          await requestsList(req, res);
          break;

      case "/userFriendsRequests":
            await getUserRequests(req,res);
            break;

      case "/friends":
            await addFriend(req,res);
            break;
            
      case "/friendRequest":
        await acceptFriendRequest(req,res);
        break;

      case "/calendar":
        await calendarRoutes(req, res);
        break;

      case "/requests":
        await requestsMeetings(req,res);
        break;

      case "/calendar-events":
        await eventsRoutes(req, res);
        break;

      case "/admin":
        await adminRoutes(req, res);
        break;

      case "/usersList":
        await usersListRoutes(req, res);
        break;

      case "/deleteUser":
        await adminRoutes(req, res);
        break;

      case "/setAsAdmin":
        await adminRoutes(req, res);
        break;
      
      case "/adminProfile":
        await adminRoutes(req,res);
        break;

      case "/google/calendar":
        await googleCalendarRoutes(req, res)
        break;

      case "/eventsList":
        await eventsList(req, res)
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
