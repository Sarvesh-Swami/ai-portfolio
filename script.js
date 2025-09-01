// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Account for fixed header if any
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Check if this is a Netlify form (has data-netlify attribute)
            const isNetlifyForm = this.hasAttribute('data-netlify');
            
            if (!isNetlifyForm) {
                // Only prevent default for non-Netlify forms
                e.preventDefault();
            }
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();
            
            // Clear previous error messages
            clearErrorMessages();
            
            // Validate form fields
            let isValid = true;
            
            if (!name) {
                showError('name', 'Name is required');
                isValid = false;
            }
            
            if (!email) {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!message) {
                showError('message', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            if (!isValid) {
                if (!isNetlifyForm) {
                    return;
                } else {
                    e.preventDefault();
                    return;
                }
            }
            
            // If it's a Netlify form and validation passes, let it submit naturally
            if (isNetlifyForm) {
                return; // Let Netlify handle the submission
            }
            
            // For non-Netlify forms, handle submission manually
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
            
            // Simulate form submission for development/testing
            submitContactForm(name, email, message)
                .then(() => {
                    showSuccessMessage('Thank you for your message! I\'ll get back to you within 24 hours.');
                    this.reset();
                })
                .catch((error) => {
                    showErrorMessage('Sorry, there was an error sending your message. Please try again or contact me directly via email.');
                    console.error('Form submission error:', error);
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                });
        });
    }
    
    // Helper functions for form validation and submission
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '0.8em';
        errorDiv.style.marginTop = '5px';
        field.parentElement.appendChild(errorDiv);
        field.style.borderColor = '#ff6b6b';
    }
    
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        const fields = document.querySelectorAll('#name, #email, #message');
        fields.forEach(field => field.style.borderColor = '#444');
    }
    
    function showSuccessMessage(message) {
        const form = document.querySelector('.contact-form');
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #00bcd4, #00d4e6);
                color: #1e1e1e;
                padding: 15px 20px;
                border-radius: 10px;
                margin-bottom: 20px;
                text-align: center;
                font-weight: 500;
                box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
            ">
                ✓ ${message}
            </div>
        `;
        form.insertBefore(successDiv, form.firstChild);
        setTimeout(() => successDiv.remove(), 5000);
    }
    
    function showErrorMessage(message) {
        const form = document.querySelector('.contact-form');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message-global';
        errorDiv.innerHTML = `
            <div style="
                background: #ff6b6b;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                margin-bottom: 20px;
                text-align: center;
                font-weight: 500;
            ">
                ✗ ${message}
            </div>
        `;
        form.insertBefore(errorDiv, form.firstChild);
        setTimeout(() => errorDiv.remove(), 5000);
    }
    
    async function submitContactForm(name, email, message) {
        // This simulates a real form submission
        // In a real application, you would send this data to your backend API
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success most of the time (90% success rate)
                if (Math.random() > 0.1) {
                    // Log the form data (in real app, this would be sent to server)
                    console.log('Form submitted successfully:', {
                        name: name,
                        email: email,
                        message: message,
                        timestamp: new Date().toISOString()
                    });
                    resolve();
                } else {
                    // Simulate occasional network error
                    reject(new Error('Network error'));
                }
            }, 2000); // 2 second delay to simulate real API call
        });
    }
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#121212';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.experience-item, .app-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Typing effect for hero section
    const heroText = document.querySelector('.hero p');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
});
