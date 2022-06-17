const PORT = process.env.PORT || 5000;
const http = require("http");
const fs = require("fs");

const { getFriends } = require("./routes/friendsRoutes");
const { initDB } = require("../../model");

initDB();

http
  .createServer(async (req, res) => {
    [req.url, req.params] = req.url.split("?");
    console.log(req.method, req.url, req.params);

    switch (req.url) {
      case "/friends/twitter":
        await getFriends(req, res);
        break;

      default:
        res.write("page not found!");
    }
    res.end();
  })
  .listen(PORT, () => {
    console.log(`Server listens on port ${PORT}`);
  });
