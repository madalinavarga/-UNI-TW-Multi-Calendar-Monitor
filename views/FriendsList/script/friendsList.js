pageLoading();

function pageLoading() {
  const cookies = document.cookie.split(";");
  let twitterId = cookies.find((cookie) => cookie.includes("twitterId"));
  if (twitterId) {
    document.getElementById("btn-twitter").style.display = "none";
  } else {
    document.getElementById("btn-twitter").style.display = "block";
  }

  // fac request la getfriends
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
      console.log(user);
      let length = user.length;
      for (let i = 0; i < length; i++) {
        createFriendContrainer(i, user);
      }
    });
  // fac request get twitter friends
}

function createFriendContrainer(i, user) {
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
    user[i].firstName + " " + user[i].lastName
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

function twitterFriends() {
  const cookies = document.cookie.split(";");
  let twitterId = cookies.find((cookie) => cookie.includes("twitterId"));
  if (!twitterId) {
    window.location.href = "/login/twitter";
  }
  // de facut get friends and afisare
}

let currentFriend;
let currentI;
async function seeOptions(user, friendId) {
  popUp.style.display = "block";
  currentFriend = user;
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
      console.log(event);
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
      console.log(event);
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
  getSuggestions(currentFriend, currentI);
  suggestionsPopUp.style.display = "block";
}

const getSuggestions = (user, i) => {
  const h2 = document.getElementById("title-suggestion");
  const h3 = document.getElementById("description-suggestion");
  const eventTitle = document.getElementById("event-title").value;
  const eventDate = document.getElementById("day-event").value;

  if (eventTitle != "") {
    h2.innerHTML =
      eventTitle + " with " + user[i].firstName + " " + user[i].lastName;
  } else {
    h2.innerHTML = "Event with " + user[i].firstName + " " + user[i].lastName;
  }

  if (eventDate != "") {
    h3.innerHTML = "Suggested time and location for " + eventDate;
  } else {
    h3.innerHTML = "Suggested time and location";
  }
};

function downloadXML() {
  const serializer = new XMLSerializer();
  const xmlString = serializer.serializeToString(
    document.querySelector(".suggestions-popup")
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

function downloadPDF() {}
