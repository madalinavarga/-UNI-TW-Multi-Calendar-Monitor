onInit();

function onInit() {
  console.log("init");
  fetch("/userFriendsRequests", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      for (i = 0; i < users.length; i++) {
        createRequest(i, users[i]);
      }
    });
}

function createRequest(i, user) {
  let newDiv = document.createElement("div");
  newDiv.id = "request-" + i;
  newDiv.className = "request-container";

  let divUserDetails = document.createElement("div");
  let userImg = document.createElement("img");
  userImg.alt = "avatar";
  userImg.className = "avatar";
  userImg.src =
    "https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png";
  divUserDetails.appendChild(userImg);

  let userName = document.createElement("h5");
  let newContent = document.createTextNode(
    user.firstName + " " + user.lastName
  );
  userName.appendChild(newContent);
  divUserDetails.appendChild(userName);

  //butoane
  let buttons = document.createElement("div");
  buttons.className = "request-buttons";
  //delete
  let buttonDelete = document.createElement("button");
  buttonDelete.className = "btn-danger btn";
  newContent = document.createTextNode("Delete");
  buttonDelete.appendChild(newContent);
  buttonDelete.addEventListener("click", function () {
    deleteRequest(user._id);
  });

  //accept
  let button = document.createElement("button");
  button.className = `btn-add btn options`;
  button.id = i;
  newContent = document.createTextNode("Accept");
  button.appendChild(newContent);
  button.addEventListener("click", function () {
    acceptFriendship(user._id);
  });
  buttons.appendChild(button);
  buttons.appendChild(buttonDelete);

  newDiv.appendChild(divUserDetails);
  newDiv.appendChild(buttons);

  let parent = document.getElementById("friendsRequests");
  parent.appendChild(newDiv);
}

function acceptFriendship(id) {}

function deleteRequest(id) {}
