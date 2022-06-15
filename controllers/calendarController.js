const fs = require("fs");
const { eventModel } = require("../model/event");
const { userModel } = require("../model/user");

function getViewHTML(req, res) {
  res.write(fs.readFileSync("./views/Calendar/calendar.html"));
}

async function createEvent(req, res) {
  const email = req.email;
  const user = await userModel.findOne({ email: email });
  if (user != null) {
    let body = "";

    req.on("data", function (data) {
      body += data;
    });
    let updateUserEvents;
    req.on("end", async function () {
      try {
        const data = JSON.parse(body);
        await eventModel.create({ ...data }).then((response) => {
          updateUserEvents = {
            $push: { events: response._id },
          };
        });
        await userModel.findOneAndUpdate({ email: email }, updateUserEvents);
        res.writeHead(201);
      } catch (err) {
        console.log(err);
        res.writeHead(500);
      } finally {
        //   resolve(); //continue, no more await
      }
    });
  }
}

async function getEvents(req, res) {
  // un user are o lista de evenimente => lista de id-uri de events  ? sau un event o lista de useri (mmm)
  // returneaza o lista de evenimente
  // const email = req.email;// user email
  // const user = await userModel.findOne({ email: email });
  // const eventsId= user.events;// lista
  const email = req.email;
  const user = await userModel.findOne({ email: email });
  if (user != null) {
    const events = await eventModel.find(
      { _id: { $in: user.events } },
      "dateEvent startEvent endEvent color title"
    );
    if (events != null) {
      res.writeHead(200);
      res.write(JSON.stringify(events));
      return;
    }
  }

  res.writeHead(400);
}

module.exports = {
  getViewHTML,
  createEvent,
  getEvents,
};
