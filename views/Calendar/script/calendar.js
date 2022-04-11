let calendar;
document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");
  calendar = new FullCalendar.Calendar(calendarEl, {
    selectable: true,
    initialView: "timeGridWeek",
    headerToolbar: {
      left: "prev,next",
      center: "title",
      right: "today",
    },
    dateClick: function (info) {
      //   alert("Clicked on: " + info.dateStr);
      //   alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
      //   alert("Current view: " + info.view.type);
      // change the day's background color just for fun
    },

    select: function (info) {
      createCalendarEvent(info.startStr, info.endStr);
    },
  });

  calendar.render();
});

const inputDate = document.getElementById("date-picker");
const popUp = document.querySelector(".popup-container");
const colorPicker = document.getElementById("color-picker-input");

inputDate.value = new Date().toISOString().split("T")[0];

const datePickerInput = (ev) => {
  calendar.gotoDate(ev.target.value);
};

const createCalendarEvent = (startH, endH) => {
  if (popUp.style.display === "" || popUp.style.display === "none") {
    popUp.style.display = "block";
  }
  const startP = document.getElementById("start-date-time");
  const endP = document.getElementById("end-date-time");
  const startHour = new Date(startH).toString().split(":", 2).join(":");
  const endHour = new Date(endH).toString().split(":", 2).join(":");

  startP.textContent = startHour;
  endP.textContent = endHour;
};

const handleColorPicker = () => {
  console.log(colorPicker.value);
};

const handleAddEvent = () => {
  if (popUp.style.display === "block") {
    popUp.style.display = "none";
  }
};

colorPicker.addEventListener("input", handleColorPicker);

inputDate.addEventListener("input", datePickerInput);
