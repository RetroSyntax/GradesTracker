const currentDate = new Date();
    const monthYearElement = document.getElementById('month-year');
    const calendarGridElement = document.getElementById('calendar-grid');
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    monthYearElement.textContent = `${months[month]} ${year}`;
    
    const daysArray = [];
    const currentDay = currentDate.getDate();
    for (let i = -3; i <= 3; i++) {
      const newDate = new Date(year, month, currentDay + i);
      daysArray.push(newDate);
    }
    
    let calendarHTML = '';
    daysArray.forEach(day => {
      const dayOfWeek = weekdays[day.getDay()];
      const isToday = day.getDate() === currentDate.getDate() ? 'active' : '';
      calendarHTML += `<div class="day-container">
                         <div class="day-of-week">${dayOfWeek}</div>
                         <div class="${isToday}">${day.getDate()}</div>
                       </div>`;
    });
    
    calendarGridElement.innerHTML = calendarHTML;

function updateDaysLeft() {
  const targetDate = new Date("2025-06-26");
  const today = new Date();

  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const msPerDay = 24 * 60 * 60 * 1000;
  const diff = Math.max(0, Math.floor((targetDate - today) / msPerDay));

  const daysLeftElement = document.getElementById('days-left');
  if (daysLeftElement) {
    daysLeftElement.textContent = diff;
  }
}

updateDaysLeft();
