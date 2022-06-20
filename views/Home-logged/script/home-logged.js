const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

pageLoading();

function pageLoading(){
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
      //populateUserDetails(user);
      //console.log(user);
      greeding(user);
      tasks(user);
    });
}


function greeding(user){

var today = new Date();
console.log("today: "+today);
let day = today.getDay();
console.log(day);
var greedingEl = document.getElementById("home-page-greeting");
var dateEl = document.getElementById("home-page-date");

let month = monthNames[today.getMonth()];
let dayDigits = today.getDate();
let hour = today.getHours();
switch (day) {
  case 0:
    dateEl.textContent += "Sunday, ";
    break;
  case 1:
    dateEl.textContent += "Monday, ";
    break;
  case 2:
    dateEl.textContent += "Tuesday, ";
    break;
  case 3:
    dateEl.textContent += "Wednesday, ";
    break;
  case 4:
    dateEl.textContent += "Thursday, ";
    break;
  case 5:
    dateEl.textContent += "Friday";
    break;
  case 6:
    dateEl.textContent += "Saturday, ";
}

dateEl.textContent += month;
dateEl.textContent += " ";
dateEl.textContent += dayDigits;

console.log(hour);
if (hour < 12) {
  greedingEl.textContent += "Good morning, ";
} else if (hour < 19) {
  greedingEl.textContent += "Good afternoon, ";
} else {
  greedingEl.textContent += "Good evening, ";
}

greedingEl.textContent += user.firstName;
}

function tasks(user){
  console.log(user.events);
  var today = new Date();
  
  
 //format an-luna-zi
 
  let day=today.getFullYear();
  day+="-";
  let month=today.getMonth()+1;
  if( month<10){
    day+="0";
    day+= month + "-";
  }else{
    day+=month + "-";
  }
  
  let currentday=today.getDate();
  if(currentday<10){
    day+="0";
    day+=currentday;
  }else{
    day+=currentday;
  }
  
  console.log("today: "+day);
  

  //format an-zi-luna
  /*
  let day=today.getFullYear();
  day+="-";

  let currentday=today.getDate();
  if(currentday<10){
    day+="0";
    day+=currentday + "-";
  }else{
    day+=currentday + "-";
  }

  let month=today.getMonth()+1;
  if( month<10){
    day+="0";
    day+= month;
  }else{
    day+=month;
  }
  */


  let nrEventsForToday=0;
  

  fetch("/eventsList", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((events) => {
      //console.log("events retur: " + events[0]._id);
      for(let i=0;i<user.events.length;i++){
        for(let j=0;j<events.length;j++){
          //console.log("din user: "+ user.events[i]);
          //console.log("din events: " + events[j].id);
          if(user.events[i]==events[j]._id){
            console.log("acelasi id");
            console.log("events[j].dateEvent: " + events[j].dateEvent)
            console.log("day: " + day);
            if(events[j].dateEvent==day){
              nrEventsForToday++;
            }
          }
        }
      }
      console.log("nrEventsForToday: " + nrEventsForToday);
      
      let enc=document.getElementById("nr-of-tasks");
      if(nrEventsForToday==1){
        enc.innerHTML="You have one task for today, don't forget about it!";
      }else if(nrEventsForToday==0){
        enc.innerHTML="You have no task for today!";
      }
      else{
        enc.innerHTML="You have " +  nrEventsForToday +" tasks for today, don't forget about them!";
      }
      

    });


}


