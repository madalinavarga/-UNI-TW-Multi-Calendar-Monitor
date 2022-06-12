let userData = {};
const photoSrc ="https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png";

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
    populateUserDetails(user);
  });

function populateUserDetails(user) {
  document.getElementById("lastName").innerHTML = user.lastName;
  document.getElementById("firstName").innerHTML = user.firstName;
  document.getElementById("email").innerHTML = user.email;
  userData = { ...user };
  if (userData.photo) {
    document.getElementById("userPhoto").setAttribute("src", userData.photo);
  }
}

function inputToDiv(id) {
  var newDiv = document.createElement("DIV");
  document.getElementById(id).replaceWith(newDiv);
  newDiv.setAttribute("id", id);
  newDiv.innerHTML = userData[id];
}

function divToInput(id) {
  // get div value
  const oldValue = document.getElementById(id).innerText;

  // create input element
  const newInput = document.createElement("INPUT");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("id", id);

  // replace div with input
  document.getElementById(id).replaceWith(newInput);

  // put back old value
  document.getElementById(id).value = oldValue;
}

function toggleEdit() {
  divToInput("lastName");
  divToInput("firstName");
  divToInput("email");
  document.getElementById("image").removeAttribute("disabled");
  document.getElementById("save").style.display = "block";
  document.getElementById("cancel").style.display = "block";
}

function cancelEdit() {
  inputToDiv("lastName");
  inputToDiv("firstName");
  inputToDiv("email");
  if (userData.photo) {
    document.getElementById("userPhoto").setAttribute("src", userData.photo);
  }
  document.getElementById("image").setAttribute("disabled", "");
  document.getElementById("save").style.display = "none";
  document.getElementById("cancel").style.display = "none";
}

async function save() {
  const file = document.getElementById("image").files[0];
  const profileImage = await toBase64(file);

  const payload = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    photo: profileImage,
  };

  const response = await fetch("userProfile/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  userData = data;
  cancelEdit();
}

function logout() {
  fetch("/logout", {
    method: "POST",
  }).then(() => {
    window.location.href = "/home";
  });
}

// https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

document.getElementById("image").addEventListener("change", async (event) => {
  const file = document.getElementById("image").files[0];
  const profileImage = await toBase64(file);
  document.getElementById("userPhoto").setAttribute("src", profileImage);
});
