document.querySelector('.back-btn').addEventListener('click', () => {
    window.history.back();
});

document.querySelector('.add-btn').addEventListener('click', () => {
    window.location.href = 'category-sell.html';
});

window.addEventListener('load', () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (!currentUser) {
    alert("Please log in to view your products.");
    window.location.href = 'login.html';
    return;
  }

  let allUserProducts = JSON.parse(localStorage.getItem('userProducts')) || {};
  const products = allUserProducts[currentUser.username] || [];

  const productList = document.querySelector('.product-list');
  productList.innerHTML = '';

  products.forEach((product, index) => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.innerHTML = `
      <img src="${product.image}" alt="Product Image">
      <div class="details">
          <div><strong>Category:</strong> ${product.category}</div>
          <div><strong>Quantity:</strong> ${product.quantity}</div>
          <button class="delete-btn" data-index="${index}">Delete</button>
      </div>
    `;
    productList.appendChild(productItem);
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      
      // Remove from userProducts
      let allUserProducts = JSON.parse(localStorage.getItem('userProducts')) || {};
      let userProducts = allUserProducts[currentUser.username] || [];
      let removedProduct = userProducts.splice(index, 1)[0];
      allUserProducts[currentUser.username] = userProducts;
      localStorage.setItem('userProducts', JSON.stringify(allUserProducts));

      // Remove from global products
      let globalProducts = JSON.parse(localStorage.getItem('products')) || [];
      globalProducts = globalProducts.filter(p =>
        !(p.seller === removedProduct.seller &&
          p.category === removedProduct.category &&
          p.quantity === removedProduct.quantity &&
          p.phone === removedProduct.phone)
      );
      localStorage.setItem('products', JSON.stringify(globalProducts));

      location.reload();
    });
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

