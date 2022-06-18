const { eventModel } = require("../model/event");
const { userModel } = require("../model/user");
const { getEventsByFriendId } = require("./calendarController");
// calendar colors este un map de la colorId la un obiect { background: string, foreground: string }
async function getUserCalendarColors(req, res) {
  const calendarColorsResponse = await fetch(
    "https://www.googleapis.com/calendar/v3/colors",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.googleAccessToken}`,
      },
    }
  );
  const calendarColorsData = await calendarColorsResponse.json();
  return calendarColorsData.calendar;
}

// obtine eventurile propriu-zise ale userului
async function getUserEvents(req, res) {
  // ia map de la colorId la culori
  const colorsMap = await getUserCalendarColors(req, res);

  // ia event-uri din calendar
  const calendarEventsResponse = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${req.email}/events`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.googleAccessToken}`,
      },
    }
  );
  const calendarEventsData = await calendarEventsResponse.json();

  // transforma datele in formatul nostru
  // const arrayCalendar = [];
  // for (item in calendarEventsData) {
  //   if (typeof item.start == "undefined") {
  //     arrayCalendar.push({
  //       dateEvent: item.start?.date, //altfel imi afiseaza data la care au fost create evenimentele
  //       startEvent: item.start?.dateTime,
  //       endEvent: item.end?.dateTime,
  //       color: item.colorId ? colorsMap[item.colorId].background : "#039be5",
  //       title: item.summary,
  //     });
  //   } else {
  //     arrayCalendar.push({
  //       dateEvent: item.start?.dateTime, //altfel imi afiseaza data la care au fost create evenimentele
  //       startEvent: item.start?.dateTime,
  //       endEvent: item.end?.dateTime,
  //       color: item.colorId ? colorsMap[item.colorId].background : "#039be5",
  //       title: item.summary,
  //     });
  //   }
  // }
  // return arrayCalendar;
  return calendarEventsData.items.map((item) => ({
    dateEvent: item.created,
    startEvent: item.start?.dateTime,
    endEvent: item.end?.dateTime,
    color: item.colorId ? colorsMap[item.colorId].background : "#039be5",
    title: item.summary,
  }));
}

// tokenul expira dupa o ora si trebuie actualizat
async function refreshGoogleToken(req, res) {
  console.log("refresh google token");
  const response = await fetch("https://www.googleapis.com/oauth2/v4/token", {
    method: "POST",
    body: JSON.stringify({
      client_id:
        "1098497934240-41hpe6qpi67seng5ln8ees5e8re6abs4.apps.googleusercontent.com",
      client_secret: "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",
      refresh_token: req.googleRefreshToken,
      grant_type: "refresh_token",
    }),
  });
  const data = await response.json();
  return data.access_token;
}

async function getGoogleCalendarEvents(req, res) {
  let calendarInfo = [];

  try {
    calendarInfo = await getUserEvents(req, res);
  } catch (err) {
    // daca tokenul expira, il actualizez si fac din nou requestul
    req.googleAccessToken = await refreshGoogleToken(req, res);
    calendarInfo = await getUserEvents(req, res);
  }
  res.writeHead(200, {
    //token actualizat daca a fost actualizat
    "Set-Cookie": `googleAccessToken=${req.googleAccessToken}; HttpOnly; path=/`,
  });
  console.log(calendarInfo);
  const user = await userModel.find({ email: req.email });
  for (let i = 0; i < user.events; i++) {
    await eventModel.deleteOne({ _id: user.events[i], google: req.email });
  }

  for (let i = 0; i < calendarInfo.length; i++) {
    calendarInfo[i].dateEvent = calendarInfo[i].dateEvent.split("T")[0];
    if (
      typeof calendarInfo[i].startEvent == "undefined" ||
      typeof calendarInfo[i].endEvent == "undefined"
    ) {
      calendarInfo[i].startEvent = "00:00";
      calendarInfo[i].endEvent = "24:00";
    } else {
      calendarInfo[i].startEvent = `${
        calendarInfo[i].startEvent.split("T")[1].split(":")[0]
      }:${calendarInfo[i].startEvent.split("T")[1].split(":")[1]}`;
      calendarInfo[i].endEvent = `${
        calendarInfo[i].endEvent.split("T")[1].split(":")[0]
      }:${calendarInfo[i].endEvent.split("T")[1].split(":")[1]}`;
      calendarInfo[i].google = req.email;
    }
    // let toBeAdded = 1;
    // await eventModel.find({ google: req.email }).then((ev) => {
    //   if (
    //     ev.dateEvent == calendarInfo[i].dateEvent &&
    //     ev.startEvent == calendarInfo[i].startEvent &&
    //     ev.endEvent == calendarInfo[i].endEvent &&
    //     ev.title == calendarInfo[i].title &&
    //     ev.color == calendarInfo[i].color
    //   ) {
    //     toBeAdded = 0;
    //   }
    // });
    // if (toBeAdded == 1) {
    //   let updateUserEvents = [];
    await eventModel.create({ ...calendarInfo[i] }).then((resp) => {
      updateUserEvents = {
        $push: { events: resp._id },
      };
    });
    await userModel.findOneAndUpdate({ email: req.email }, updateUserEvents);
    // }
  }

  // eventModel.find({ google: req.email }).then((ev) => {
  //   let toBeDeleted = 1;
  //   for (let i = 0; i < calendarInfo.length; i++) {
  //     if (
  //       ev.dateEvent == calendarInfo[i].dateEvent &&
  //       ev.startEvent == calendarInfo[i].startEvent &&
  //       ev.endEvent == calendarInfo[i].endEvent &&
  //       ev.title == calendarInfo[i].title &&
  //       ev.color == calendarInfo[i].color
  //     ) {
  //       toBeDeleted = 0;
  //       break;
  //     }
  //   }
  //   if (toBeDeleted == 1) {
  //     eventModel.deleteOne({
  //       dateEvent: ev.dateEvent,
  //       startEvent: ev.startEvent,
  //       endEvent: ev.endEvent,
  //       title: ev.title,
  //       color: ev.color,
  //       google: ev.google,
  //     });
  //   }
  // });
  res.write(JSON.stringify(calendarInfo));
}

module.exports = {
  getGoogleCalendarEvents,
};
