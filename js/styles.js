document.addEventListener('DOMContentLoaded', function() {
    // Add CSS animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-20px); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        .upcoming {
            background: linear-gradient(45deg, #f4f1c9, #e8e4a6) !important;
            color: #333 !important;
        }
        
        .nav-menu.active {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        }
        
        .nav-menu.active .nav-list {
            flex-direction: column;
            padding: 20px;
        }
        
        .nav-menu.active .nav-link {
            padding: 15px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        /* Animations pour le carousel hero */
        .hero-title, .hero-subtitle, .btn-hero, .hero-img {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});