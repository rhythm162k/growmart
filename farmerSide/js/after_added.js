document.querySelector('.back-btn').addEventListener('click', () => {
    window.history.back();
});

document.querySelector('.add-btn').addEventListener('click', () => {
    window.location.href = 'category-sell.html';
});

window.addEventListener('load', () => {
  const category = localStorage.getItem('selectedCategory') || 'Unknown';
  const products = JSON.parse(localStorage.getItem('products')) || [];

  const productList = document.querySelector('.product-list');
  productList.innerHTML = ''; // Clear previous entries

  products.forEach((product, index) => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.innerHTML = `
      <img src="${product.image}" alt="Product Image">
      <div class="details">
          <div><strong>Category:</strong> ${product.category || category}</div>
          <div><strong>Quantity:</strong> ${product.quantity}</div>
          <button class="delete-btn" data-index="${index}">Delete</button>
      </div>
    `;
    productList.appendChild(productItem);
  });

  // Attach delete logic AFTER the products are rendered
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      let updatedProducts = JSON.parse(localStorage.getItem('products')) || [];
      updatedProducts.splice(index, 1); // remove selected product
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      location.reload(); // Reload the page to update the list
    });
  });
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
