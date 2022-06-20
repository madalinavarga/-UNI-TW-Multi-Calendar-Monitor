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
    `https://www.googleapis.com/calendar/v3/calendars/${req.email}/events?timeMin=2022-01-01T00:00:00.000Z`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.googleAccessToken}`,
      },
    }
  );
  const calendarEventsData = await calendarEventsResponse.json();

  // transforma datele in formatul nostru
  return calendarEventsData.items
    .filter((item) => !!item.start?.dateTime && !!item.end?.dateTime)
    .map(({ summary, start, end, colorId }) => ({
      dateEvent: start.dateTime.split("T")[0],
      startEvent:
        new Date(start.dateTime).getHours() +
        ":" +
        new Date(start.dateTime).getMinutes(),
      endEvent:
        new Date(end.dateTime).getHours() +
        ":" +
        new Date(end.dateTime).getMinutes(),
      color: colorId ? colorsMap[colorId].background : "#039be5",
      title: summary,
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
  const cookie = req.headers.cookie;

  if (cookie.includes("google")) {
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

    // sterge eventuri vechi
    await eventModel.deleteMany({ google: req.email });

    // creaza eventuri noi
    let events = [];
    for (let i = 0; i < calendarInfo.length; i++) {
      calendarInfo[i].google = req.email;
      const newEvent = eventModel.create({ ...calendarInfo[i] });
      events.push(newEvent);
    }
    events = await Promise.all(events);
    events = events.map((event) => event._id);

    // updateaza user events
    await userModel.findOneAndUpdate({ email: req.email }, { events: events });
    res.write(JSON.stringify(calendarInfo));
  } else {
    res.writeHead(405);
  }
}

module.exports = {
  getGoogleCalendarEvents,
};
