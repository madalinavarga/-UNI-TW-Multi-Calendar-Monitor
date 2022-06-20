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
]; // i use this array to show the month of the week

const calendar = document.getElementById("calendar-table");
const calendarTableHeader = document.getElementById("calendar-table-header");
const calendarTableContainer = document.getElementById(
  "calendar-table-container"
);
const inputDate = document.getElementById("date-picker");
const popUp = document.querySelector(".popup-container");
const colorPicker = document.getElementById("color-picker-input");
const shownWeek = document.getElementById("shown-week");
const hour = document.getElementById("hour-cells");
const createEvent = document.getElementsByClassName("create-event-btn");
const loader = document.getElementById("loader");
let currentDateArray = [];
function displayLoading() {
  loader.classList.add("display");
  // // to stop loading after some time
  // setTimeout(() => {
  //     loader.classList.remove("display");
  // }, 5000);
}

function hideLoading() {
  loader.classList.remove("display");
}

async function syncWithGoogle() {
  await fetch("/google/calendar", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status == 405) {
      alert(
        "You don't have a connection to google calendar. Please provide it and try again"
      );
    } else {
      response.json();
      getEvents(currentDateArray);
    }
  });
}

//functia ce imi ia toate evenimentele

const getEvents = (dateArray) => {
  displayLoading();
  fetch("/calendar-events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      hideLoading();
      console.log(res);

      for (let i = 0; i < res.length; i++) {
        let arr = res[i].dateEvent.split("-");
        let date;
        if (arr[2].length == 4) {
          date = new Date(
            parseInt(arr[0]),
            parseInt(arr[1]) - 1,
            parseInt(arr[2])
          );
        } else {
          if (parseInt(arr[1]) > 12) {
            date = new Date(
              parseInt(arr[0]),
              parseInt(arr[2]) - 1,
              parseInt(arr[1])
            );
          } else {
            date = new Date(
              parseInt(arr[0]),
              parseInt(arr[1]) - 1,
              parseInt(arr[2])
            );
          }
        }

        if (
          dateArray.find(
            (el) =>
              date.getDate() == el.getDate() &&
              date.getMonth() == el.getMonth() &&
              date.getFullYear() == el.getFullYear()
          )
        ) {
          //add event= functia pt afisare in calendar
          addEvent(
            date,
            res[i].startEvent,
            res[i].endEvent,
            res[i].color,
            res[i].title,
            ""
          );
        }
      }
    });
};

const postEvent = (payload) => {
  fetch("/calendar", {
    method: "POST", // *GET, POST, PUT, DELETE
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload), // body data
  }).then((response) => {
    if (response.status == 200) {
      console.log("event added");
    } else {
      alert("Error adding the event");
    }
  });
};

// this function handles if the user entered a wrong date and time event and if everything is correct
// it adds the event
const handleAddEvent = () => {
  let startEvent = document.getElementById("start-time");
  let endEvent = document.getElementById("end-time");
  let dateEvent = document.getElementById("day-event");
  let wrongInput = document.getElementById("wrong-input");
  let ok = 1;
  wrongInput.style.display = "none";
  let start = startEvent.value.split(":");
  let end = endEvent.value.split(":");
  // console.log(
  //   new Date(dateEvent.value) + " " + startEvent.value + " " + endEvent.value
  // );
  if (!dateEvent.value || !startEvent.value || !endEvent.value) {
    wrongInput.style.display = "block";
    wrongInput.innerHTML = "Please enter the date and time";
    ok = 0;
  } else if (parseInt(start[0]) > parseInt(end[0])) {
    wrongInput.style.display = "block";
    wrongInput.innerHTML = "Check the time of the event.";
    ok = 0;
  } else if (parseInt(start[0]) === parseInt(end[0])) {
    if (parseInt(end[1]) - parseInt(start[1]) < 30) {
      wrongInput.style.display = "block";
      wrongInput.innerHTML = "An event must be minimum half an hour.";
      ok = 0;
    }
  } else if (parseInt(end[0]) - parseInt(start[0]) === 1) {
    if (60 - parseInt(start[1]) + parseInt(end[1]) < 30) {
      wrongInput.style.display = "block";
      wrongInput.innerHTML = "An event must be minimum half an hour.";
      ok = 0;
    }
  }
  if (popUp.style.display === "block" && ok === 1) {
    popUp.style.display = "none";
  }

  if (ok === 1) {
    let title = document.getElementById("event-title").value;
    let description = document.getElementById("event-description").value;
    let date = new Date(dateEvent.value);
    let stringDate =
      date.getDate().toString() +
      "-" +
      (date.getMonth() + 1).toString() +
      "-" +
      date.getFullYear();
    addEvent(
      date,
      startEvent.value,
      endEvent.value,
      colorPicker.value,
      title,
      description
    );
    const payload = {
      dateEvent: stringDate,
      startEvent: startEvent.value,
      endEvent: endEvent.value,
      color: colorPicker.value,
      title: title,
    };
    postEvent(payload);
  }
};

const addEvent = (date, start, end, color, title, description) => {
  let day = document.querySelector(`.d${date.getDate()}-${date.getMonth()}`);
  if (day != null) {
    if (day.childElementCount == 0) {
      day.insertAdjacentHTML(
        "beforeend",
        `<div class="event" id="${start}-${end}" style="background-color:${convertToRgba(
          color
        )}">
          ${eventText(start, end, title)}
          </div>`
      );
    } else {
      eventPlaceInList(day, start, end, color, title);
    }
  }
};

//function that will return after or before what event it should be added
const eventPlaceInList = (day, start, end, color, title) => {
  let added = 0;
  for (let i = 0; i < day.children.length; i++) {
    let startExistingEvent = day.children[i].id.split("-")[0];
    let endExistingEvent = day.children[i].id.split("-")[1];
    if (start < startExistingEvent) {
      day.children[i].insertAdjacentHTML(
        "beforebegin",
        `<div class="event" id="${start}-${end}" style="background-color:${convertToRgba(
          color
        )}">
        ${eventText(start, end, title)}
        </div>`
      );
      added = 1;
      break;
    }
  }
  if (added == 0) {
    day.insertAdjacentHTML(
      "beforeend",
      `<div class="event" id="${start}-${end}" style="background-color:${convertToRgba(
        color
      )}">
        ${eventText(start, end, title)}
        </div>`
    );
  }
};

//function that shows the event in the weekly calendar
const eventText = (start, end, title) => {
  return `<p>${start} - ${end}</p>
          <p>${title.substring(0, 12)}</p>`;
};

//function to make hex color rgba, if an user select color black to see the hour and title
const convertToRgba = (color) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  const a = 0.7;

  const rgba = `rgba(${r},${g},${b},${a})`;
  return rgba;
};

const handleCreateEvent = () => {
  if (popUp.style.display === "block") {
    popUp.style.display = "none";
  } else {
    popUp.style.display = "block";
  }
};

// colorPicker.addEventListener("input", handleColorPicker);

let firstDayWeek;
let lastDayWeek;
let curr = new Date();
let month = curr.getMonth();
let secondMonth = month;
let nextMonthchanged = false;
let year = curr.getFullYear();

//this function is called at the beggining to show the current week
const getWeek = () => {
  shownWeek.innerHTML = monthNames[month] + " " + year;
  let first = curr.getDate() - curr.getDay() + 1;
  let last = first + 6;
  let changed = false;
  let differentDays = 0;
  let dateArray = [];
  for (let day = first; day <= last; day++) {
    const date = new Date(year, month, day);
    dateArray.push(date);
    if (date.getMonth() != month) {
      differentDays++;
    }
    if (date.getMonth() != month && changed === false) {
      secondMonth = date.getMonth();
      changed = true;
    }
    const options1 = { weekday: "short" };
    const options2 = { day: "numeric" };

    let dayName = new Intl.DateTimeFormat("en-US", options1).format(date);
    let dayNumber = new Intl.DateTimeFormat("en-US", options2).format(date);
    calendarTableHeader.insertAdjacentHTML(
      "beforeend",
      `<div class="day-date"><p class="day-name">${dayName}</p><p class="day-number">${dayNumber}</p></div>`
    );
    calendarTableContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="day-container d${dayNumber}-${date.getMonth()}"></div>`
    );
  }
  firstDayWeek = last + 1;
  lastDayWeek = firstDayWeek + 6;
  if (changed == true) {
    if (secondMonth < month) {
      shownWeek.innerHTML =
        monthNames[secondMonth] + " - " + monthNames[month] + " " + year;
      nextMonthchanged = true;
    } else {
      shownWeek.innerHTML =
        monthNames[month] + " - " + monthNames[secondMonth] + " " + year;
    }
    secondMonth = month;
  }
  currentDateArray = dateArray;
  getEvents(dateArray);
};

let mondayStartMonth = 0;

//when you click to change the week forward to see the events in the calendar
const getNextWeek = () => {
  let dayNameParagraph = document.querySelectorAll(".day-name");
  let dayNumberParagraph = document.querySelectorAll(".day-number");
  let changedMonth = false;
  let changedYear = false;
  let dateArray = [];
  day = firstDayWeek;
  dayNameParagraph.forEach((element) => {
    const date = new Date(curr.getFullYear(), curr.getMonth(), day);

    if (date.getMonth() !== secondMonth && !changedMonth) {
      secondMonth = date.getMonth();
      changedMonth = true;
      if (day === firstDayWeek) {
        mondayStartMonth = 1;
      }
    }

    if (date.getFullYear() !== year && !changedYear) {
      year = date.getFullYear();
      changedYear = true;
    }
    const options1 = { weekday: "short" };

    let dayName = new Intl.DateTimeFormat("en-US", options1).format(date);
    element.innerHTML = dayName;
    day++;
  });

  day = firstDayWeek;

  let dayContainer = document.querySelectorAll(".day-container");
  let i = 0;
  dayNumberParagraph.forEach((element) => {
    const date = new Date(curr.getFullYear(), curr.getMonth(), day);
    dateArray.push(date);
    const options2 = { day: "numeric" };

    let dayNumber = new Intl.DateTimeFormat("en-US", options2).format(date);
    element.innerHTML = dayNumber;
    //the next part is for updating the class name for every div that will contains events
    let dayClass = dayContainer[i].className;
    let lastClass = dayClass.split(" ")[1];
    dayContainer[i].classList.remove(lastClass);
    dayContainer[i].innerHTML = "";
    dayContainer[i].classList.add(`d${dayNumber}-${date.getMonth()}`);
    day++;
    i++;
  });
  firstDayWeek = lastDayWeek + 1;
  lastDayWeek = firstDayWeek + 6;
  if (secondMonth !== month && mondayStartMonth === 0) {
    shownWeek.innerHTML =
      monthNames[month] + " - " + monthNames[secondMonth] + " " + year;
    month = secondMonth;
    nextMonthchanged = true;
  } else if (mondayStartMonth === 1) {
    month = secondMonth;
    mondayStartMonth = 0;
    shownWeek.innerHTML = monthNames[month] + " " + year;
  } else {
    shownWeek.innerHTML = monthNames[month] + " " + year;
  }
  currentDateArray = dateArray;
  getEvents(dateArray);
};

//when you click to change the week backwards to see the events in the calendar
const getPreviousWeek = () => {
  let dayNameParagraph = document.querySelectorAll(".day-name");
  let dayNumberParagraph = document.querySelectorAll(".day-number");
  let dateArray = [];
  let changedMonth = false;
  let changedYear = false;
  firstDayWeek -= 14;
  lastDayWeek = firstDayWeek - 7;
  day = firstDayWeek;

  if (nextMonthchanged) {
    month--;
    secondMonth--;
    nextMonthchanged = false;
  }
  dayNameParagraph.forEach((element) => {
    const date = new Date(curr.getFullYear(), curr.getMonth(), day);

    if (date.getMonth() !== secondMonth && !changedMonth) {
      secondMonth = date.getMonth();
      changedMonth = true;
      if (day === lastDayWeek) {
        mondayStartMonth = 1;
      }
    }

    if (date.getFullYear() !== year && !changedYear) {
      year = date.getFullYear();
      changedYear = true;
    }
    const options1 = { weekday: "short" };

    let dayName = new Intl.DateTimeFormat("en-US", options1).format(date);
    element.innerHTML = dayName;
    day++;
  });

  day = firstDayWeek;
  let dayContainer = document.querySelectorAll(".day-container");
  let i = 0;
  dayNumberParagraph.forEach((element) => {
    const date = new Date(curr.getFullYear(), curr.getMonth(), day);
    dateArray.push(date);
    const options2 = { day: "numeric" };

    let dayNumber = new Intl.DateTimeFormat("en-US", options2).format(date);
    element.innerHTML = dayNumber;
    //the next part is for updating the class name for every div that will contains events
    let dayClass = dayContainer[i].className;
    let lastClass = dayClass.split(" ")[1];
    dayContainer[i].classList.remove(lastClass);
    dayContainer[i].innerHTML = "";
    dayContainer[i].classList.add(`d${dayNumber}-${date.getMonth()}`);
    i++;
    day++;
  });
  firstDayWeek += 7;
  lastDayWeek = firstDayWeek + 6;
  if (secondMonth < month && mondayStartMonth === 0) {
    shownWeek.innerHTML =
      monthNames[secondMonth] + " - " + monthNames[month] + " " + year;
    month = secondMonth;
  } else if (secondMonth > month && mondayStartMonth === 0) {
    shownWeek.innerHTML =
      monthNames[month] + " - " + monthNames[secondMonth] + " " + year;
    secondMonth = month;
  } else if (mondayStartMonth === 1) {
    month = secondMonth;
    mondayStartMonth = 0;
    shownWeek.innerHTML = monthNames[month] + " " + year;
  } else {
    shownWeek.innerHTML = monthNames[month] + " " + year;
  }
  currentDateArray = dateArray;
  getEvents(dateArray);
};

getWeek();
