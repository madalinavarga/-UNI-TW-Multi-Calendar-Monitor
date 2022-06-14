pageLoading();

function pageLoading() {
  fetch("/usersList", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      //populateList(users);

      for (i = 0; i < users.length; i++) {
        if (users[i].role != 1) {
          createUserContainer(i, users);
        }
      }
    });
}

function populateList(users) {
  console.log(users[3].email);
}

function createUserContainer(i, users) {
  let userContainerDiv = document.createElement("div");
  userContainerDiv.id = users[i].email;
  userContainerDiv.className = "user-container";

  //user details
  let userDetailsDiv = document.createElement("div");

  let userImg = document.createElement("img");
  userImg.alt = "avatar";
  userImg.className = "avatar";
  userImg.src =
    "https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png";

  userDetailsDiv.appendChild(userImg);

  let userName = document.createElement("h1");
  let newContent = document.createTextNode(
    users[i].firstName + " " + users[i].lastName
  );
  userName.appendChild(newContent);
  userDetailsDiv.appendChild(userName);

  userContainerDiv.appendChild(userDetailsDiv);

  //user buttons
  userButtonsDiv = document.createElement("div");
  userButtonsDiv.className = "user-buttons";

  let buttonDelete = document.createElement("button");
  buttonDelete.className = "btn-danger btn";
  newContent = document.createTextNode("Delete user");
  buttonDelete.appendChild(newContent);
  userButtonsDiv.appendChild(buttonDelete);

  let buttonSeeProfile = document.createElement("button");
  buttonSeeProfile.className = "btn-primary btn";
  newContent = document.createTextNode("See profile");
  buttonSeeProfile.appendChild(newContent);
  userButtonsDiv.appendChild(buttonSeeProfile);

  userContainerDiv.appendChild(userButtonsDiv);

  document.getElementById("users-list-container").appendChild(userContainerDiv);
}
