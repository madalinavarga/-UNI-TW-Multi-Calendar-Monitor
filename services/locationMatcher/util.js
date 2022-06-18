const { userModel } = require("../../model/user");
const { API_KEY } = require("./secret");

async function getUserPlaces(email, radius, type) {
  const user = await userModel.findOne({ email: email });
  const params = new URLSearchParams({
    key: API_KEY,
    location: `${user?.latitude},${user?.longitude}`,
    radius: radius,
    type: type,
  });
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`
  );
  const data = await response.json();
  return data.results;
}

function getIntersections(places1, places2) {
  const intersection = [];
  for (let place1 of places1) {
    if (places2.some((place2) => place2.place_id === place1.place_id)) {
      intersection.push(place1);
    }
  }
  return intersection;
}

module.exports = {
  getUserPlaces: getUserPlaces,
  getIntersections: getIntersections,
};
