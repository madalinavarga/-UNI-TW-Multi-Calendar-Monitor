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
  let day = today.getDay();
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
    var today = new Date();
    
    //let day = today.getDay();
    let day=today.getDate()+"-";
    let month=today.getMonth()+1;
    day+=month+"-";
    day+=today.getFullYear();

    let nrEventsForToday=0;
    //console.log(user.events.length);
    /*
    for(let i=0;i<user.events.length;i++){
      const payload = {
        id: user.events[i],
      };

      fetch("/isEventForToday", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // body data
      })
        .then((response) => {
          return response.json();
        })
        
    }
    */

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
        for(let i=0;i<user.events.length;i++){
          for(let j=0;j<events.length;j++){
            if(user.events[i]==events[j]._id){
              if(events[j].dateEvent==day){
                nrEventsForToday++;
              }
            }
          }
        }
        
        let enc=document.getElementById("nr-of-tasks");
        if(nrEventsForToday==1){
          enc.innerHTML="You have one task for today, don't forget about it!";
        }else{
          enc.innerHTML="You have " +  nrEventsForToday +" tasks for today, don't forget about them!";
        }
        
  
      });


  }

  
  