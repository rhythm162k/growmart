document.querySelector('.back-btn').addEventListener('click', () => {
    window.history.back();
});

// Show file picker when "+" button is clicked
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const addImageBtn = document.querySelector('.add-image-btn');

// Show file picker when "+" button is clicked
addImageBtn.addEventListener('click', () => {
  imageInput.click();
});

let imageData = "";
imageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageData = e.target.result;

      // Show the image in place of the "+" button
      imagePreview.src = imageData;
      imagePreview.style.display = 'block';
      addImageBtn.style.display = 'none'; // hide the "+" button
    };
    reader.readAsDataURL(file);
  }
});

document.querySelector('.submit-btn').addEventListener('click', () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (!currentUser) {
    alert("Please log in before adding a product.");
    window.location.href = 'login.html';
    return;
  }

  const quantityInput = document.getElementById('quantity');
  const quantity = parseInt(quantityInput.value);

  const phoneInput = document.getElementById('phone');
  const phone = phoneInput.value.trim();

  const category = localStorage.getItem('selectedCategory');
  const categoryImage = localStorage.getItem('selectedCategoryImage');

  if (!imageData && !categoryImage) {
    alert("Please upload an image.");
    return;
  }
  if (!quantity || quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }
  if (!/^01[0-9]{9}$/.test(phone)) {
    alert('Please enter a valid Bangladeshi phone number (e.g., 017xxxxxxxx)');
    return;
  }

  const product = {
    category: category || 'Unknown',
    image: imageData || categoryImage || 'default.jpg',
    quantity: quantity,
    phone: phone,
    seller: currentUser.username
  };

  // Save to per-user products
  let allUserProducts = JSON.parse(localStorage.getItem('userProducts')) || {};
  let userProducts = allUserProducts[currentUser.username] || [];
  userProducts.push(product);
  allUserProducts[currentUser.username] = userProducts;
  localStorage.setItem('userProducts', JSON.stringify(allUserProducts));

  // Save to global products for shop
  let globalProducts = JSON.parse(localStorage.getItem('products')) || [];
  globalProducts.push(product);
  localStorage.setItem('products', JSON.stringify(globalProducts));

  window.location.href = 'after_added.html';
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
