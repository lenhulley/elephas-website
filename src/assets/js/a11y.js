/* Elephas — accessibility panel (adapted from the Infobox implementation)
   Font size, dark mode, reduced contrast, dyslexia font, spacing,
   reduced motion, reading guide. Persisted in localStorage. Bilingual. */

(function () {
    var root = document.documentElement;
    var sv = root.lang === 'sv';

    var t = sv ? {
        settings: 'Tillgänglighetsinställningar',
        title: 'Tillgänglighet',
        close: 'Stäng panelen',
        fontSize: 'Textstorlek',
        fontLabels: ['Minsta textstorlek', 'Mindre textstorlek', 'Normal textstorlek', 'Större textstorlek', 'Största textstorlek'],
        dark: 'Mörkt läge',
        lowContrast: 'Minskad kontrast',
        dyslexia: 'Dyslexivänligt typsnitt',
        spacing: 'Ökat teckenavstånd',
        motion: 'Minskad rörelse',
        guide: 'Läslinjal',
        reset: 'Återställ alla inställningar'
    } : {
        settings: 'Accessibility settings',
        title: 'Accessibility',
        close: 'Close accessibility panel',
        fontSize: 'Font size',
        fontLabels: ['Smallest font size', 'Smaller font size', 'Default font size', 'Larger font size', 'Largest font size'],
        dark: 'Dark mode',
        lowContrast: 'Reduced contrast',
        dyslexia: 'Dyslexia-friendly font',
        spacing: 'Increased spacing',
        motion: 'Reduced motion',
        guide: 'Reading guide',
        reset: 'Reset all settings'
    };

    var icons = {
        person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4.5" r="2.5"/><path d="M12 7v5"/><path d="M8 22l4-10 4 10"/><path d="M5 10h14"/></svg>',
        close: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/></svg>',
        dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>',
        contrast: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
        font: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
        spacing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10H3"/><path d="M21 6H3"/><path d="M21 14H3"/><path d="M21 18H3"/></svg>',
        motion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
        guide: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>'
    };

    function toggleHtml(key, icon, label) {
        return '<div class="a11y-control-group"><button class="a11y-toggle" role="switch" aria-checked="false" data-a11y="' + key + '">' +
            icon + '<span>' + label + '</span><span class="a11y-toggle-indicator"></span></button></div>';
    }

    var trigger = document.createElement('button');
    trigger.className = 'a11y-trigger';
    trigger.setAttribute('aria-label', t.settings);
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'a11y-panel');
    trigger.innerHTML = icons.person;

    var fontBtnsHtml = t.fontLabels.map(function (label, i) {
        return '<button aria-label="' + label + '" data-a11y-fontsize="' + (i + 1) + '"' + (i === 2 ? ' class="active"' : '') + '>A</button>';
    }).join('');

    var panel = document.createElement('div');
    panel.id = 'a11y-panel';
    panel.className = 'a11y-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', t.settings);
    panel.innerHTML =
        '<div class="a11y-panel-header"><h2>' + t.title + '</h2>' +
        '<button class="a11y-panel-close" aria-label="' + t.close + '">' + icons.close + '</button></div>' +
        '<div class="a11y-panel-body">' +
        '<div class="a11y-control-group"><span class="a11y-control-label" id="a11y-fontsize-label">' + t.fontSize + '</span>' +
        '<div class="a11y-fontsize-controls" role="group" aria-labelledby="a11y-fontsize-label">' + fontBtnsHtml + '</div></div>' +
        toggleHtml('dark', icons.dark, t.dark) +
        toggleHtml('low-contrast', icons.contrast, t.lowContrast) +
        toggleHtml('dyslexia-font', icons.font, t.dyslexia) +
        toggleHtml('wide-spacing', icons.spacing, t.spacing) +
        toggleHtml('reduced-motion', icons.motion, t.motion) +
        toggleHtml('reading-guide', icons.guide, t.guide) +
        '<div class="a11y-control-group"><button class="a11y-reset" data-a11y="reset-all">' + t.reset + '</button></div>' +
        '</div>';

    var topShade = document.createElement('div');
    topShade.className = 'a11y-reading-shade';
    var bottomShade = document.createElement('div');
    bottomShade.className = 'a11y-reading-shade';

    document.body.appendChild(trigger);
    document.body.appendChild(panel);
    document.body.appendChild(topShade);
    document.body.appendChild(bottomShade);

    var closeBtn = panel.querySelector('.a11y-panel-close');
    var fontBtns = Array.prototype.slice.call(panel.querySelectorAll('[data-a11y-fontsize]'));
    var toggles = Array.prototype.slice.call(panel.querySelectorAll('.a11y-toggle'));
    var resetBtn = panel.querySelector('[data-a11y="reset-all"]');

    var classMap = {
        'dark': 'a11y-dark',
        'low-contrast': 'a11y-low-contrast',
        'dyslexia-font': 'a11y-dyslexia-font',
        'wide-spacing': 'a11y-wide-spacing',
        'reduced-motion': 'a11y-reduced-motion',
        'reading-guide': 'a11y-reading-guide'
    };

    var defaults = { fontSize: 3, 'dark': false, 'low-contrast': false, 'dyslexia-font': false, 'wide-spacing': false, 'reduced-motion': false, 'reading-guide': false };
    var prefs = defaults;
    try {
        var stored = JSON.parse(localStorage.getItem('elephas-a11y'));
        if (stored) prefs = Object.assign({}, defaults, stored);
    } catch (e) {}

    applyAll();

    trigger.addEventListener('click', function () {
        var isOpen = panel.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) closeBtn.focus();
    });

    closeBtn.addEventListener('click', closePanel);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && panel.classList.contains('open')) closePanel();
    });

    function closePanel() {
        panel.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
    }

    fontBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            prefs.fontSize = parseInt(btn.getAttribute('data-a11y-fontsize'), 10);
            save();
            applyAll();
            updateBand();
        });
    });

    toggles.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var key = btn.getAttribute('data-a11y');
            prefs[key] = !prefs[key];
            save();
            applyAll();
        });
    });

    resetBtn.addEventListener('click', function () {
        try { localStorage.removeItem('elephas-a11y'); } catch (e) {}
        prefs = Object.assign({}, defaults);
        applyAll();
    });

    function applyAll() {
        for (var i = 1; i <= 5; i++) root.classList.remove('a11y-font-size-' + i);
        if (prefs.fontSize !== 3) root.classList.add('a11y-font-size-' + prefs.fontSize);
        fontBtns.forEach(function (btn) {
            btn.classList.toggle('active', parseInt(btn.getAttribute('data-a11y-fontsize'), 10) === prefs.fontSize);
        });
        Object.keys(classMap).forEach(function (key) {
            root.classList.toggle(classMap[key], !!prefs[key]);
        });
        toggles.forEach(function (btn) {
            btn.setAttribute('aria-checked', String(!!prefs[btn.getAttribute('data-a11y')]));
        });
    }

    function save() {
        try { localStorage.setItem('elephas-a11y', JSON.stringify(prefs)); } catch (e) {}
    }

    // Reading guide — a clear band following the pointer
    var bandHeight = 96;
    var rafId = null;
    var lastY = -1;

    function updateBand() {
        bandHeight = parseFloat(getComputedStyle(root).fontSize) * 6;
    }

    function updateGuide(y) {
        if (y === lastY) return;
        lastY = y;
        var top = Math.max(0, y - bandHeight / 2);
        var bottom = y + bandHeight / 2;
        topShade.style.top = '0';
        topShade.style.height = top + 'px';
        bottomShade.style.top = bottom + 'px';
        bottomShade.style.height = Math.max(0, window.innerHeight - bottom) + 'px';
    }

    function onMove(y) {
        if (!root.classList.contains('a11y-reading-guide')) return;
        if (rafId) return;
        rafId = requestAnimationFrame(function () {
            updateGuide(y);
            rafId = null;
        });
    }

    document.addEventListener('mousemove', function (e) { onMove(e.clientY); });
    document.addEventListener('touchmove', function (e) { onMove(e.touches[0].clientY); }, { passive: true });

    updateBand();
})();
