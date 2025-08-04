document.addEventListener('DOMContentLoaded', function() {
  const categoryCards = document.querySelectorAll('.category-card');
  const navButtons = document.querySelectorAll('.nav-btn');
  const backArrow = document.querySelector('.back-arrow');
  let selectedCategory = null;

  // Handle category selection
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      const categoryName = this.querySelector('.category-name').textContent;
      
      // Remove selection from all cards
      categoryCards.forEach(c => c.classList.remove('selected'));
      
      // Add selection to clicked card
      this.classList.add('selected');
      selectedCategory = category;
      
      // Add selection animation
      this.classList.add('selecting');
      setTimeout(() => {
        this.classList.remove('selecting');
      }, 300);
      
      console.log('Selected category:', categoryName);
      
      // You can add navigation or API call here
      // For example, navigate to price details page
      setTimeout(() => {
        alert(`Selected category: ${categoryName}`);
        // Navigate to price details page
        // window.location.href = `price-details.html?category=${category}`;
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
          window.location.href = 'sell.html';
          break;
        case 'price':
          // Already on price page
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
    // window.location.href = 'previous-page.html';
  });

  // Add hover effects for better UX
  categoryCards.forEach(card => {
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
  categoryCards.forEach(card => {
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
  const categoryImages = document.querySelectorAll('.category-image');
  categoryImages.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
      this.style.opacity = '0.5';
      console.warn('Failed to load image:', this.src);
    });
  });

  // Optional: Add category data for dynamic content
  const categoryData = {
    potato: { name: 'Potato', price: '৳60/Kg' },
    tomato: { name: 'Tomato', price: '৳80/Kg' },
    onion: { name: 'Onion', price: '৳45/Kg' },
    rice: { name: 'Rice', price: '৳120/Kg' },
    wheat: { name: 'Wheat', price: '৳90/Kg' },
    corn: { name: 'Corn', price: '৳70/Kg' }
  };

  // Function to get category details
  function getCategoryDetails(category) {
    return categoryData[category] || { name: 'Unknown', price: 'N/A' };
  }

  // Export functions for use in other scripts
  window.categoryUtils = {
    getSelectedCategory: () => selectedCategory,
    getCategoryDetails: getCategoryDetails,
    selectCategory: (category) => {
      const card = document.querySelector(`[data-category="${category}"]`);
      if (card) {
        card.click();
      }
    }
  };
}); 