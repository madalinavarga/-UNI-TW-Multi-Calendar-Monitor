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
  
  var today = new Date();
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
  
  greedingEl.textContent += "username";
  