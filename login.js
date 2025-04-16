document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const rememberMeCheckbox = document.getElementById('rememberMe');

   const users = {
        'MyUsername': 'MySecretPassword', // Case-sensitive!
        'anotherUser': 'anotherPassword',
        // ... your users
    };

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const enteredUsername = usernameInput.value;
        const enteredPassword = passwordInput.value;

        if (users.hasOwnProperty(enteredUsername) && users[enteredUsername] === enteredPassword) {
            const now = new Date().getTime();
            const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

            if (rememberMeCheckbox.checked) {
                // Keep me signed in: Store login timestamp in localStorage for longer persistence
                localStorage.setItem('loginTimestamp', now);
                localStorage.setItem('staySignedIn', 'true');
                sessionStorage.removeItem('loginTimestamp'); // Clear sessionStorage if used
            } else {
                // Session-based login: Store login timestamp in sessionStorage
                sessionStorage.setItem('loginTimestamp', now);
                localStorage.removeItem('staySignedIn'); // Ensure staySignedIn is removed
                localStorage.removeItem('loginTimestamp'); // Clear localStorage timestamp if present
            }

            window.location.href = 'index.html'; // Redirect to the main page
        } else {
            errorMessage.textContent = 'Incorrect username or password.';
        }
    });
});
