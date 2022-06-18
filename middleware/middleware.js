const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user");

async function middleware(req, res, next) {
  try {
    const hasCookie = req.headers.cookie;
    if (hasCookie) {
      const cookie = req.headers.cookie;
      const token = cookie.split("token=")[1].split(";")[0];
      const userData = JSON.parse(atob(token.split(".")[1]));
      if (cookie.includes("google")) {
        req.googleAccessToken = cookie.split("googleAccessToken=")[1].split(";")[0];
        req.googleRefreshToken = cookie.split("googleRefreshToken=")[1].split(";")[0];
      }
      req.email = userData.user.email;
      await next(req, res); // controller dat ca parametru
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
