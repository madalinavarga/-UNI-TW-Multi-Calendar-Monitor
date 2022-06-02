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
const calendar = document.getElementById("calendar-table");
const calendarTableHeader = document.getElementById("calendar-table-header");
const inputDate = document.getElementById("date-picker");
const popUp = document.querySelector(".popup-container");
const colorPicker = document.getElementById("color-picker-input");
const shownWeek = document.getElementById("shown-week");
const hour = document.getElementById("hour-cells");
const createEvent = document.getElementById("create-event-btn");

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
    addEvent(date, start, end, colorPicker.value, title, description);

    // const payload = {
    //   dateEvent: dateEvent.value,
    //   startEvent: startEvent.value,
    //   endEvent: endEvent.value,
    // };
    // fetch("/calendar", {
    //   method: "POST", // *GET, POST, PUT, DELETE
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload), // body data
    // }).then((response) => {
    //   if (response.status == 200) {
    //     window.location.href = "/calendar";
    //   } else {
    //     alert("Error");
    //   }
    // });
  }
};

const calculateEventHour = (start, end) => {
  return parseInt(end[0]) - parseInt(start[0]);
};

const calculateEventMinutes = (start, end) => {
  return parseInt(end[1]) - parseInt(start[1]);
};

const addEvent = (date, start, end, color, title, description) => {
  let type;
  let hourValue;
  if (start[0] < 13) {
    type = "am";
    hourValue = start[0];
  } else {
    type = "pm";
    hourValue = start[0] - 12;
    if (hourValue === 0) {
      hourValue = 12;
    }
  }
  if (calculateEventHour(start, end) === 0) {
    if (parseInt(start[1]) === 30) {
      let cell = getSecondHalfCell(date, hourValue, type, color);
      setCellTitle(cell, title);
    } else if (parseInt(end[1]) === 30) {
      let cell = getFirstHalfCell(date, hourValue, type, color);
      setCellTitle(cell, title);
    } else {
      setCellTitle(getFirstHalfCell(date, hourValue, type, color), title);
      getSecondHalfCell(date, hourValue, type, color);
    }
  } else {
    let numberOfHours = calculateEventHour(start, end);
    setCellTitle(getFirstHalfCell(date, hourValue, type, color), title);
    while (numberOfHours != 0) {
      numberOfHours--;
      getFirstHalfCell(date, hourValue, type, color);
      getSecondHalfCell(date, hourValue, type, color);
      hourValue++;
      if (hourValue == 12 && type == "am") {
        hourValue = 1;
        type = "pm";
      } else if (hourValue == 12 && type == "am") {
        hourValue = 1;
        type = "am";
      }
    }
  }
};

const getFirstHalfCell = (date, hourValue, type, color) => {
  let cell = document
    .getElementById(
      `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${
        parseInt(hourValue) + type
      }`
    )
    .getElementsByClassName("first-half")[0];

  setStyleCellColor(cell, color);

  return cell;
};

const getSecondHalfCell = (date, hourValue, type, color) => {
  let cell = document
    .getElementById(
      `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${
        parseInt(hourValue) + type
      }`
    )
    .getElementsByClassName("second-half")[0];

  setStyleCellColor(cell, color);

  return cell;
};

const setCellWidth = (cell, width) => {
  cell.style.width = width;
};

const setStyleCellColor = (cell, color) => {
  cell.style.backgroundColor = color;
};

const setCellTitle = (cell, title) => {
  cell.innerHTML = title;
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

const getWeek = () => {
  shownWeek.innerHTML = monthNames[month] + " " + year;
  let first = curr.getDate() - curr.getDay() + 1;
  let last = first + 6;
  let changed = false;
  let differentDays = 0;

  for (let day = first; day <= last; day++) {
    const date = new Date(year, month, day);
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
  getHourCells(differentDays);
};

let mondayStartMonth = 0;

const getNextWeek = () => {
  let dayNameParagraph = document.querySelectorAll(".day-name");
  let dayNumberParagraph = document.querySelectorAll(".day-number");
  let changedMonth = false;
  let changedYear = false;

  day = firstDayWeek;
  let j = 0;
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
    let hourCell = document.querySelectorAll(`.hour-cell-${j}`);
    hourCell.forEach((element) => {
      element.id = `${date.getDate()}-${date.getMonth()}-${year}-${
        element.classList[1]
      }`;
    });
    j++;
    day++;
  });

  day = firstDayWeek;
  dayNumberParagraph.forEach((element) => {
    const date = new Date(curr.getFullYear(), curr.getMonth(), day);

    const options2 = { day: "numeric" };

    let dayNumber = new Intl.DateTimeFormat("en-US", options2).format(date);
    element.innerHTML = dayNumber;

    day++;
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
};

const getPreviousWeek = () => {
  let dayNameParagraph = document.querySelectorAll(".day-name");
  let dayNumberParagraph = document.querySelectorAll(".day-number");

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
  let j = 0;
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
    let hourCell = document.querySelectorAll(`.hour-cell-${j}`);
    hourCell.forEach((element) => {
      element.id = `${date.getDate()}-${date.getMonth()}-${year}-${
        element.classList[1]
      }`;
    });
    day++;
    j++;
  });

  day = firstDayWeek;
  dayNumberParagraph.forEach((element) => {
    const date = new Date(curr.getFullYear(), curr.getMonth(), day);

    const options2 = { day: "numeric" };

    let dayNumber = new Intl.DateTimeFormat("en-US", options2).format(date);
    element.innerHTML = dayNumber;
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
};

const getHours = () => {
  for (let i = 8; i < 12; i++) {
    hour.insertAdjacentHTML("beforeend", `<div class="${i}-am">${i} am</div>`);
  }
  hour.insertAdjacentHTML("beforeend", `<div class="12-pm">12 pm</div>`);
  for (let i = 1; i < 12; i++) {
    hour.insertAdjacentHTML("beforeend", `<div class="${i}-pm">${i} pm</div>`);
  }
  hour.insertAdjacentHTML("beforeend", `<div class="12-am">12 am</div>`);
  for (let i = 1; i < 8; i++) {
    hour.insertAdjacentHTML("beforeend", `<div class="${i}-am">${i} am</div>`);
  }
};

const getHourCells = (differentDays) => {
  let dayDate = document.querySelectorAll(".day-date");
  let dayNumberParagraph = document.querySelectorAll(".day-number");
  let j = 0;
  dayDate.forEach((element) => {
    if (differentDays > 0) {
      differentDays--;
      for (let i = 8; i < 12; i++) {
        element.insertAdjacentHTML(
          "beforeend",
          `<div class ="hour-cell-${j} ${i}am hours" id="${
            dayNumberParagraph[j].innerHTML
          }-${month - 1}-${year}-${i}am">
            <div class="first-half"></div>
            <div class="second-half"></div>
          </div>`
        );
      }
      element.insertAdjacentHTML(
        "beforeend",
        `<div class ="hour-cell-${j} 12pm hours" id="${
          dayNumberParagraph[j].innerHTML
        }-${month - 1}-${year}-12pm">
        <div class="first-half"></div>
            <div class="second-half"></div></div>`
      );
      for (let i = 1; i < 12; i++) {
        element.insertAdjacentHTML(
          "beforeend",
          `<div class ="hour-cell-${j} ${i}pm hours" id="${
            dayNumberParagraph[j].innerHTML
          }-${month - 1}-${year}-${i}pm">
          <div class="first-half"></div>
            <div class="second-half"></div></div>`
        );
      }
      element.insertAdjacentHTML(
        "beforeend",
        `<div class ="hour-cell-${j} 12am hours" id="${
          dayNumberParagraph[j].innerHTML
        }-${month - 1}-${year}-12am">
        <div class="first-half"></div>
            <div class="second-half"></div></div>`
      );
      for (let i = 1; i < 8; i++) {
        element.insertAdjacentHTML(
          "beforeend",
          `<div class ="hour-cell-${j} ${i}am hours" id="${
            dayNumberParagraph[j].innerHTML
          }-${month - 1}-${year}-${i}am">
          <div class="first-half"></div>
            <div class="second-half"></div></div>`
        );
      }
      j++;
    } else {
      for (let i = 8; i < 12; i++) {
        element.insertAdjacentHTML(
          "beforeend",
          `<div class ="hour-cell-${j} ${i}am hours" id="${dayNumberParagraph[j].innerHTML}-${month}-${year}-${i}am">
          <div class="first-half"></div>
            <div class="second-half"></div></div>`
        );
      }
      element.insertAdjacentHTML(
        "beforeend",
        `<div class ="hour-cell-${j} 12pm hours" id="${
          dayNumberParagraph[j].innerHTML
        }-${month - 1}-${year}-12pm">
        <div class="first-half"></div>
            <div class="second-half"></div></div>`
      );
      for (let i = 1; i < 12; i++) {
        element.insertAdjacentHTML(
          "beforeend",
          `<div class ="hour-cell-${j} ${i}pm hours" id="${dayNumberParagraph[j].innerHTML}-${month}-${year}-${i}pm">
          <div class="first-half"></div>
            <div class="second-half"></div></div>`
        );
      }
      element.insertAdjacentHTML(
        "beforeend",
        `<div class ="hour-cell-${j} 12am hours" id="${
          dayNumberParagraph[j].innerHTML
        }-${month - 1}-${year}-12am">
        <div class="first-half"></div>
            <div class="second-half"></div></div>`
      );
      for (let i = 1; i < 8; i++) {
        element.insertAdjacentHTML(
          "beforeend",
          `<div class ="hour-cell-${j} ${i}am hours" id="${dayNumberParagraph[j].innerHTML}-${month}-${year}-${i}am">
          <div class="first-half"></div>
            <div class="second-half"></div></div>`
        );
      }
      j++;
    }
  });
};

getWeek();
getHours();
