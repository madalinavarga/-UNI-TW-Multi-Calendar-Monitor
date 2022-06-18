const PORT = process.env.PORT || 5001;
const http = require("http");

const { initDB } = require("../../model");
const { getUserPlaces, getIntersections } = require("./util");

initDB();

http
  .createServer(async (req, res) => {
    [req.url, req.params] = req.url.split("?");
    console.log(req.method, req.url, req.params);

    if (req.url !== "/") {
        res.writeHead(404)
        res.end();
        return;
    }

    const params = new URLSearchParams(req.params);
    const email1 = params.get("email1")
    const email2 = params.get("email2")
    const radius = params.get("radius")
    const type = params.get("type")

    const places1 = await getUserPlaces(email1, radius, type)
    const places2 = await getUserPlaces(email2, radius, type)
    const intersection = getIntersections(places1, places2).map(x => ({
        name: x.name,
        location: x.vicinity,
        ratings: x.rating
    }))

    res.write(JSON.stringify(intersection))
    res.end()
  })
  .listen(PORT, () => {
    console.log(`Server listens on port ${PORT}`);
  });
