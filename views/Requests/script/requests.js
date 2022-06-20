pageLoading();

function pageLoading() {
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
          console.log("events requests: " + user.eventsRequests.length);
          for(let i=0;i<user.eventsRequests.length;i++){
            getRequestInformation(user,i);
          }
        });
}

function getRequestInformation(user,i){

    let requestId=user.eventsRequests[i];

    fetch(`/getRequestEvent/${requestId}`, {
        method: "GET", // *GET, POST, PUT, DELETE
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((request) => {
          if(request!=null)
          createRequestContainer(user,i,request);
        });

    
}

function createRequestContainer(user,i,request){
    let newDiv = document.createElement("div");
    newDiv.className="request";
    newDiv.id=i;

    let detailsDiv=document.createElement("div");
    detailsDiv.className="details";
    //title
    let title=document.createElement("p");
    title.className="title";
    title.innerHTML="Titlu: ";

    title.innerHTML+=request.title;

    //date
    let date=document.createElement("p");
    date.className="dateRequest";
    date.innerHTML="Date: ";
    date.innerHTML+=request.dateRequest;

    //location
    let location=document.createElement("p");
    location.className="location";
    location.innerHTML="Location: ";
    location.innerHTML+=request.location;

    
    detailsDiv.appendChild(title);
    detailsDiv.appendChild(location);
    detailsDiv.appendChild(date);

    let friendId=request.fromWhom;

    fetch(`/getFriend/${friendId}`, {
        method: "GET", // *GET, POST, PUT, DELETE
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((friend) => {
          //console.log("request: " + request.title);
          //createRequestContainer(user,i,request);
          //console.log("prietenul cu numele: " + friend.firstName);

          //from whom
          let fromWhom = document.createElement("div");
          fromWhom.className="from-whom";
          
          let userImg = document.createElement("img");
          userImg.alt = "avatar";
          userImg.className = "avatar";
          userImg.src =
            "https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png";
          if (friend.photo) {
            userImg.src = friend.photo;
          }

          let friendName=document.createElement("p");
          friendName.className="from-whom";
          friendName.innerHTML+="From whom: ";
          friendName.innerHTML+=friend.firstName;
          friendName.innerHTML+= " ";
          friendName.innerHTML+=friend.lastName;

          //buttons

          let divButtons=document.createElement("div");

          let deleteButton=document.createElement("button");
          deleteButton.className="btn-danger btn";
          deleteButton.innerHTML+="Delete request";

          deleteButton.addEventListener("click", function () {
            deleteRequestMeet(user._id,request._id);
          });

          let acceptButton=document.createElement("button");
          acceptButton.className="btn-add btn";
          acceptButton.innerHTML+="Accept request";

          acceptButton.addEventListener("click", function () {
            acceptRequestMeet(user._id,request._id);
          });
          

          //append

          fromWhom.appendChild(userImg);
          fromWhom.appendChild(friendName);

          divButtons.appendChild(deleteButton);
          divButtons.appendChild(acceptButton);

          newDiv.appendChild(fromWhom);
          newDiv.appendChild(detailsDiv);
          newDiv.appendChild(divButtons)

          let list=document.getElementsByClassName("requests-list")[0];
          list.appendChild(newDiv);


        });



}

function deleteRequestMeet(userId,requestId){
  fetch(`/meetRequest?userId=${userId}&requestId=${requestId}&action=reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(()=>{
    window.location.reload();
  })
}

function acceptRequestMeet(userId,requestId){
  fetch(`/meetRequest?userId=${userId}&requestId=${requestId}&action=accept`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(()=>{
    window.location.reload();
  })
}