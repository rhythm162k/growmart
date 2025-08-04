document.addEventListener('DOMContentLoaded', function() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const backArrow = document.querySelector('.back-arrow');
  const superShopCard = document.querySelector('.super-shop-card');

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
          window.location.href = 'sell.html';
          break;
        case 'price':
          window.location.href = 'market-price.html';
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
    // window.location.href = 'market-price.html';
  });

  // Handle super shop card click
  if (superShopCard) {
    superShopCard.addEventListener('click', function() {
      console.log('Super shop card clicked');
      
      // Add selection animation
      this.classList.add('selecting');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        this.classList.remove('selecting');
      }, 300);

      // Navigate to market prices page for this super shop
      setTimeout(() => {
        window.location.href = 'market-prices.html?shop=super';
      }, 500);
    });

    // Add hover effects for better UX
    superShopCard.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    });

    superShopCard.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    });
  }

  // Add hover effects for navigation buttons
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

  // Add touch support for super shop card
  if (superShopCard) {
    let touchStartY = 0;
    let touchEndY = 0;

    superShopCard.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
    });

    superShopCard.addEventListener('touchend', function(e) {
      touchEndY = e.changedTouches[0].clientY;

      // Check if it's a tap (not a scroll)
      if (Math.abs(touchStartY - touchEndY) < 10) {
        this.click();
      }
    });
  }

  // Add loading state for images
  const shopImage = document.querySelector('.shop-image');
  if (shopImage) {
    shopImage.addEventListener('load', function() {
      this.style.opacity = '1';
    });

    shopImage.addEventListener('error', function() {
      this.style.opacity = '0.5';
      console.warn('Failed to load image:', this.src);
    });
  }

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
    
    if (e.key === 'Enter' && document.activeElement === superShopCard) {
      superShopCard.click();
    }
  });

  // Add visual feedback for interactions
  if (superShopCard) {
    superShopCard.addEventListener('focus', function() {
      this.style.outline = '2px solid #53B175';
      this.style.outlineOffset = '2px';
    });

    superShopCard.addEventListener('blur', function() {
      this.style.outline = 'none';
    });
  }

  // Add URL parameter handling for pre-selection
  function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const shop = urlParams.get('shop');
    
    if (shop) {
      console.log('Shop parameter:', shop);
      // You can add logic here to pre-select or modify the card based on the shop parameter
    }
  }

  handleUrlParams();

  // Add page transition effects
  window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
  });

  // Export functions for use in other scripts
  window.superShopUtils = {
    goBack: () => {
      window.history.back();
    },
    navigateTo: (page) => {
      const btn = document.querySelector(`[data-page="${page}"]`);
      if (btn) {
        btn.click();
      }
    },
    selectShop: () => {
      if (superShopCard) {
        superShopCard.click();
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
    page: 'super_shop',
    timestamp: new Date().toISOString()
  });

  // Track interactions
  if (superShopCard) {
    superShopCard.addEventListener('click', function() {
      trackEvent('shop_card_click', {
        shop_name: 'Name of supershop 1',
        timestamp: new Date().toISOString()
      });
    });
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const page = this.getAttribute('data-page');
      trackEvent('navigation_click', {
        destination: page,
        timestamp: new Date().toISOString()
      });
    });
  });
}); 