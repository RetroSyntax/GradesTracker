const calendarTitle = document.getElementById("calendarTitle");
const calendarDays = document.getElementById("calendarDays");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

function markWholeMonthAsPA(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    paDays[dateString] = true;
  }
}

let currentDate = new Date();

const paDays = {
  // April
  "2025-04-05": true,
  "2025-04-06": true,
  "2025-04-12": true,
  "2025-04-13": true,
  "2025-04-18": true,
  "2025-04-19": true,
  "2025-04-20": true,
  "2025-04-21": true,
  "2025-04-26": true,
  "2025-04-27": true,
  // May
  "2025-05-03": true,
  "2025-05-04": true,
  "2025-05-10": true,
  "2025-05-11": true,
  "2025-05-16": true,
  "2025-05-17": true,
  "2025-05-18": true,
  "2025-05-19": true,
  "2025-05-24": true,
  "2025-05-25": true,
  "2025-05-31": true,
  // June
  "2025-06-01": true,
  "2025-06-07": true,
  "2025-06-08": true,
  "2025-06-14": true,
  "2025-06-15": true,
  "2025-06-21": true,
  "2025-06-22": true,
  "2025-06-26": true,
  "2025-06-27": true,
  "2025-06-28": true,
  "2025-06-29": true,
  "2025-06-30": true,
};

markWholeMonthAsPA(2025, 6); // July
markWholeMonthAsPA(2025, 7); // August
markWholeMonthAsPA(2025, 8); // September

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  calendarTitle.textContent = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  calendarDays.innerHTML = "";

  for (let i = 0; i < startDayOfWeek; i++) {
    const emptyCell = document.createElement("div");
    calendarDays.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.classList.add("calendar-day");

    const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (paDays[formattedDate]) {
      cell.classList.add("pa-day");
    }

    cell.textContent = day;
    calendarDays.appendChild(cell);
  }
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);
