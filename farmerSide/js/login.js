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
const navButtons = document.querySelectorAll('.nav-btn');
// Handle navigation buttons
  navButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const page = this.getAttribute('data-page');
      
      // Remove active class from all buttons
      navButtons.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      console.log('Navigating to:', page);
      
      // Handle navigation based on page
      switch(page) {
        case 'home':
          window.location.href = 'growmart.html';
          break;
        case 'sell':
          window.location.href = 'category-sell.html';
          break;
        case 'price':
          window.location.href = 'market-prices.html';
          break;
        case 'tips':
          window.location.href = 'tips.html';
          break;
        case 'profile':
          window.location.href = 'profile.html';
          break;
        default:
          console.log('Unknown page:', page);
      }
    });
  });

  // Add hover effects for better UX
  navButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Add touch support for mobile
  navButtons.forEach(btn => {
    let touchStartY = 0;
    let touchEndY = 0;
    
    btn.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
    });
    
    btn.addEventListener('touchend', function(e) {
      touchEndY = e.changedTouches[0].clientY;
      
      // Check if it's a tap (not a scroll)
      if (Math.abs(touchStartY - touchEndY) < 10) {
        this.click();
      }
    });
  });
