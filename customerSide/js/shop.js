document.querySelector('.back-btn').addEventListener('click', () => {
    window.history.back();
});

window.addEventListener('load', () => {
  const products = JSON.parse(localStorage.getItem('products')) || [];

  const productList = document.querySelector('.product-list');
  productList.innerHTML = '';

  products.forEach((product) => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.innerHTML = `
      <img src="${product.image}" alt="Product Image">
      <div class="details">
          <div><strong>Category:</strong> ${product.category}</div>
          <div><strong>Quantity:</strong> ${product.quantity}</div>
          <div><strong>Seller:</strong> ${product.seller || 'Unknown'}</div>
          <div><strong>Contact:</strong> ${product.phone || 'N/A'}</div>
          ${product.phone ? `<button class="call-btn" onclick="window.location.href='tel:${product.phone}'">Call Now</button>` : ''}
      </div>
    `;
    productList.appendChild(productItem);
  });
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