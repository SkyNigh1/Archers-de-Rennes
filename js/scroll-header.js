document.addEventListener('DOMContentLoaded', function() {
    // Debounced scroll handler for header animation
    let isHeaderHidden = false;
    let lastScrollY = window.scrollY;
    let lastTransitionScrollY = 0;

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const handleScroll = debounce(function() {
        const header = document.querySelector('.header');
        const headerBottom = document.querySelector('.header-bottom');
        const brandTitle = document.querySelector('.brand-title');
        const logo = document.querySelector('.logo');
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const scrollY = window.scrollY;
        const threshold = 50;
        const buffer = 20;

        // Determine scroll direction
        const isScrollingDown = scrollY > lastScrollY;

        // Check if we've moved significantly since the last transition
        const hasMovedSignificantly = Math.abs(scrollY - lastTransitionScrollY) > buffer;

        if (isScrollingDown && scrollY > threshold && !isHeaderHidden && hasMovedSignificantly) {
            header.style.background = 'linear-gradient(135deg, rgba(44, 44, 44, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)';
            header.style.backdropFilter = 'blur(10px)';
            
            if (headerBottom) headerBottom.classList.add('hidden');
            if (brandTitle) brandTitle.classList.add('scrolled');
            if (logo) logo.classList.add('scrolled');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileToggle) mobileToggle.classList.remove('active');
            }
            isHeaderHidden = true;
            lastTransitionScrollY = scrollY;
        } else if (!isScrollingDown && scrollY < threshold - buffer && isHeaderHidden && hasMovedSignificantly) {
            header.style.background = 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)';
            header.style.backdropFilter = 'none';
            
            if (headerBottom) headerBottom.classList.remove('hidden');
            if (brandTitle) brandTitle.classList.remove('scrolled');
            if (logo) logo.classList.remove('scrolled');
            isHeaderHidden = false;
            lastTransitionScrollY = scrollY;
        }
        lastScrollY = scrollY;
    }, 100);

    window.addEventListener('scroll', handleScroll);
});