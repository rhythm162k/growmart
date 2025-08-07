document.addEventListener('DOMContentLoaded', function() {
    const verificationCodeInput = document.getElementById('verificationCode');
    const codePlaceholder = document.getElementById('codePlaceholder');
    const nextButton = document.getElementById('nextButton');
    const resendCodeButton = document.getElementById('resendCode');

    // Verification code input functionality
    verificationCodeInput.addEventListener('focus', function() {
        // This will trigger the numeric keyboard on mobile devices
        this.setAttribute('inputmode', 'numeric');
        this.setAttribute('pattern', '[0-9]*');
        
        // Add visual feedback
        this.parentElement.classList.add('focused');
    });

    verificationCodeInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });

    // Only allow numeric input and update placeholder
    verificationCodeInput.addEventListener('input', function(e) {
        // Remove any non-numeric characters
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // Limit to 4 digits
        if (this.value.length > 4) {
            this.value = this.value.slice(0, 4);
        }
        
        // Update placeholder based on input length
        updateCodePlaceholder();
        
        // Enable/disable next button based on input length
        updateNextButtonState();
    });

    // Handle keydown events
    verificationCodeInput.addEventListener('keydown', function(e) {
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

    // Update code placeholder based on input
    function updateCodePlaceholder() {
        const code = verificationCodeInput.value;
        const placeholder = '- - - -';
        
        if (code.length === 0) {
            codePlaceholder.textContent = placeholder;
            codePlaceholder.style.opacity = '1';
        } else {
            // Replace dashes with actual numbers
            let newPlaceholder = '';
            for (let i = 0; i < 4; i++) {
                if (i < code.length) {
                    newPlaceholder += code[i];
                } else {
                    newPlaceholder += '-';
                }
                if (i < 3) newPlaceholder += ' ';
            }
            codePlaceholder.textContent = newPlaceholder;
            codePlaceholder.style.opacity = '0';
        }
    }

    // Next button functionality
    nextButton.addEventListener('click', function() {
        const code = verificationCodeInput.value.trim();
        
        if (code.length === 4) {
            // Valid verification code - proceed to next step
            console.log('Verification code entered:', code);
            
            // Add loading state
            this.classList.add('loading');
            
            // Simulate API call or navigation
            setTimeout(() => {
                // Here you would typically verify the code with your backend
                // For now, we'll just show a success message
                alert('Verification code verified! Proceeding to next step...');
                this.classList.remove('loading');
                window.location.href = 'login.html';
            }, 1000);
        } else {
            // Invalid verification code
            showError('Please enter a 4-digit verification code');
        }
    });

    // Resend code functionality
    resendCodeButton.addEventListener('click', function() {
        console.log('Resend code clicked');
        
        // Add loading state
        this.classList.add('loading');
        this.style.pointerEvents = 'none';
        
        // Simulate API call to resend code
        setTimeout(() => {
            alert('Verification code has been resent to your mobile number');
            this.classList.remove('loading');
            this.style.pointerEvents = 'auto';
        }, 1500);
    });

    document.querySelector('.back-btn').addEventListener('click', () => {
        window.history.back();
    });

    // Update next button state based on input
    function updateNextButtonState() {
        const code = verificationCodeInput.value.trim();
        const isValid = code.length === 4;
        
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
            verificationCodeInput.parentElement.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        
        // Remove error after 3 seconds
        setTimeout(() => {
            if (errorElement.parentElement) {
                errorElement.parentElement.removeChild(errorElement);
            }
        }, 3000);
    }

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
        
        resendCodeButton.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        resendCodeButton.addEventListener('touchend', function() {
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

    // Auto-focus on verification code input when page loads
    // Only on desktop to avoid mobile keyboard popup
    if (window.innerWidth > 768) {
        setTimeout(() => {
            verificationCodeInput.focus();
        }, 500);
    }

    // Auto-paste functionality for SMS codes (mobile browsers)
    if ('OTPCredential' in window) {
        navigator.credentials.get({
            otp: { transport: ['sms'] }
        }).then(otp => {
            if (otp && otp.code) {
                verificationCodeInput.value = otp.code;
                updateCodePlaceholder();
                updateNextButtonState();
            }
        }).catch(err => {
            console.log('Auto-paste not supported or user denied');
        });
    }
}); 