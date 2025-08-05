document.addEventListener('DOMContentLoaded', () => {
    // Get the "Get Started" button by its ID
    const getStartedBtn = document.getElementById('getStartedBtn');

    // Add a click event listener to the button
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            // Redirect to growmart.html when the button is clicked
            window.location.href = 'location-select.html';
        });
    } else {
        // Log an error if the button is not found, useful for debugging
        console.error('Error: "Get Started" button not found. Make sure its ID is "getStartedBtn".');
    }
});
