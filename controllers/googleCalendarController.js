// calendar colors este un map de la colorId la un obiect { background: string, foreground: string }
async function getUserCalendarColors(req, res) {
  const calendarColorsResponse = await fetch("https://www.googleapis.com/calendar/v3/colors", {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${req.googleAccessToken}`,
    }
  })
  const calendarColorsData = await calendarColorsResponse.json();
  return calendarColorsData.calendar
}

// obtine eventurile propriu-zise ale userului
async function getUserEvents(req, res) {
  // ia map de la colorId la culori
  const colorsMap = await getUserCalendarColors(req, res)

  // ia event-uri din calendar
  const calendarEventsResponse = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${req.email}/events`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${req.googleAccessToken}`,
    }
  })
  const calendarEventsData = await calendarEventsResponse.json();

  // transforma datele in formatul nostru
  return calendarEventsData.items.map(item => ({
    dateEvent: item.created,
    startEvent: item.start?.dateTime,
    endEvent: item.end?.dateTime,
    color: item.colorId ? colorsMap[item.colorId].background : "rgb(3, 155, 229)",
    title: item.summary
  }))
}

// tokenul expira dupa o ora si trebuie actualizat
async function refreshGoogleToken(req, res) {
  console.log("refresh google token")
  const response = await fetch("https://www.googleapis.com/oauth2/v4/token", {
    "method": "POST",
    body: JSON.stringify({
      "client_id": "1098497934240-41hpe6qpi67seng5ln8ees5e8re6abs4.apps.googleusercontent.com",
      "client_secret": "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",
      "refresh_token": req.googleRefreshToken,
      "grant_type": "refresh_token"
    })
  })
  const data = await response.json();
  return data.access_token;
}

async function getGoogleCalendarEvents(req, res) {
  let calendarInfo = []

  try {
    calendarInfo = await getUserEvents(req, res)
  } catch (err) {
    // daca tokenul expira, il actualizez si fac din nou requestul
    req.googleAccessToken = await refreshGoogleToken(req, res);
    calendarInfo = await getUserEvents(req, res)
  }

  res.writeHead(200, {
    //token actualizat daca a fost actualizat
    "Set-Cookie": `googleAccessToken=${req.googleAccessToken}; HttpOnly; path=/`,
  });
  res.write(JSON.stringify(calendarInfo));
}

module.exports = {
  getGoogleCalendarEvents
}