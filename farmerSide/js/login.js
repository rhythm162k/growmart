document.querySelector('.back-btn').addEventListener('click', () => {
    window.history.back();
});

document.querySelector('.submit-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      // Save login session in sessionStorage
      sessionStorage.setItem('user', JSON.stringify(storedUser));
      
      alert(`Logged in as ${username}!`);
      window.location.href = 'location-select.html'; // Redirect to profile page after login
    }
    else {
        alert('Invalid username or password');
    }
});
