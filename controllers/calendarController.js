const fs = require("fs");
const { eventModel } = require("../model/event");
const { userModel } = require("../model/user");
// const googleCal = require("./googleCalendar");

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
            $set: { events: response._id },
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
  const email = req.email;
  const user = await userModel.findOne({ email: email });
  if (user != null) {
    const events = await eventModel.find(
      { _id: { $in: user.events } },
      "dateEvent startEvent endEvent color title"
    );
    // console.log(events);
    if (events != null) {
      res.writeHead(201);
      res.write(JSON.stringify(events));
      return;
    }
  }

  res.writeHead(400);
}

async function getEventsByFriendId(req, res) {
  const email = req.email;
  const user = await userModel.findOne({ email: email });
  if (user != null) {
    const friend = await userModel.findOne({
      _id: user.friends[req.url.split("/")[2]],
    });
    if (friend != null) {
      const events = await eventModel.find(
        { _id: { $in: friend.events } },
        "dateEvent startEvent endEvent color title"
      );
      if (events != null) {
        res.writeHead(201);
        res.write(JSON.stringify(events));
        return;
      }
    }
  }

  res.writeHead(400);
}

module.exports = {
  getViewHTML,
  createEvent,
  getEvents,
  getEventsByFriendId,
};
