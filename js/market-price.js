document.addEventListener('DOMContentLoaded', function() {
  const marketCards = document.querySelectorAll('.market-card');
  const navButtons = document.querySelectorAll('.nav-btn');
  let selectedMarket = null;

  // Handle market selection
  marketCards.forEach(card => {
    card.addEventListener('click', function() {
      const market = this.getAttribute('data-market');
      const marketText = this.querySelector('.market-text').textContent;
      
      // Remove selection from all cards
      marketCards.forEach(c => c.classList.remove('selected'));
      
      // Add selection to clicked card
      this.classList.add('selected');
      selectedMarket = market;
      
      // Add selection animation
      this.classList.add('selecting');
      setTimeout(() => {
        this.classList.remove('selecting');
      }, 300);
      
      console.log('Selected market:', marketText);
      
      // Navigate to category selection page with market parameter
      setTimeout(() => {
        alert(`Selected: ${marketText}`);
        // Navigate to category selection page
        window.location.href = `category.html?market=${market}`;
      }, 500);
    });

    // Add keyboard support
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

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
          window.location.href = 'category.html';
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
  marketCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('selected')) {
        this.style.transform = 'translateY(0)';
      }
    });
  });

  // Add touch support for mobile
  marketCards.forEach(card => {
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
  const marketImages = document.querySelectorAll('.market-image');
  marketImages.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
      this.style.opacity = '0.5';
      console.warn('Failed to load image:', this.src);
    });
  });

  // Market data for reference
  const marketData = {
    local: {
      name: 'Local Market',
      description: 'Traditional local markets with fresh produce',
      features: ['Fresh produce', 'Local vendors', 'Traditional pricing']
    },
    super: {
      name: 'Super Shop',
      description: 'Modern supermarkets with organized pricing',
      features: ['Organized pricing', 'Quality assurance', 'Modern facilities']
    }
  };

  // Function to get market details
  function getMarketDetails(market) {
    return marketData[market] || { name: 'Unknown', description: 'N/A', features: [] };
  }

  // Handle URL parameters for pre-selection
  function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const marketParam = urlParams.get('market');
    
    if (marketParam) {
      const card = document.querySelector(`[data-market="${marketParam}"]`);
      if (card) {
        // Pre-select the market based on URL parameter
        setTimeout(() => {
          card.classList.add('selected');
          selectedMarket = marketParam;
        }, 100);
      }
    }
  }

  // Initialize URL parameter handling
  handleUrlParams();

  // Export functions for use in other scripts
  window.marketUtils = {
    getSelectedMarket: () => selectedMarket,
    getMarketDetails: getMarketDetails,
    selectMarket: (market) => {
      const card = document.querySelector(`[data-market="${market}"]`);
      if (card) {
        card.click();
      }
    }
  };

  // Add smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = 'smooth';

  // Add page transition effects
  document.body.style.transition = 'opacity 0.3s ease';
  
  // Fade in effect on page load
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
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