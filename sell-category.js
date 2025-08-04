document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    const navButtons = document.querySelectorAll('.nav-btn');
    const rightArrow = document.querySelector('.right-arrow');
    const languageSelector = document.querySelector('.language-selector');

    // Category card selection functionality
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const categoryName = this.querySelector('.category-name').textContent;
            
            console.log('Selected category:', category, categoryName);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            this.style.backgroundColor = '#F0F8F0';
            
            // Simulate navigation to sell form
            setTimeout(() => {
                // Here you would typically navigate to the sell form page
                // For now, we'll show a success message
                alert(`Selected category: ${categoryName}. Proceeding to sell form...`);
                
                // Reset the card style
                this.style.transform = '';
                this.style.backgroundColor = '';
            }, 300);
        });

        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Navigation button functionality
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            console.log('Navigating to:', page);
            
            // Handle navigation based on page
            switch(page) {
                case 'sell':
                    // Already on sell page
                    break;
                case 'price':
                    // Navigate to price page
                    window.location.href = 'market-prices.html';
                    break;
                case 'home':
                    // Navigate to home page
                    window.location.href = 'growmart.html';
                    break;
                case 'tips':
                    // Navigate to tips page
                    window.location.href = 'category.html';
                    break;
                case 'profile':
                    // Navigate to profile page
                    window.location.href = 'category.html';
                    break;
            }
        });
    });

    // Right arrow functionality
    rightArrow.addEventListener('click', function() {
        console.log('Right arrow clicked');
        // Navigate back or show menu
        window.history.back();
    });

    // Language selector functionality
    languageSelector.addEventListener('click', function() {
        console.log('Language selector clicked');
        toggleLanguage();
    });

    // Toggle language function
    function toggleLanguage() {
        const langText = document.querySelector('.lang-text');
        const currentLang = langText.textContent;
        
        // Toggle between EN and BN (or other languages)
        if (currentLang === 'EN') {
            langText.textContent = 'BN';
            langText.style.color = '#53B175';
        } else {
            langText.textContent = 'EN';
            langText.style.color = '#53B175';
        }
    }

    // Add touch feedback for mobile devices
    if ('ontouchstart' in window) {
        categoryCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        navButtons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        rightArrow.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        rightArrow.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowLeft':
                // Navigate to previous category
                navigateCategory(-1);
                break;
            case 'ArrowRight':
                // Navigate to next category
                navigateCategory(1);
                break;
            case 'Enter':
                // Select focused category
                const focusedCard = document.querySelector('.category-card:focus');
                if (focusedCard) {
                    focusedCard.click();
                }
                break;
        }
    });

    // Category navigation function
    function navigateCategory(direction) {
        const cards = Array.from(categoryCards);
        const currentIndex = cards.findIndex(card => card === document.activeElement);
        const newIndex = (currentIndex + direction + cards.length) % cards.length;
        cards[newIndex].focus();
    }

    // Add focus management for accessibility
    categoryCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid #53B175';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Add loading state for category selection
    function showLoadingState(card) {
        const originalContent = card.innerHTML;
        card.innerHTML = '<div class="loading-spinner"></div>';
        card.style.pointerEvents = 'none';
        
        setTimeout(() => {
            card.innerHTML = originalContent;
            card.style.pointerEvents = '';
        }, 1000);
    }

    // Add loading spinner CSS
    const style = document.createElement('style');
    style.textContent = `
        .loading-spinner {
            width: 20px;
            height: 20px;
            border: 2px solid #f3f3f3;
            border-top: 2px solid #53B175;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .category-card.selected {
            background-color: #F0F8F0;
            border: 2px solid #53B175;
        }
        
        .category-card.selected .category-name {
            color: #53B175;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);

    // Initialize the page
    console.log('Sell Category page loaded');
    
    // Set initial focus for accessibility
    if (categoryCards.length > 0) {
        categoryCards[0].focus();
    }
}); 