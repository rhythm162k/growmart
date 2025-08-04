document.querySelector('.lang-btn').addEventListener('click', () => {
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn.textContent === 'EN') {
        langBtn.textContent = 'BN';
    } else {
        langBtn.textContent = 'EN';
    }
});

document.querySelector('.submit-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
        alert(`Logged in as ${username}!`);
        window.location.href = 'profile.html'; // Redirect to profile page after login
    } else {
        alert('Invalid username or password');
    }
});