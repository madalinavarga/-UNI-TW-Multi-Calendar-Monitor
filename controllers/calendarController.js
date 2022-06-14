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

async function getEvents(req, res) {
  req.on("end", async function () {
    try {
      const events = await eventModel.find();

      if (events != null) {
        res.writeHead(302, {
          Location: `/`,
          "Set-Cookie": `token=${token}; HttpOnly; path=/`,
        });
        res.write(events);

        res.end();
      }
      res.writeHead(400);
    } catch (error) {
      console.log(error);
      res.writeHead(500);
    }
  });
}

module.exports = {
  getViewHTML,
  createEvent,
  getEvents,
};
