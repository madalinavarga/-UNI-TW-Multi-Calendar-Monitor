// opreste refresh-ul
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function validateGmail(emailAdress) {
  let regexEmail = /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/;
  if (emailAdress.match(regexEmail)) {
    return true;
  }
  return false;
}

function register() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("password-confirm").value;
  const isAdmin = document.querySelector("#isAdmin").checked;

  if (!firstName || !lastName || !email || !password || !passwordConfirm) {
    //alert(isAdmin);
    alert("All fields are required!");
    return;
  }
  if (!validateGmail(email)) {
    alert("Only gmail allowed");
    return;
  }
  // if (password.length < 8) {
  //     alert("Password length must be atleast 8 characters")
  //     return;
  // }
  // if (password != passwordConfirm) {
  //     alert("Passwords did not match")
  //     return;
  // }

  const payload = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    role: isAdmin,
  };

  fetch("/register", {
    method: "POST", // *GET, POST, PUT, DELETE
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), // body data
  }).then((response) => {
    if (response.status == 201) {
      window.location.href = "/login";
    } else {
      alert("Email already exists!");
    }
  });
}

function redirectHome() {
  window.location.href = "http://localhost:4000/home";
}
