const { userModel } = require("../model/user");

async function updateCoordinates(req, res) {
  const params = new URLSearchParams(req.params);
  const latitude = params.get("latitude");
  const longitude = params.get("longitude");

  await userModel.findOneAndUpdate(
    { email: req.email },
    { latitude: latitude, longitude: longitude }
  );
}

async function getLocationMatch(req, res) {
  const inputParams = new URLSearchParams(req.params);

  const reqParams = new URLSearchParams({
    email1: req.email,
    email2: inputParams.get("email"),
    type: inputParams.get("type"),
    radius: 5000,
  })

  const response = await fetch(
    `http://localhost:5001/?${reqParams}`,
    {
      method: "GET",
    }
  );

  if (response != null) {
    const data = await response.json();
    res.writeHead(200);
    res.write(JSON.stringify(data));
    return;
  }

  res.writeHead(400);
}

module.exports = {
  updateCoordinates,
  getLocationMatch
}