// const { DB_TYPE_INTERVAL_YM } = require("oracledb");

pageLoading();

function pageLoading() {
  const cookies = document.cookie.split(";");
  let twitterId = cookies.find((cookie) => cookie.includes("twitterId"));
  if (twitterId) {
    document.getElementById("btn-twitter").style.display = "none";
    getTwitterFriends(); // display
  } else {
    document.getElementById("btn-twitter").style.display = "block";
  }

  // fac request la getfriends din app
  fetch("/getFriends", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((user) => {
      let length = user.length;
      for (let i = 0; i < length; i++) {
        createFriendContrainer(i, user[i]);
      }
    });
  // fac request get twitter friends
}

function createFriendContrainer(i, user) {
  console.log("friend creates")
  let newDiv = document.createElement("div");
  newDiv.id = "friend-" + i;
  newDiv.className = "friend-container";

  let divUserDetails = document.createElement("div");
  let userImg = document.createElement("img");
  userImg.alt = "avatar";
  userImg.className = "avatar";
  //if(user.photo==null)
  userImg.src =
    "https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png";
  divUserDetails.appendChild(userImg);

  let userName = document.createElement("h4");
  let newContent = document.createTextNode(
    user.firstName + " " + user.lastName
  );
  userName.appendChild(newContent);
  divUserDetails.appendChild(userName);

  //butoane
  let buttons = document.createElement("div");
  buttons.className = "friend-buttons";
  let buttonDelete = document.createElement("button");
  buttonDelete.className = "btn-danger btn";
  newContent = document.createTextNode("Delete");
  buttonDelete.appendChild(newContent);
  buttons.appendChild(buttonDelete);
  buttonDelete.addEventListener("click", function () {
    deleteFriend(user._id);
  });


  let button = document.createElement("button");
  button.className = `btn-primary btn options`;
  button.id = i;
  newContent = document.createTextNode("See options...");
  button.appendChild(newContent);
  button.addEventListener("click", function (friend) {
    seeOptions(user, friend.target.id);
  });
  buttons.appendChild(button);

  newDiv.appendChild(divUserDetails);
  newDiv.appendChild(buttons);

  document.getElementById("friends-container").appendChild(newDiv);
}

function deleteFriend(userId) {
  fetch(`/friend?userId=${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    window.location.reload();
  })
}

function loginTwitter() {
  window.location.href = "/login/twitter";
}

async function getTwitterFriends() {
  await fetch("/friendsTwitter", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((friends) => {
      length = friends.length;
      for (let i = 0; i < length; i++) {
        displayUserCard(i, friends[i]);
      }
    });
}

function displayUserCard(i, user) {
  let newDiv = document.createElement("div");
  newDiv.id = "friend-twitter-" + i;
  newDiv.className = "friend-twitter-container";

  let divUserDetails = document.createElement("div");
  let divPhoto = document.createElement("div");
  //poza
  let userImg = document.createElement("img");
  userImg.alt = "avatar";
  userImg.className = "avatar";
  userImg.src = user.twitterData.profile_image_url;

  //username
  let userName = document.createElement("h4");
  let newContent = document.createTextNode(
    user.firstName + " " + user.lastName
  );
  userName.appendChild(newContent);

  //button
  let button = document.createElement("button");
  button.className = `btn-add btn options`;
  newContent = document.createTextNode("Add friend");
  button.appendChild(newContent);
  button.addEventListener("click", function () {
    addFriend(user._id);
  });

  divPhoto.appendChild(userImg);
  divUserDetails.appendChild(userName);
  divUserDetails.appendChild(button);
  divUserDetails.className = "user-details";
  newDiv.appendChild(divPhoto);
  newDiv.appendChild(divUserDetails);

  //append
  document.getElementById("twitter-friends").appendChild(newDiv);
}

function addFriend(userId) {
  fetch(`/friends?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

let currentFriend;
let currentI;
let eventsUser;
let eventsFriend;
async function seeOptions(user, friendId) {
  popUp.style.display = "block";
  currentFriend = { ...user };
  currentI = friendId;
  await fetch("/calendar-events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((event) => {
      eventsUser = event;
    });

  await fetch(`/getFriendEvent/${friendId}`, {
    method: "GET", // *GET, POST, PUT, DELETE
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((event) => {
      eventsFriend = event;
    });
}

const popUp = document.querySelector(".popup-container");
const exitOptions = () => {
  if (popUp.style.display !== "none") {
    popUp.style.display = "none";
  } else {
    popUp.style.display = "block";
  }
};

const suggestionsPopUp = document.querySelector(".suggestions-popup");
const exitSuggestions = () => {
  if (suggestionsPopUp.style.display !== "none") {
    suggestionsPopUp.style.display = "none";
  } else {
    suggestionsPopUp.style.display = "block";
  }
};

function seeSuggestions() {
  exitOptions();
  console.log("currentFriend: "+currentFriend._id);
  console.log("currentI "+currentI);
  getSuggestions(currentFriend, currentI);
  suggestionsPopUp.style.display = "block";
}

const getSuggestions = (user, i) => {
  //console.log(user._id);
  const h2 = document.getElementById("title-suggestion");
  const h3 = document.getElementById("description-suggestion");
  const eventTitle = document.getElementById("event-title").value;
  const eventDate = document.getElementById("day-event").value;
  const locationType = document.getElementById("type-dropwdown").value;

  if (eventTitle != "") {
    h2.innerHTML =
      eventTitle + " with " + user.firstName + " " + user.lastName;
  } else {
    h2.innerHTML = "Event with " + user.firstName + " " + user.lastName;
  }

  if (eventDate != "") {
    h3.innerHTML = "Suggested time and location for " + eventDate;
    makeTimeSuggestions(eventDate);
  } else {
    h3.innerHTML = "Suggested time and location for today";
    makeTimeSuggestions(new Date());
  }

  makeLocationSuggestions(user.email, locationType);
};

const makeLocationSuggestions = async (friendEmail, locationType) => {
  // get locations
  const response = await fetch(`/match/location?email=${friendEmail}&type=${locationType}`, {
    "method": "GET"
  })
  const data = await response.json()
  const locations = data.map(x => {
    if (x.ratings) {
      return `${x.name} (${x.ratings}/5) - location: ${x.location}`
    }
    return `${x.name} - location: ${x.location}`
  })

  // choose selectors
  const places = [
    document.querySelector(".first").querySelector(".location"),
    document.querySelector(".second").querySelector(".location"),
    document.querySelector(".third").querySelector(".location"),
    document.querySelector(".forth").querySelector(".location"),
  ]

  // set locations randomly
  for (let place of places) {
    place.innerHTML = locations[Math.floor(Math.random() * locations.length)]
  }
}

const makeTimeSuggestions = (eventDate) => {
  let busyHours = seeBusyHours(eventDate, eventsUser).concat(
    seeBusyHours(eventDate, eventsFriend)
  );
  let periodTime = getFreeEventTime(busyHours);
  if (periodTime.length > 3) {
    let firstPeriod = document.querySelector(".first").querySelector(".time");
    let secondPeriod = document.querySelector(".second").querySelector(".time");
    let thirdPeriod = document.querySelector(".third").querySelector(".time");
    let forthPeriod = document.querySelector(".forth").querySelector(".time");
    if (periodTime.length > 20) {
      //show suggestions for the middle of the day
      firstPeriod.innerHTML = suggestionString(10, periodTime);
      secondPeriod.innerHTML = suggestionString(11, periodTime);
      thirdPeriod.innerHTML = suggestionString(12, periodTime);
      forthPeriod.innerHTML = suggestionString(13, periodTime);
    } else if (periodTime.length > 10) {
      firstPeriod.innerHTML = suggestionString(5, periodTime);
      secondPeriod.innerHTML = suggestionString(6, periodTime);
      thirdPeriod.innerHTML = suggestionString(7, periodTime);
      forthPeriod.innerHTML = suggestionString(8, periodTime);
    } else {
      firstPeriod.innerHTML = suggestionString(0, periodTime);
      secondPeriod.innerHTML = suggestionString(1, periodTime);
      thirdPeriod.innerHTML = suggestionString(2, periodTime);
      forthPeriod.innerHTML = suggestionString(3, periodTime);
    }
  } else if (periodTime.length != 0) {
    if (periodTime.length >= 1) {
      let firstPeriod = document.querySelector(".first").querySelector(".time");
      firstPeriod.innerHTML = suggestionString(0, periodTime);
      if (periodTime.length >= 2) {
        let secondPeriod = document
          .querySelector(".second")
          .querySelector(".time");
        secondPeriod.innerHTML = suggestionString(1, periodTime);
      }
      if (periodTime.length >= 3) {
        let thirdPeriod = document
          .querySelector(".third")
          .querySelector(".time");
        thirdPeriod.innerHTML = suggestionString(2, periodTime);
      }
    }
  }
};

const suggestionString = (i, periodTime) => {
  return `${periodTime[i].hours.split("-")[0]}:${periodTime[i].minutes.split("-")[0]
    } - ${periodTime[i].hours.split("-")[1]}:${periodTime[i].minutes.split("-")[1]
    }`;
};

const getFreeEventTime = (busyHours) => {
  const daySlots = getTimeSlots();
  let temporary = []; //array that stores busy hours in one hour format(ex: event from 12-14 => 12-13, 13-14)
  for (let person of busyHours) {
    for (
      let i = parseInt(person.hours.split("-")[0]);
      i < parseInt(person.hours.split("-")[1]);
      i++
    ) {
      let minutes = "00";
      if (i == parseInt(person.hours.split("-")[1]) - 1) {
        minutes = person.minutes.split("-")[1];
      }
      const val = {
        hours: `${i}-${i + 1}`,
        minutes: `00-${minutes}`,
      };
      if (!temporary.includes(val)) {
        temporary.push(val);
      }
    }
  }
  let periodTime = [];
  for (let i = 0; i < daySlots.length; i++) {
    let temp = temporary.find((el) => el.hours == daySlots[i].hours);
    if (typeof temp == "undefined") {
      periodTime.push(daySlots[i]);
    } else if (i !== daySlots.length - 1) {
      let endTime = temp.minutes.split("-")[1];
      let startTime = daySlots[i + 1].minutes.split("-")[0];
      if (endTime != startTime) {
        daySlots[i + 1].minutes = `${endTime}-${daySlots[i + 1].minutes.split("-")[1]
          }`;
        periodTime.push(daySlots[i + 1]);
        i++;
      }
    }
  }
  return periodTime;
};

const getTimeSlots = () => {
  const slots = [];
  for (let i = 0; i < 24; i++) {
    slots.push({
      hours: `${i}-${i + 1}`,
      minutes: "00-00",
    });
  }
  return slots;
};

const seeBusyHours = (eventDate, events) => {
  let busyHours = [];
  if (eventDate != "") {
    let dateEvent = new Date(eventDate);
    for (let i = 0; i < events.length; i++) {
      let arr = events[i].dateEvent.split("-");
      let date = new Date(
        parseInt(arr[2]),
        parseInt(arr[1]) - 1,
        parseInt(arr[0])
      );
      if (
        date.getDate() == dateEvent.getDate() &&
        date.getMonth() == dateEvent.getMonth() &&
        date.getFullYear() == dateEvent.getFullYear()
      ) {
        busyHours.push({
          hours: `${eventsUser[i].startEvent.split(":")[0]}-${eventsUser[i].endEvent.split(":")[0]
            }`,
          minutes: `${eventsUser[i].startEvent.split(":")[1]}-${eventsUser[i].endEvent.split(":")[1]
            }`,
        });
      }
    }
  }
  return busyHours;
};

function downloadXML() {
  const serializer = new XMLSerializer();
  const xmlString = serializer.serializeToString(
    document.getElementById("download")
  );

  const blob = new Blob([xmlString], { type: "octet-stream" });

  const href = URL.createObjectURL(blob);

  const a = Object.assign(document.createElement("a"), {
    href,
    style: "display:none",
    download: "suggestions.xml",
  });
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(href);
  a.remove();
}

function downloadPDF() {
  const pdfContent = document.getElementById("download").innerHTML;

  const printWindow = window.open("", "", "height=400,width=800");
  printWindow.document.write("<html><head><title>Suggestions</title>");
  printWindow.document.write("</head><body >");
  printWindow.document.write(pdfContent);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
}



function sendRequest(){
  

  fetch("/userDetails", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((user) => {
      populateEventRequest(user);
    });
}

function populateEventRequest(user){
  console.log("currentFriend: "+currentFriend._id);
  const title = document.getElementById("event-title").value;
  const dateRequest = document.getElementById("day-event").value;
  const location = document.getElementById("type-dropwdown").value;
  const toWhom =  currentFriend._id;
  const fromWhom=user._id;

  if(!title || !dateRequest || !location){
    alert("All fields are required!");
    return;
  }

  const payload = {
    title: title,
    dateRequest: dateRequest,
    location: location,
    fromWhom: fromWhom,
    toWhom: toWhom,
  };

  fetch("/eventRequestRoutes", {
    method: "POST", // *GET, POST, PUT, DELETE
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), // body data
  }).then((response) => {
    if (response.status == 201) {
      alert("request sent successfully");
    } else {
      alert("Error at sent event request!");
    }
  });
}




/*
fetch("/postEventRequest", {
  method: "POST", // *GET, POST, PUT, DELETE
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload), // body data
}).then((response) => {
  if (response.status == 201) {
    //window.location.href = "/login";
    console.log("request sent successfully");
  } else {
    alert("Error at sent event request!");
  }
});


fetch("/userDetails", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    return response.json();
  })
  .then((user) => {
    //console.log(user._id);
    const fromWhom=user._id;
    
    const payload = {
      title: title,
      dateRequest: dateRequest,
      location: location,
      fromWhom: fromWhom,
      toWhom: toWhom,
    };

    
  }
*/


