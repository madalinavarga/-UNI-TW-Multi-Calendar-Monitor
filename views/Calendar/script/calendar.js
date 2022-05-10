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
const exactTime = document.querySelector(".date-time-container");
const colorPicker = document.getElementById("color-picker-input");
const shownWeek = document.getElementById("shown-week");

const handleColorPicker = () => {
  console.log(colorPicker.value);
};

const handleAddEvent = () => {
  if (popUp.style.display === "block") {
    popUp.style.display = "none";
  }
};

const handleCreateEvent = () => {
  if (popUp.style.display === "block") {
    popUp.style.display = "none";
  } else {
    popUp.style.display = "block";
  }
};

colorPicker.addEventListener("input", handleColorPicker);

// Date.prototype.getWeek = function () {
//   return [new Date(this.setDate(this.getDate() - this.getDay()))].concat(
//     String(Array(6))
//       .split(",")
//       .map(function () {
//         return new Date(this.setDate(this.getDate() + 1));
//       }, this)
//   );
// };
// // usage
// console.log(new Date().getWeek()); //=> [07/10/2012, ... ,13/10/2012]

let firstDayWeek;
let lastDayWeek;
let curr = new Date();
let month = curr.getMonth();
let secondMonth = month;
let year = curr.getFullYear();
const getWeek = () => {
  shownWeek.innerHTML = monthNames[month] + " " + year;
  let first = curr.getDate() - curr.getDay() + 1;
  let last = first + 6;
  for (let day = first; day <= last; day++) {
    const date = new Date(year, month, day);

    const options1 = { weekday: "short" };
    const options2 = { day: "numeric" };

    let dayName = new Intl.DateTimeFormat("en-US", options1).format(date);
    let dayNumber = new Intl.DateTimeFormat("en-US", options2).format(date);
    calendarTableHeader.insertAdjacentHTML(
      "beforeend",
      `<div class="day-date"><p>${dayName}</p><p>${dayNumber}</p></div>`
    );
  }
  firstDayWeek = last + 1;
  lastDayWeek = firstDayWeek + 6;
};

const getNextWeek = () => {
  console.log(typeof firstDayWeek);
  for (let day = firstDayWeek; day <= lastDayWeek; day++) {
    const date = new Date(year, month, day);
    if (date.getMonth() != month) {
      secondMonth = date.getMonth();
    }
    const options = { weekday: "short", day: "numeric" };
    console.log(new Intl.DateTimeFormat("en-US", options).format(date));
  }
  firstDayWeek = lastDayWeek + 1;
  lastDayWeek = firstDayWeek + 6;
  if (secondMonth != month) {
    shownWeek.innerHTML =
      monthNames[month] + " - " + monthNames[secondMonth] + " " + year;
    console.log(
      monthNames[month] + " - " + monthNames[secondMonth] + " " + year
    );
    month = secondMonth;
  } else {
    shownWeek.innerHTML = monthNames[month] + " " + year;
    console.log(monthNames[month] + " " + year);
  }
};

getWeek();
getNextWeek();
