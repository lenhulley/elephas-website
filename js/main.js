// ===== Language Switcher =====
const langToggle = document.getElementById('langToggle');
const langOptions = langToggle.querySelectorAll('.lang-option');
const translatables = document.querySelectorAll('[data-en]');

function setLanguage(lang) {
    translatables.forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        }
    });

    langOptions.forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    localStorage.setItem('elephas-lang', lang);
}

langToggle.addEventListener('click', () => {
    const current = localStorage.getItem('elephas-lang') || 'en';
    setLanguage(current === 'en' ? 'sv' : 'en');
});

// Restore saved language
const savedLang = localStorage.getItem('elephas-lang');
if (savedLang && savedLang !== 'en') {
    setLanguage(savedLang);
}

// ===== Mobile Navigation =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// ===== Sticky Nav Shadow =====
const nav = document.getElementById('nav');

function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 10);
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ===== Scroll Animations =====
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));

// ===== Contact Form Handling =====
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const lang = localStorage.getItem('elephas-lang') || 'en';
    submitBtn.disabled = true;
    submitBtn.textContent = lang === 'sv' ? 'Skickar...' : 'Sending...';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            formStatus.textContent = lang === 'sv'
                ? 'Tack! Ditt meddelande har skickats.'
                : 'Thank you! Your message has been sent.';
            formStatus.className = 'form-status success';
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch {
        formStatus.textContent = lang === 'sv'
            ? 'Något gick fel. Försök igen.'
            : 'Something went wrong. Please try again.';
        formStatus.className = 'form-status error';
    }

    submitBtn.disabled = false;
    submitBtn.textContent = lang === 'sv' ? 'Skicka meddelande' : 'Send Message';
});
