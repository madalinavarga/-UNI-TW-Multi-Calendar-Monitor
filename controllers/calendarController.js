const fs = require("fs");
const { eventModel } = require("../model/event");

function getViewHTML(req, res) {
  res.write(fs.readFileSync("./views/Calendar/calendar.html"));
}

function createEvent(req, res) {
  let body = "";

  req.on("data", function (data) {
    body += data;
  });

  req.on("end", async function () {
    try {
      const data = JSON.parse(body);
      await eventModel.create({ ...data });
      res.writeHead(201);
    } catch (err) {
      console.log(err);
      res.writeHead(500);
    } finally {
      //   resolve(); //continue, no more await
    }
  });
}

module.exports = {
  getViewHTML,
  createEvent,
};
