// ===== Mobile Navigation =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const open = navToggle.classList.toggle('open');
        navLinks.classList.toggle('open', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
}

// ===== Sticky Nav Shadow =====
const nav = document.getElementById('nav');

function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 10);
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ===== Scroll Animations =====
const fadeEls = document.querySelectorAll('.fade-in');

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    fadeEls.forEach(el => el.classList.add('visible'));
} else {
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
}

// ===== Contact Form Handling =====
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const isSv = document.documentElement.lang === 'sv';

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const original = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = isSv ? 'Skickar…' : 'Sending…';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = isSv
                    ? 'Tack! Ditt meddelande har skickats.'
                    : 'Thank you! Your message has been sent.';
                formStatus.className = 'form-status success';
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch {
            formStatus.textContent = isSv
                ? 'Något gick fel. Försök igen.'
                : 'Something went wrong. Please try again.';
            formStatus.className = 'form-status error';
        }

        submitBtn.disabled = false;
        submitBtn.textContent = original;
    });
}
