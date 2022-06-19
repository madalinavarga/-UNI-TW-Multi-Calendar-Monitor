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
      for (i = 0; i < users.length; i++) {
        createUserContainer(i, users[i]);
      }
    });
}

function populateList(users) {
}

function createUserContainer(i, user) {
  let userContainerDiv = document.createElement("div");

  userContainerDiv.id = user.email;
  userContainerDiv.className = "user-container";

  //user
  let userDetailsDiv = document.createElement("div");
  userDetailsDiv.className = "user-details";

  let userImg = document.createElement("img");
  userImg.alt = "avatar";
  userImg.className = "avatar";
  userImg.src =
    "https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png";
  if (user.photo) {
    userImg.src = user.photo;
  }

  userDetailsDiv.appendChild(userImg);

  let firstName = document.createElement("h3");
  let newContent = document.createTextNode("First name: " + user.firstName);
  firstName.appendChild(newContent);
  userDetailsDiv.appendChild(firstName);

  let lastName = document.createElement("h3");
  newContent = document.createTextNode("Last name: " + user.lastName);
  lastName.appendChild(newContent);
  userDetailsDiv.appendChild(lastName);

  let userEmail = document.createElement("h4");
  newContent = document.createTextNode("Email: " + user.email);

  userEmail.appendChild(newContent);
  userDetailsDiv.appendChild(userEmail);

  userContainerDiv.appendChild(userDetailsDiv);

  //user statistics

  let userStatistics = document.createElement("div");
  userStatistics.className = "user-statistics";

  newContent = document.createTextNode(
    "Number of friends: " + user.friends.length
  );
  let nrFriendsStatistics = document.createElement("p");
  nrFriendsStatistics.appendChild(newContent);
  userStatistics.appendChild(nrFriendsStatistics);

  newContent = document.createTextNode(
    "Number of events: " + user.events.length
  );
  let nrEventsStatistics = document.createElement("p");
  nrEventsStatistics.appendChild(newContent);
  userStatistics.appendChild(nrEventsStatistics);

  newContent = document.createTextNode("Is admin: " + user.role);
  let isAdminStatistics = document.createElement("p");
  isAdminStatistics.id = "is-admin-" + user._id;
  console.log(isAdminStatistics._id);
  //isAdminStatistics.className="is-admin";
  isAdminStatistics.appendChild(newContent);
  userStatistics.appendChild(isAdminStatistics);

  userContainerDiv.appendChild(userStatistics);

  document.getElementById("users-list-container").appendChild(userContainerDiv);

  //user buttons
  userButtonsDiv = document.createElement("div");
  userButtonsDiv.className = "user-buttons";

  let buttonDelete = document.createElement("button");
  buttonDelete.className = "btn-danger btn";
  newContent = document.createTextNode("Delete user");
  buttonDelete.appendChild(newContent);
  userButtonsDiv.appendChild(buttonDelete);

  buttonDelete.addEventListener("click", function () {
    const element = document.getElementById(user.email);
    console.log(user._id);

    fetch(`/deleteUser?userId=${user._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status == 200) {
        console.log("Deleted successfully");
      }
    });

    element.remove();
  });

  if (user.role == 0) {
    let buttonAddAdmin = document.createElement("button");
    buttonAddAdmin.className = "btn-primary btn";
    newContent = document.createTextNode("Add Admin");
    buttonAddAdmin.appendChild(newContent);
    userButtonsDiv.appendChild(buttonAddAdmin);

    buttonAddAdmin.addEventListener("click", function () {
      const element = document.getElementById(user.email);
      console.log(user._id);

      const payload = {
        id: user._id,
      };

      fetch("/setAsAdmin", {
        method: "PUT", // *GET, POST, PUT, DELETE
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // body data
      }).then((response) => {
        if (response.status == 200) {
          console.log("Admin added successfully");
          let val = document.getElementById("is-admin-" + user._id);
          val.innerHTML = "is admin: 1";
          console.log(val.innerHTML);
        } else {
          //alert("Error at add admin");
        }
      });
    });
  }

  userContainerDiv.appendChild(userButtonsDiv);
}
