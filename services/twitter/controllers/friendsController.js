const fs = require("fs");
const { userModel } = require("../../../model/user");

async function twitterFriends(req, res) {
  switch (req.method) {
    case "GET":
      const params = new URLSearchParams(req.params);
      const twitterId = params.get("twitterId");
      const email = params.get("email");

      const response = await fetch(
        `https://api.twitter.com/2/users/${twitterId}/followers?user.fields=profile_image_url&max_results=1000`,
        {
          headers: {
            Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAHekdgEAAAAAfs%2FtopbgqUkEd6yMtY5MgPs21FI%3D9AbKb6PeiD13gOdJIN5MCjZAk6EFaHe3j9tYK1cmdUGKFCXEXE`,
          },
        }
      );
      // lista de prieteni de pe twitter
      const { data } = await response.json();

      // transform data in array de username-uri
      const usersNamesTwitter = data.map((x) => x.username);

      // ia toti userii
      const users = await userModel.find();

      // iau prietneii userului current
      const userFriendsIds = users.find((user) => user.email === email).friends;

      // filtrez prietenii
      const newFriends = users.filter(
        (user) =>
          usersNamesTwitter.includes(user.twitterName) && // este in lista de prieteni pe twitter
          !userFriendsIds.includes(user._id) // nu este in lista de prieteni pe site
      ).map(user => ({
        ...user._doc, 
        twitterData: data.find(user => user.twitterName === data.username)
      }))

      res.write(JSON.stringify(newFriends));
      break;

    default:
      res.write("method not allowed");
  }
}

module.exports = {
  twitterFriends,
};
