document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // Manually add your usernames and passwords here
    const users = {
        'laserbendy': '!2025Flair',
        // Add more users as needed
    };

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const enteredUsername = usernameInput.value;
        const enteredPassword = passwordInput.value;

        if (users.hasOwnProperty(enteredUsername) && users[enteredUsername] === enteredPassword) {
            // Successful login - redirect to index.html
            window.location.href = '/html/index.html';
        } else {
            // Incorrect username or password
            errorMessage.textContent = 'Incorrect username or password.';
        }
    });
});