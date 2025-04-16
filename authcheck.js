function checkAuth() {
    const staySignedIn = localStorage.getItem('staySignedIn');
    const localStorageTimestamp = localStorage.getItem('loginTimestamp');
    const sessionStorageTimestamp = sessionStorage.getItem('loginTimestamp');
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const now = new Date().getTime();

    if (staySignedIn === 'true' && localStorageTimestamp) {
        // Check if the localStorage timestamp is still valid (you might want to extend this period)
        // For simplicity, we'll just check if it exists for now. You could add a longer expiry.
        return true;
    } else if (sessionStorageTimestamp) {
        // Check if the sessionStorage timestamp is within the last 24 hours
        if (now - parseInt(sessionStorageTimestamp) < twentyFourHours) {
            return true;
        }
    }

    // If no valid session is found, redirect to the login page
    window.location.href = 'login.html';
    return false; // Not logged in
}

// Run the authentication check when the page loads
checkAuth();
