// opreste refresh-ul
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

if (window.location.href.includes("failed")) alert("Google adress not found");

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("All fields are required!");
    return;
  }

  const payload = {
    email: email,
    password: password,
  };

  fetch("/login", {
    method: "POST", // *GET, POST, PUT, DELETE
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), // body data
  }).then((response) => {
    if (response.status == 200) {
      window.location.href = "/home";
    } else {
      alert("Invalid username or password");
    }
  });
}

function getGoogleAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `http://localhost:4000/login/google`,
    client_id:
      "1098497934240-41hpe6qpi67seng5ln8ees5e8re6abs4.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.readonly",
    ].join(" "),
  };

  return `${rootUrl}?${new URLSearchParams(options)}`;
}

function loginWithGoogle() {
  window.location.href = getGoogleAuthURL();
}

/*
function redirectRegister() {
  window.location.href = "http://localhost:4000/register";
}

function redirectHome() {
  window.location.href = "http://localhost:4000/home";
}*/
function redirectRegister() {
  window.location.href = "/register";
}

function redirectHome() {
  window.location.href = "/home";
}
