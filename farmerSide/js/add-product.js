document.querySelector('.back-btn').addEventListener('click', () => {
    window.history.back();
});

document.querySelector('.lang-btn').addEventListener('click', () => {
    const langBtn = document.querySelector('.lang-text');
    if (langBtn.textContent === 'EN') {
        langBtn.textContent = 'BN';
    } else {
        langBtn.textContent = 'EN';
    }
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
  const quantityInput = document.getElementById('quantity');
  const quantity = parseInt(quantityInput.value);

  const phoneInput = document.getElementById('phone');
  const phone = phoneInput.value.trim();

  const category = localStorage.getItem('selectedCategory');
  const categoryImage = localStorage.getItem('selectedCategoryImage');

  // ✅ Check: image, quantity, phone
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
    phone: phone
  };

  let products = JSON.parse(localStorage.getItem('products')) || [];

  products.push(product);
  try {
    localStorage.setItem('products', JSON.stringify(products));
  } catch (e) {
    console.error("Storage full:", e);
    alert("Can't add more products. Storage full.");
    return;
  }

  window.location.href = 'after_added.html';
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
