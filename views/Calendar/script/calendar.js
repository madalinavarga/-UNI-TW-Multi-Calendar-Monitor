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
const hour = document.getElementById("hour-cells");
const createEvent = document.getElementById("create-event-btn");

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
  for (let day = first; day <= last; day++) {
    const date = new Date(year, month, day);

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
};
let mondayStartMonth = 0;
const getNextWeek = () => {
  let dayNameParagraph = document.querySelectorAll(".day-name");
  let dayNumberParagraph = document.querySelectorAll(".day-number");
  let hourCell = document.querySelectorAll(".hour-cell");
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
      element.id = `${date.getDate()}-${date.getMonth()}-${year}`;
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
      console.log(secondMonth);
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
      element.id = `${date.getDate()}-${date.getMonth()}-${year}`;
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
  if (secondMonth !== month && mondayStartMonth === 0) {
    shownWeek.innerHTML =
      monthNames[secondMonth] + " - " + monthNames[month] + " " + year;
    month = secondMonth;
  } else if (mondayStartMonth === 1) {
    month = secondMonth;
    mondayStartMonth = 0;
    shownWeek.innerHTML = monthNames[month] + " " + year;
  } else {
    shownWeek.innerHTML = monthNames[month] + " " + year;
  }
};

const getHours = () => {
  for (let i = 8; i < 13; i++) {
    hour.insertAdjacentHTML("beforeend", `<div class="${i}-am">${i} am</div>`);
  }
  for (let i = 1; i < 13; i++) {
    hour.insertAdjacentHTML("beforeend", `<div class="${i}-pm">${i} pm</div>`);
  }
  for (let i = 1; i < 8; i++) {
    hour.insertAdjacentHTML("beforeend", `<div class="${i}-am">${i} am</div>`);
  }
};

const getHourCells = () => {
  let dayDate = document.querySelectorAll(".day-date");
  let dayNumberParagraph = document.querySelectorAll(".day-number");
  let j = 0;
  dayDate.forEach((element) => {
    for (let i = 8; i < 13; i++) {
      element.insertAdjacentHTML(
        "beforeend",
        `<div class ="hour-cell-${j} ${i}am" id="${dayNumberParagraph[j].innerHTML}-${month}-${year}"></div>`
      );
    }
    for (let i = 1; i < 13; i++) {
      element.insertAdjacentHTML(
        "beforeend",
        `<div class ="hour-cell-${j} ${i}pm" id="${dayNumberParagraph[j].innerHTML}-${month}-${year}"></div>`
      );
    }
    for (let i = 1; i < 8; i++) {
      element.insertAdjacentHTML(
        "beforeend",
        `<div class ="hour-cell-${j} ${i}am" id="${dayNumberParagraph[j].innerHTML}-${month}-${year}"></div>`
      );
    }
    j++;
  });
};

getWeek();
getHours();
getHourCells();
