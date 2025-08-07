document.addEventListener('DOMContentLoaded', function() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const backArrow = document.querySelector('.back-arrow');
  const priceCards = document.querySelectorAll('.price-card');

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

  // Handle back arrow
  backArrow.addEventListener('click', function() {
    console.log('Going back');
    // Navigate back to previous page
    window.history.back();
    // Or navigate to a specific page
    // window.location.href = 'super-shop.html';
  });

  // Handle price card clicks
  priceCards.forEach(card => {
    card.addEventListener('click', function() {
      const shop = this.getAttribute('data-shop');
      const shopName = this.querySelector('.shop-name').textContent;
      const price = this.querySelector('.price').textContent;
      
      console.log('Price card clicked:', shop, shopName, price);
      
      // Add selection animation
      this.classList.add('selecting');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        this.classList.remove('selecting');
      }, 300);

      // Show product details or navigate to product page
      setTimeout(() => {
        alert(`Selected: ${shopName} - ${price}`);
        // You can navigate to a product detail page here
        // window.location.href = `product-detail.html?shop=${shop}`;
      }, 500);
    });

    // Add hover effects for better UX
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
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

  // Add touch support for price cards
  priceCards.forEach(card => {
    let touchStartY = 0;
    let touchEndY = 0;

    card.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
    });

    card.addEventListener('touchend', function(e) {
      touchEndY = e.changedTouches[0].clientY;

      // Check if it's a tap (not a scroll)
      if (Math.abs(touchStartY - touchEndY) < 10) {
        this.click();
      }
    });
  });

  // Add loading state for images
  const vegImages = document.querySelectorAll('.veg-image');
  vegImages.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });

    img.addEventListener('error', function() {
      this.style.opacity = '0.5';
      console.warn('Failed to load image:', this.src);
    });
  });

  // Add smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = 'smooth';

  // Add keyboard navigation support
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      // Go back when Escape key is pressed
      window.history.back();
    }
    
    // Navigate with arrow keys
    if (e.key === 'ArrowLeft') {
      // Navigate to previous page
      window.history.back();
    }
    
    // Navigate through price cards with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const focusedCard = document.querySelector('.price-card:focus');
      if (focusedCard) {
        const currentIndex = Array.from(priceCards).indexOf(focusedCard);
        let nextIndex;
        
        if (e.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % priceCards.length;
        } else {
          nextIndex = (currentIndex - 1 + priceCards.length) % priceCards.length;
        }
        
        priceCards[nextIndex].focus();
      } else {
        priceCards[0].focus();
      }
    }
    
    if (e.key === 'Enter') {
      const focusedElement = document.activeElement;
      if (focusedElement.classList.contains('price-card')) {
        focusedElement.click();
      }
    }
  });

  // Add visual feedback for interactions
  priceCards.forEach(card => {
    card.addEventListener('focus', function() {
      this.style.outline = '2px solid #53B175';
      this.style.outlineOffset = '2px';
    });

    card.addEventListener('blur', function() {
      this.style.outline = 'none';
    });
  });

  // Add URL parameter handling for pre-selection
  function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const shop = urlParams.get('shop');
    
    if (shop) {
      console.log('Shop parameter:', shop);
      // You can add logic here to pre-select or modify cards based on the shop parameter
      const targetCard = document.querySelector(`[data-shop="${shop}"]`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  handleUrlParams();

  // Add page transition effects
  window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
  });

  // Export functions for use in other scripts
  window.marketPricesUtils = {
    goBack: () => {
      window.history.back();
    },
    navigateTo: (page) => {
      const btn = document.querySelector(`[data-page="${page}"]`);
      if (btn) {
        btn.click();
      }
    },
    selectPriceCard: (shop) => {
      const card = document.querySelector(`[data-shop="${shop}"]`);
      if (card) {
        card.click();
      }
    },
    updatePrice: (shop, newPrice) => {
      const card = document.querySelector(`[data-shop="${shop}"]`);
      if (card) {
        const priceElement = card.querySelector('.price');
        if (priceElement) {
          priceElement.textContent = newPrice;
        }
      }
    },
    updateShopName: (shop, newName) => {
      const card = document.querySelector(`[data-shop="${shop}"]`);
      if (card) {
        const nameElement = card.querySelector('.shop-name');
        if (nameElement) {
          nameElement.textContent = newName;
        }
      }
    },
    updateImage: (shop, newImageSrc) => {
      const card = document.querySelector(`[data-shop="${shop}"]`);
      if (card) {
        const imageElement = card.querySelector('.veg-image');
        if (imageElement) {
          imageElement.src = newImageSrc;
        }
      }
    }
  };

  // Add analytics tracking (optional)
  function trackEvent(eventName, data = {}) {
    console.log('Event tracked:', eventName, data);
    // Add your analytics tracking code here
  }

  // Track page load
  trackEvent('page_view', {
    page: 'market_prices',
    timestamp: new Date().toISOString()
  });

  // Track interactions
  priceCards.forEach(card => {
    card.addEventListener('click', function() {
      const shop = this.getAttribute('data-shop');
      const shopName = this.querySelector('.shop-name').textContent;
      const price = this.querySelector('.price').textContent;
      
      trackEvent('price_card_click', {
        shop: shop,
        shop_name: shopName,
        price: price,
        timestamp: new Date().toISOString()
      });
    });
  });

  navButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const page = this.getAttribute('data-page');
      trackEvent('navigation_click', {
        destination: page,
        timestamp: new Date().toISOString()
      });
    });
  });

  // Add dynamic price updates (example)
  function updatePrices() {
    // This function can be called to update prices dynamically
    // For example, from an API or real-time data
    console.log('Updating prices...');
    
    // Example: Update prices every 30 seconds
    setInterval(() => {
      priceCards.forEach(card => {
        const shop = card.getAttribute('data-shop');
        const currentPrice = card.querySelector('.price').textContent;
        
        // Simulate price change (in real app, this would come from API)
        const newPrice = Math.floor(Math.random() * 20) + 50; // Random price between 50-70
        const newPriceText = `৳${newPrice}/Kg`;
        
        if (newPriceText !== currentPrice) {
          card.querySelector('.price').textContent = newPriceText;
          trackEvent('price_update', {
            shop: shop,
            old_price: currentPrice,
            new_price: newPriceText,
            timestamp: new Date().toISOString()
          });
        }
      });
    }, 30000); // Update every 30 seconds
  }

  // Uncomment the line below to enable dynamic price updates
  // updatePrices();
}); 
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
