let calendar;
document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "timeGridWeek",
    headerToolbar: {
      left: "prev,next",
      center: "title",
      right: "today",
    },
    dateClick: function (info) {
      pickDate(info.dateStr);
      //   alert("Clicked on: " + info.dateStr);

      //   alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
      //   alert("Current view: " + info.view.type);
      // change the day's background color just for fun
      info.dayEl.style.backgroundColor = "red";
    },

    // select: function (info) {
    //   alert(
    //     "selected " +
    //       info.startStr +
    //       " to " +
    //       info.endStr +
    //       " on resource " +
    //       info.resource.id
    //   );
    // },
  });

  calendar.render();
});

const inputDate = document.getElementById("date-picker");

inputDate.value = new Date().toISOString().split("T")[0];

const datePickerInput = (ev) => {
  calendar.gotoDate(ev.target.value);
};

inputDate.addEventListener("input", datePickerInput);

const pickDate = (selectedDate) => {
  console.log(selectedDate);
};
