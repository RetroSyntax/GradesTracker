document.addEventListener('DOMContentLoaded', function() {
    const monthYearElement = document.getElementById('month-year');
    const calendarGridElement = document.getElementById('calendar-grid');
    const daysLeftElement = document.getElementById("days-left");
    const logoutBtn = document.getElementById('logoutBtn');

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    if (monthYearElement) {
        monthYearElement.textContent = `${months[month]} ${year}`;
    }

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

    if (calendarGridElement) {
        calendarGridElement.innerHTML = calendarHTML;
    }

    // Days Left of School Updater
    function updateDaysLeft() {
        const targetDate = new Date("2025-06-26T00:00:00");
        const today = new Date();

        // Strip time for clean date difference
        targetDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const msPerDay = 1000 * 60 * 60 * 24;
        const daysLeft = Math.max(0, Math.floor((targetDate - today) / msPerDay));

        if (daysLeftElement) {
            daysLeftElement.textContent = daysLeft;
        } else {
            console.error("Couldn't find #days-left element.");
        }
    }

    updateDaysLeft();

    // Logout Button Functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Remove login information from localStorage
            localStorage.removeItem('loginTimestamp');
            localStorage.removeItem('staySignedIn');

            // Remove login information from sessionStorage
            sessionStorage.removeItem('loginTimestamp');

            // Redirect to the login page
            window.location.href = 'login.html';
        });
    }
});
