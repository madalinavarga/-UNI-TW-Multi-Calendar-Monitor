const jwt = require("jsonwebtoken");

function middleware(req, res, next) {
  try {
    const hasCookie = req.headers.cookie;
    //const user = jwt.verify(token, 'student');
    //console.log("Request de la userul: ", user)
    //req.user = user;
    if (hasCookie) {
      next(req, res); // controller dat ca parametru
    } else {
      res.writeHead(500);
      res.write("not allowed");
    }
  } catch (err) {
    console.log(err);
    res.writeHead(500);
    res.write("not allowed");
  }
}

module.exports = {
  middleware,
};
