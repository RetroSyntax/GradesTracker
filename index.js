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

tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        'inter': ['Inter', 'sans-serif'],
                    },
                },
            },
        }

        async function fetchGrades() {
            try {
                // Fetch the content of Grades.html
                const response = await fetch('Grades.html');
                if (!response.ok) {
                    throw new Error(`Failed to fetch Grades.html: ${response.status} ${response.statusText}`);
                }
                const htmlContent = await response.text();

                // Parse the HTML content to extract grade information
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, 'text/html');

                // Example extraction logic (adjust as needed based on your Grades.html structure)
                const gradesTable = doc.querySelector('table'); // Assumes grades are in a table
                if (!gradesTable) {
                    console.warn("Grades table not found in Grades.html");
                    return null; // Explicitly return null for no data
                }

                const rows = gradesTable.querySelectorAll('tr');
                const grades = {};

                // Iterate through table rows, extracting class names and grades
                for (let i = 1; i < rows.length; i++) { // Skip the header row
                    const cells = rows[i].querySelectorAll('td');
                    if (cells.length >= 2) {
                        const className = cells[0].textContent.trim();
                        const grade = parseFloat(cells[1].textContent.trim()); // Or parseInt, depending on your grade format

                        if (className && !isNaN(grade)) {
                            grades[className] = grade;
                        }
                    }
                }
                return grades;

            } catch (error) {
                console.error("Error fetching or parsing grades:", error);
                return null; // Return null in case of error
            }
        }

        function calculateAverage(grades) {
            if (!grades || Object.keys(grades).length === 0) {
                return {}; // Return empty object if no grades
            }
            const averages = {};
            for (const className in grades) {
                if (grades.hasOwnProperty(className)) {
                    averages[className] = grades[className]; // For simplicity, if you have single grades, this is the average
                }
            }
            return averages;
        }

        function createChart(averages) {
            const ctx = document.getElementById('gradeChart').getContext('2d');
            const noDataMessage = document.getElementById('noDataMessage');

            if (!averages || Object.keys(averages).length === 0) {
                noDataMessage.style.display = 'block'; // Show message
                document.getElementById('gradeChart').style.display = 'none';
                return;
            } else {
                noDataMessage.style.display = 'none';
                document.getElementById('gradeChart').style.display = 'block';
            }


            const classNames = Object.keys(averages);
            const gradeValues = Object.values(averages);

            const backgroundColors = [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(199, 146, 234, 0.6)',
                'rgba(247, 202, 24, 0.6)',
                'rgba(92, 172, 238, 0.6)',
                'rgba(240, 128, 128, 0.6)'
            ];

            const borderColors = [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(199, 146, 234, 1)',
                'rgba(247, 202, 24, 1)',
                'rgba(92, 172, 238, 1)',
                'rgba(240, 128, 128, 1)'
            ];

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: classNames,
                    datasets: [{
                        label: 'Average Grade',
                        data: gradeValues,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: {
                                    family: 'Inter',
                                }
                            }
                        },
                        datalabels: {
                            anchor: 'end',
                            align: 'top',
                            color: 'black',
                            font: {
                                size: 12,
                                family: 'Inter',
                                weight: 'bold'
                            },
                            formatter: (value) => value.toFixed(2) + "%"
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                font: {
                                    family: 'Inter',
                                }
                            }
                        },
                        x: {
                            ticks: {
                                font: {
                                    family: 'Inter',
                                }
                            }
                        }
                    }
                }
            });
        }

        window.onload = async function() {
            const grades = await fetchGrades();
            const averages = calculateAverage(grades);
            createChart(averages);
        };
