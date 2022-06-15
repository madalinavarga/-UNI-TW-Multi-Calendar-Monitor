const fs = require("fs");

async function twitterFriends(req, res) {
    switch (req.method) {
      case "GET":
        const cookie = req.headers.cookie;
        const twitterId = cookie
          .split(";")
          .find((cookie) => cookie.includes("twitterId"))
          .split("=")[1];
        const response = await fetch(
          `https://api.twitter.com/2/users/${twitterId}/followers?user.fields=profile_image_url&max_results=1000`,
          {
            headers: {
              Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAHekdgEAAAAAfs%2FtopbgqUkEd6yMtY5MgPs21FI%3D9AbKb6PeiD13gOdJIN5MCjZAk6EFaHe3j9tYK1cmdUGKFCXEXE`,
            },
          }
        );
        const data = await response.json();
        res.write(JSON.stringify(data));
        break;
  
      default:
        res.write("method not allowed");
    }
  }
  
  module.exports = {
    twitterFriends
  };