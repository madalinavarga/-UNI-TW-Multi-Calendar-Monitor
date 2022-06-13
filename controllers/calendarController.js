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

function getEventsPerDay(req, res) {
  const events = eventModel.find(
    { dateEvent: req.dateEvent },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    }
  );
  res.writeHead(200);
  res.write(events.toString);
}

module.exports = {
  getViewHTML,
  createEvent,
  getEventsPerDay,
};
