fetch("/userDetails", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  }).then((user)=>{
      populateUserDetails(user)
  });

  function populateUserDetails(user){
    document.getElementById("lastName").innerHTML=user.lastName;
    document.getElementById("firstName").innerHTML=user.firstName;
    document.getElementById("email").innerHTML=user.email;


  }