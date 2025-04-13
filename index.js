const currentDate = new Date();
    const monthYearElement = document.getElementById('month-year');
    const calendarGridElement = document.getElementById('calendar-grid');
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    // Display current month and year
    monthYearElement.textContent = `${months[month]} ${year}`;
    
    // Calculate the range of days (3 days before, current day, 3 days after)
    const daysArray = [];
    const currentDay = currentDate.getDate();
    for (let i = -3; i <= 3; i++) {
      const newDate = new Date(year, month, currentDay + i);
      daysArray.push(newDate);
    }
    
    // Generate calendar grid with days and day of the week
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