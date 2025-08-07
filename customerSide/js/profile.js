document.querySelector('.back-btn').addEventListener('click', () => {
    window.history.back();
});

window.addEventListener('load', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const nameEl = document.getElementById('profileName');
  const phoneEl = document.getElementById('profilePhone');
  const authButton = document.getElementById('authButton');

  if (user) {
    nameEl.textContent = user.username;
    phoneEl.textContent = user.phone;

    nameEl.style.display = 'block';
    phoneEl.style.display = 'block';
    authButton.textContent = 'Logout';
  } else {
    nameEl.style.display = 'none';
    phoneEl.style.display = 'none';
    authButton.textContent = 'Signup/Login';
  }

  // Handle location display (keep this part if you use location)
  const location = JSON.parse(localStorage.getItem('userLocation'));
  if (location) {
    document.getElementById('profileDistrict').textContent = location.district;
    document.getElementById('profileArea').textContent = location.area;
  } else {
    const locationBox = document.getElementById('locationBox');
    if (locationBox) locationBox.style.display = 'none';
  }
});

// Handle button click: either logout or go to signup
document.getElementById('authButton').addEventListener('click', () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    // Logging out
    localStorage.removeItem('user');
    window.location.reload(); // Refresh to update UI
  } else {
    // Not logged in, go to signup
    window.location.href = 'signup.html';
  }
});

const imageUpload = document.getElementById('imageUpload');
const uploadBtn = document.getElementById('uploadBtn');
const profileImage = document.getElementById('profileImage');

// Show image if already set in session
const savedImage = sessionStorage.getItem('profileImage');
if (savedImage) {
    profileImage.src = savedImage;
    profileImage.style.display = 'block';
    uploadBtn.style.display = 'none';
}

// Click button to trigger file input
uploadBtn.addEventListener('click', () => {
    imageUpload.click();
});

// Handle image selection
imageUpload.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const imageData = e.target.result;
        profileImage.src = imageData;
        profileImage.style.display = 'block';
        uploadBtn.style.display = 'none';

        sessionStorage.setItem('profileImage', imageData);
    };
    reader.readAsDataURL(file);
});


document.querySelector('.logout-btn').addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = '../choose-role.html';
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
          window.location.href = 'homepage.html';
          break;
        case 'buy':
          window.location.href = 'shop.html';
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
