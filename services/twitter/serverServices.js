const PORT = process.env.PORT || 5000;
const http = require("http");
const fs = require("fs");

const { getFriends } = require("./routes/friendsRoutes");

function getContentTypeForFile(filename) {
  if (filename.endsWith(".svg")) {
    return "image/svg+xml";
  }
}

http
  .createServer(async (req, res) => {
    [req.url, req.params] = req.url.split("?");
    console.log(req.method, req.url, req.params);

    switch (req.url) {
      case "/friends/twitter":
        await getFriends(req, res);
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
    res.end();
  })
  .listen(PORT, () => {
    console.log("Server listens ");
  });
