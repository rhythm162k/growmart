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

// 1. Highlight correct button on load
const currentPage = window.location.pathname.split("/").pop().replace(".html", "");
navButtons.forEach(btn => {
  if (btn.dataset.page === currentPage) {
    btn.classList.add('active');
  } else {
    btn.classList.remove('active');
  }
});

// 2. Handle navigation clicks
navButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    const page = this.dataset.page;
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
    }
  });

  // Hover effect
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });

  // Touch support for mobile
  let touchStartY = 0;
  btn.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  });
  btn.addEventListener('touchend', e => {
    if (Math.abs(touchStartY - e.changedTouches[0].clientY) < 10) {
      btn.click();
    }
  });
});
