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
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password === confirmPassword && password.length >= 6) {
        localStorage.setItem('user', JSON.stringify({ username, password }));
        alert(`Account created for ${username}! Please log in.`);
        window.location.href = 'login.html'; // Redirect to login page after signup
    } else {
        alert('Passwords do not match or are too short (minimum 6 characters)');
    }
});