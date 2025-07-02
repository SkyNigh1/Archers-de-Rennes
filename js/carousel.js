document.addEventListener('DOMContentLoaded', function() {
    // Hero Carousel
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroImage = document.querySelector('.hero-img');
    const heroButton = document.querySelector('.btn-hero');
    
    const newsData = [
        {
            title: "Champions d'Europe pour la Quatrième Fois",
            subtitle: "Les Archers de Rennes continuent de briller sur la scène internationale",
            image: "img/championship-photo.jpg",
            buttonText: "Voir nos résultats",
            buttonLink: "resultats.html"
        },
        {
            title: "2 médailles rennaises aux Championnats de France Salle 2025",
            subtitle: "Nos archers ont brillé lors des Championnats de France en salle",
            image: "img/france-championship-2025.jpeg", 
            buttonText: "Lire l'article",
            buttonLink: "articles.html"
        },
        {
            title: "Les archers rennais brillent au Championnat de France Universitaire 2025",
            subtitle: "Excellents résultats de nos étudiants archers",
            image: "img/university-championship.jpg",
            buttonText: "Découvrir les résultats",
            buttonLink: "resultats.html"
        }
    ];
    
    let currentSlide = 0;
    
    function updateHeroContent(index) {
        const newsItem = newsData[index];
        
        if (!heroTitle || !heroSubtitle || !heroButton || !heroImage) {
            console.warn('Éléments hero non trouvés');
            return;
        }
        
        heroTitle.style.opacity = '0';
        heroSubtitle.style.opacity = '0';
        heroButton.style.opacity = '0';
        heroImage.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.textContent = newsItem.title;
            heroSubtitle.textContent = newsItem.subtitle;
            heroButton.textContent = newsItem.buttonText;
            heroButton.href = newsItem.buttonLink;
            heroImage.src = newsItem.image;
            heroImage.alt = newsItem.title;
            
            heroTitle.style.opacity = '1';
            heroSubtitle.style.opacity = '1';
            heroButton.style.opacity = '1';
            heroImage.style.opacity = '1';
        }, 300);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % newsData.length;
        updateHeroContent(currentSlide);
    }
    
    if (heroTitle && heroSubtitle && heroButton && heroImage) {
        setInterval(nextSlide, 8000);
    }
});
