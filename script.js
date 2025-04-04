// Enhanced Authentication System JavaScript

// CAPTCHA generation with improved complexity
function generateMathCaptcha(questionElement, answerInput, errorElement) {
    // Clear previous errors
    if (errorElement) errorElement.textContent = '';
    
    // Generate random operation (addition, subtraction, multiplication)
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * 3)];
    
    let num1, num2, answer;
    
    // Generate appropriate numbers based on operation
    switch(operation) {
        case '+':
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;
            answer = num1 + num2;
            break;
        case '-':
            num1 = Math.floor(Math.random() * 20) + 10;
            num2 = Math.floor(Math.random() * 10) + 1;
            answer = num1 - num2;
            break;
        case '*':
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 5) + 1;
            answer = num1 * num2;
            break;
    }
    
    questionElement.textContent = `${num1} ${operation} ${num2} = ?`;
    questionElement.dataset.answer = answer;
    answerInput.value = '';
}

// Initialize CAPTCHAs for all forms
const captchas = {
    login: {
        question: document.getElementById('loginCaptchaQuestion'),
        input: document.getElementById('loginCaptchaInput'),
        error: document.getElementById('loginCaptchaError')
    },
    signup: {
        question: document.getElementById('signupCaptchaQuestion'),
        input: document.getElementById('signupCaptchaInput'),
        error: document.getElementById('signupCaptchaError')
    },
    forgot: {
        question: document.getElementById('forgotCaptchaQuestion'),
        input: document.getElementById('forgotCaptchaInput'),
        error: document.getElementById('forgotCaptchaError')
    }
};

// Navigation functions with smooth animations
function showLogin() {
    // Hide other containers
    document.getElementById('signupContainer').classList.add('hidden');
    document.getElementById('forgotPasswordContainer').classList.add('hidden');
    
    // Show login container with animation
    const loginContainer = document.getElementById('loginContainer');
    loginContainer.classList.remove('hidden');
    loginContainer.classList.add('fade-in');
    
    // Generate new CAPTCHA
    generateMathCaptcha(captchas.login.question, captchas.login.input, captchas.login.error);
    
    // Focus the first input field
    setTimeout(() => {
        document.getElementById('loginEmail').focus();
    }, 100);
}

function showSignup() {
    // Hide other containers
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('forgotPasswordContainer').classList.add('hidden');
    
    // Show signup container with animation
    const signupContainer = document.getElementById('signupContainer');
    signupContainer.classList.remove('hidden');
    signupContainer.classList.add('fade-in');
    
    // Generate new CAPTCHA
    generateMathCaptcha(captchas.signup.question, captchas.signup.input, captchas.signup.error);
    
    // Focus the first input field
    setTimeout(() => {
        document.getElementById('firstName').focus();
    }, 100);
}

function showForgotPassword() {
    // Hide other containers
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('signupContainer').classList.add('hidden');
    
    // Show forgot password container with animation
    const forgotContainer = document.getElementById('forgotPasswordContainer');
    forgotContainer.classList.remove('hidden');
    forgotContainer.classList.add('fade-in');
    
    // Generate new CAPTCHA
    generateMathCaptcha(captchas.forgot.question, captchas.forgot.input, captchas.forgot.error);
    
    // Focus the input field
    setTimeout(() => {
        document.getElementById('resetContact').focus();
    }, 100);
}

// Password strength validation
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const strengthFeedback = document.getElementById('passwordStrength');
const matchFeedback = document.getElementById('passwordMatch');

if (passwordInput) {
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        let feedback = '';
        
        // Length check
        if (password.length >= 8) {
            strength += 1;
        } else {
            feedback = 'Password should be at least 8 characters long';
        }
        
        // Contains uppercase
        if (/[A-Z]/.test(password)) {
            strength += 1;
        }
        
        // Contains lowercase
        if (/[a-z]/.test(password)) {
            strength += 1;
        }
        
        // Contains number
        if (/[0-9]/.test(password)) {
            strength += 1;
        }
        
        // Contains special char
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
        }
        
        // Set feedback based on strength
        if (password.length > 0) {
            if (strength < 3) {
                strengthFeedback.textContent = feedback || 'Weak password';
                strengthFeedback.style.color = '#ef4444';
            } else if (strength < 5) {
                strengthFeedback.textContent = 'Medium strength password';
                strengthFeedback.style.color = '#f59e0b';
            } else {
                strengthFeedback.textContent = 'Strong password';
                strengthFeedback.style.color = '#10b981';
            }
        } else {
            strengthFeedback.textContent = '';
        }
        
        // Check match if confirm password has value
        if (confirmInput.value) {
            checkPasswordMatch();
        }
    });
}

if (confirmInput) {
    confirmInput.addEventListener('input', checkPasswordMatch);
}

function checkPasswordMatch() {
    if (passwordInput.value !== confirmInput.value) {
        matchFeedback.textContent = 'Passwords do not match';
        matchFeedback.style.color = '#ef4444';
        return false;
    } else if (confirmInput.value) {
        matchFeedback.textContent = 'Passwords match';
        matchFeedback.style.color = '#10b981';
        return true;
    } else {
        matchFeedback.textContent = '';
        return false;
    }
}

// Form submissions with improved validation
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate CAPTCHA
    const userAnswer = parseInt(captchas.signup.input.value);
    const correctAnswer = parseInt(captchas.signup.question.dataset.answer);
    
    if (isNaN(userAnswer) || userAnswer !== correctAnswer) {
        captchas.signup.error.textContent = 'Invalid CAPTCHA answer, please try again';
        generateMathCaptcha(captchas.signup.question, captchas.signup.input, captchas.signup.error);
        return;
    }

    // Validate terms checkbox
    if (!document.getElementById('termsCheckbox').checked) {
        document.getElementById('termsError').textContent = 'You must accept the Terms and Conditions';
        return;
    }
    
    // Validate password match
    if (!checkPasswordMatch()) {
        return;
    }
    
    // Show success message with animation
    this.classList.add('hidden');
    const success = document.createElement('div');
    success.className = 'success-message fade-in';
    success.innerHTML = '<strong>Registration successful!</strong><br>Redirecting to login...';
    document.getElementById('signupContainer').appendChild(success);
    
    // Redirect to login after delay
    setTimeout(showLogin, 3000);
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate CAPTCHA
    const userAnswer = parseInt(captchas.login.input.value);
    const correctAnswer = parseInt(captchas.login.question.dataset.answer);
    
    if (isNaN(userAnswer) || userAnswer !== correctAnswer) {
        captchas.login.error.textContent = 'Invalid CAPTCHA answer, please try again';
        generateMathCaptcha(captchas.login.question, captchas.login.input, captchas.login.error);
        return;
    }

    // Display a success message (simulating login)
    this.classList.add('hidden');
    const success = document.createElement('div');
    success.className = 'success-message fade-in';
    success.innerHTML = '<strong>Login successful!</strong><br>Redirecting to dashboard...';
    document.getElementById('loginContainer').appendChild(success);
    
    // In a real app, you would redirect to the dashboard/home page here
    // For demo purposes, we'll just reset the form and show it again after a delay
    setTimeout(() => {
        document.getElementById('loginContainer').removeChild(success);
        this.classList.remove('hidden');
        this.reset();
        generateMathCaptcha(captchas.login.question, captchas.login.input, captchas.login.error);
    }, 3000);
});

document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate CAPTCHA
    const userAnswer = parseInt(captchas.forgot.input.value);
    const correctAnswer = parseInt(captchas.forgot.question.dataset.answer);
    
    if (isNaN(userAnswer) || userAnswer !== correctAnswer) {
        captchas.forgot.error.textContent = 'Invalid CAPTCHA answer, please try again';
        generateMathCaptcha(captchas.forgot.question, captchas.forgot.input, captchas.forgot.error);
        return;
    }

    // Display a success message
    this.classList.add('hidden');
    const success = document.createElement('div');
    success.className = 'success-message fade-in';
    success.innerHTML = '<strong>Password reset link sent!</strong><br>Please check your email or phone for further instructions.';
    document.getElementById('forgotPasswordContainer').appendChild(success);
    
    // Return to login after delay
    setTimeout(() => {
        document.getElementById('forgotPasswordContainer').removeChild(success);
        showLogin();
    }, 3000);
});

// Terms and Conditions Modal Functions
function showTermsModal(event) {
    if (event) event.preventDefault();
    document.getElementById('termsModal').classList.remove('hidden');
}

function closeTermsModal() {
    document.getElementById('termsModal').classList.add('hidden');
}

function acceptTerms() {
    document.getElementById('termsCheckbox').checked = true;
    closeTermsModal();
    document.getElementById('termsError').textContent = '';
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('termsModal');
    if (event.target === modal) {
        closeTermsModal();
    }
});

// Initialize the application
window.addEventListener('DOMContentLoaded', function() {
    // Start with login form
    showLogin();
    
    // Add input field animations
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        // Add focus visual feedback
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});