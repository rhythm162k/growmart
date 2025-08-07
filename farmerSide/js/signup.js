document.querySelector('.back-btn').addEventListener('click', () => {
    window.history.back();
});

document.querySelector('.submit-btn').addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!username || !phone || !password || !confirmPassword) {
      alert('All fields are required!');
      return;
  }

  if (!/^01[0-9]{9}$/.test(phone)) {
      alert('Please enter a valid Bangladeshi phone number (e.g., 017xxxxxxxx)');
      return;
  }

  if (password !== confirmPassword || password.length < 6) {
      alert('Passwords do not match or are too short (minimum 6 characters)');
      return;
  }

  // Store data as 'user' for profile.js to read correctly
  localStorage.setItem('user', JSON.stringify({ username, phone, password }));

  // Redirect to verification page
  window.location.href = 'verification.html';
});

