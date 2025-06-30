// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.section-title, .about-content, .project-card, .contact-content');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const mailto = `mailto:jeruelestranero@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
            window.location.href = mailto;
        });
    }

    // Email social link mailto
    const emailSocialLink = document.querySelector('.social-link[href^="mailto:"]');
    if (emailSocialLink) {
        emailSocialLink.addEventListener('click', function(e) {
            e.preventDefault();
            const mailto = 'mailto:jeruelestranero@gmail.com?subject=Hello%20Jeruel%20(from%20your%20portfolio)&body=Hi%20Jeruel,%0A%0AI would like to connect with you!';
            window.location.href = mailto;
        });
    }
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add skill item animations
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('fade-in');
    observer.observe(item);
});

// Smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize section animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section:not(.hero)');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Add active navigation highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Typing animation for hero section
const typingText = document.querySelector('.typing-text');
const heroTyping = document.querySelector('.hero-typing');
if (typingText && heroTyping) {
    heroTyping.classList.remove('visible');
    setTimeout(() => {
        heroTyping.classList.add('visible');
        const roles = ['WEB DEVELOPER', 'GRAPHIC DESIGNER'];
        let roleIndex = 0;
        let i = 0;
        let isDeleting = false;
        let currentText = '';

        function typeLoop() {
            const fullText = roles[roleIndex];
            if (!isDeleting) {
                currentText = fullText.substring(0, i + 1);
                typingText.textContent = currentText;
                i++;
                if (i === fullText.length) {
                    setTimeout(() => {
                        isDeleting = true;
                        typeLoop();
                    }, 1200); // Pause after typing
                    return;
                }
            } else {
                currentText = fullText.substring(0, i - 1);
                typingText.textContent = currentText;
                i--;
                if (i === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }
            setTimeout(typeLoop, isDeleting ? 60 : 120);
        }
        typeLoop();
    }, 400);
}

// Particle background for hero section
window.addEventListener('DOMContentLoaded', () => {
    const particlesBg = document.querySelector('.particles-bg');
    if (!particlesBg) return;
    const numParticles = 28;
    for (let i = 0; i < numParticles; i++) {
        const dot = document.createElement('div');
        dot.className = 'particle-dot';
        // Random position
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        // Random animation duration and delay
        dot.style.animationDuration = (10 + Math.random() * 6) + 's';
        dot.style.animationDelay = (Math.random() * 12) + 's';
        // Random size
        const size = 6 + Math.random() * 10;
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        // Random color shade
        if (Math.random() > 0.5) {
            dot.style.background = 'rgba(225, 29, 72, 0.18)';
        } else {
            dot.style.background = 'rgba(255, 90, 95, 0.15)';
        }
        particlesBg.appendChild(dot);
    }
});

// Modal Contact Form Logic
function openContactModal() {
  document.getElementById('contactModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    const nameInput = document.getElementById('modal-name');
    if (nameInput) nameInput.focus();
  }, 200);
}
function closeContactModal() {
  document.getElementById('contactModalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('DOMContentLoaded', function() {
  // Open modal
  const openModalBtn = document.querySelector('.open-modal-btn');
  if (openModalBtn) {
    openModalBtn.addEventListener('click', openContactModal);
  }
  // Close modal (button)
  const closeModalBtn = document.getElementById('closeModalBtn');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeContactModal);
  }
  // Close modal (overlay click)
  const modalOverlay = document.getElementById('contactModalOverlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) closeContactModal();
    });
  }
  // Close modal (ESC key)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('contactModalOverlay').classList.contains('active')) {
      closeContactModal();
    }
  });
  // Modal form submit
  const modalForm = document.querySelector('.modal-form');
  if (modalForm) {
    modalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('modal-name').value;
      const email = document.getElementById('modal-email').value;
      const message = document.getElementById('modal-message').value;
      const mailto = `mailto:jeruelestranero@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
      window.location.href = mailto;
      closeContactModal();
    });
  }
});