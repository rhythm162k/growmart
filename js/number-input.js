document.addEventListener('DOMContentLoaded', function() {
    const mobileNumberInput = document.getElementById('mobileNumber');
    const nextButton = document.getElementById('nextButton');
    const rightArrow = document.querySelector('.right-arrow');
    const languageSelector = document.querySelector('.language-selector');

    // Mobile number input functionality
    mobileNumberInput.addEventListener('focus', function() {
        // This will trigger the numeric keyboard on mobile devices
        this.setAttribute('inputmode', 'numeric');
        this.setAttribute('pattern', '[0-9]*');
        
        // Add visual feedback
        this.parentElement.classList.add('focused');
    });

    mobileNumberInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });

    // Only allow numeric input
    mobileNumberInput.addEventListener('input', function(e) {
        // Remove any non-numeric characters
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // Limit to 11 digits (typical mobile number length)
        if (this.value.length > 11) {
            this.value = this.value.slice(0, 11);
        }
        
        // Enable/disable next button based on input length
        updateNextButtonState();
    });

    // Handle keydown events
    mobileNumberInput.addEventListener('keydown', function(e) {
        // Allow: backspace, delete, tab, escape, enter, and navigation keys
        if ([8, 9, 27, 13, 46, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
            // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true)) {
            return;
        }
        
        // Ensure that it is a number and stop the keypress if not
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    // Next button functionality
    nextButton.addEventListener('click', function() {
        const number = mobileNumberInput.value.trim();
        
        if (number.length >= 10) {
            // Valid mobile number - proceed to next step
            console.log('Mobile number entered:', number);
            
            // Add loading state
            this.classList.add('loading');
            
            // Simulate API call or navigation
            setTimeout(() => {
                // Here you would typically navigate to the next page
                // For now, we'll just show a success message
                alert('Mobile number verified! Proceeding to next step...');
                this.classList.remove('loading');
            }, 1000);
        } else {
            // Invalid mobile number
            showError('Please enter a valid mobile number');
        }
    });

    // Right arrow functionality
    rightArrow.addEventListener('click', function() {
        // Navigate to next page or show menu
        console.log('Right arrow clicked');
        // Add your navigation logic here
    });

    // Language selector functionality
    languageSelector.addEventListener('click', function() {
        console.log('Language selector clicked');
        // Toggle language or show language selection modal
        toggleLanguage();
    });

    // Update next button state based on input
    function updateNextButtonState() {
        const number = mobileNumberInput.value.trim();
        const isValid = number.length >= 10;
        
        if (isValid) {
            nextButton.classList.add('active');
        } else {
            nextButton.classList.remove('active');
        }
    }

    // Show error message
    function showError(message) {
        // Create error element if it doesn't exist
        let errorElement = document.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.cssText = `
                color: #ff4444;
                font-size: 14px;
                margin-top: 8px;
                text-align: center;
                animation: shake 0.5s ease-in-out;
            `;
            mobileNumberInput.parentElement.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        
        // Remove error after 3 seconds
        setTimeout(() => {
            if (errorElement.parentElement) {
                errorElement.parentElement.removeChild(errorElement);
            }
        }, 3000);
    }

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

    // Add shake animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .next-button.loading {
            pointer-events: none;
            opacity: 0.7;
        }
        
        .next-button.loading .next-icon {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .input-field.focused {
            transform: translateY(-2px);
        }
        
        .input-field.focused .input-line {
            background-color: #53B175;
            height: 2px;
        }
    `;
    document.head.appendChild(style);

    // Initialize button state
    updateNextButtonState();

    // Add touch feedback for mobile devices
    if ('ontouchstart' in window) {
        nextButton.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        nextButton.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        rightArrow.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        rightArrow.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Handle form submission
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            nextButton.click();
        }
    });

    // Auto-focus on mobile number input when page loads
    // Only on desktop to avoid mobile keyboard popup
    if (window.innerWidth > 768) {
        setTimeout(() => {
            mobileNumberInput.focus();
        }, 500);
    }
}); 