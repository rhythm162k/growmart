document.querySelector('.lang-btn').addEventListener('click', () => {
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn.textContent === 'EN') {
        langBtn.textContent = 'BN';
    } else {
        langBtn.textContent = 'EN';
    }
});

window.addEventListener('load', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('profileName').textContent = user.username;
        document.getElementById('profilePhone').textContent = '+880123456789'; // Mock phone number
    }
});

document.querySelector('.logout-btn').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});