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
  // un user are o lista de evenimente => lista de id-uri de events  ? sau un event o lista de useri (mmm)
  // returneaza o lista de evenimente
  // const email = req.email;// user email
  // const user = await userModel.findOne({ email: email });
  // const eventsId= user.events;// lista
  const events = await eventModel.find();
  if (events != null) {
    res.writeHead(200);
    res.write(JSON.stringify(events));
    return;
  }
  res.writeHead(400);
}

module.exports = {
  getViewHTML,
  createEvent,
  getEvents,
};
