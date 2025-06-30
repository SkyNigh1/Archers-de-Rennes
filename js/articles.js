/* ==========================================================================
   ARTICLES PAGE JAVASCRIPT - VERSION CORRIGÉE
   ========================================================================== */

// Article data array
const articles = [
    {
        id: 1,
        image: "img/concours.jpg",
        title: "Championnat Régional 2025",
        date: "2025-06-15",
        text: "Le club organise le championnat régional le 15 juin 2025. Venez nombreux encourager nos archers ! Cet événement promet une compétition acharnée avec les meilleurs archers de la région, dans une ambiance conviviale et festive."
    },
    {
        id: 2,
        image: "img/championship-photo.jpg",
        title: "4ème Victoire au championnat d'Europe",
        date: "2024-10-08",
        text: "Du 4 au 6 octobre 2024, à Ruse en Bulgarie, s’est déroulée la prestigieuse Coupe d’Europe des clubs. Ce rendez-vous incontournable du tir à l’arc a vu les Archers de Rennes inscrire à nouveau leur nom au sommet du palmarès européen. L’équipe masculine, composée de Nicolas Bernardi, Jonathan Vetter, Iewan Verzier-Rousson et dirigée par l’entraîneur Pierrick Leparc, a brillamment décroché son quatrième titre continental, confirmant leur statut de référence dans ce sport exigeant. Dans une finale à couper le souffle, Rennes a affronté Nîmes, une équipe redoutable alignant pas moins de deux médaillés olympiques des Jeux de Paris 2024. Le duel s’annonçait intense, et il a tenu toutes ses promesses. Au terme d'une rencontre serrée et pleine de suspense, les Rennais ont su faire preuve de sang-froid et de précision pour l'emporter, démontrant une fois encore leur maîtrise technique et leur cohésion d’équipe.Cette nouvelle consécration européenne renforce encore davantage la réputation des Archers de Rennes sur la scène internationale et inspire les générations futures de notre association.Bien que l’équipe féminine des Archers de Rennes n’ait pas décroché le podium cette fois-ci, terminant à une honorable 8ème place, leur participation à cette compétition est tout aussi remarquable. Ces résultats témoignent de leur potentiel et de leur ténacité. Elles sont la promesse de belles performances à venir et continuent à porter haut les couleurs de Rennes sur la scène internationale.Nous adressons nos plus vives félicitations à l’ensemble de l’équipe masculine pour ce 4ème titre européen, ainsi qu'à l’équipe féminine pour leur engagement sans faille. Nous remercions également nos partenaires et supporters, qui nous accompagnent à chaque étape de cette aventure sportive. Vous pouvez revivre la finale palpitante Rennes – Nîmes en visionnant ce lien.Pour plus d'informations sur notre association et nos prochaines compétitions, n’hésitez pas à nous contacter par mail à l’adresse suivante : contact@archersderennes.com.Merci et bravo à tous pour votre engagement sans faille dans le développement du tir à l’arc !"
    },
    {
        id: 3,
        image: "img/tir-jeunes.jpg",
        title: "Nouveau Cours pour Jeunes",
        date: "2025-07-01",
        text: "Un nouveau cours pour les jeunes archers débutera le 1er juillet 2025. Inscriptions ouvertes ! Ce programme est conçu pour initier les jeunes au tir à l'arc dans un cadre ludique et sécurisé, encadré par nos entraîneurs expérimentés."
    }
];

// Variables globales
let isInitialized = false;
let animationObserver = null;

// Initialize on page load - Version robuste
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - Initialisation des articles');
    
    // Attendre que tous les éléments soient prêts
    setTimeout(function() {
        initializeArticlesPage();
    }, 50);
});

// Si DOMContentLoaded a déjà été déclenché
if (document.readyState === 'loading') {
    // Le DOM n'est pas encore chargé
    console.log('DOM en cours de chargement...');
} else {
    // Le DOM est déjà chargé
    console.log('DOM déjà chargé - Initialisation immédiate');
    setTimeout(function() {
        initializeArticlesPage();
    }, 50);
}

// ==========================================================================
// INITIALISATION PRINCIPALE
// ==========================================================================

function initializeArticlesPage() {
    if (isInitialized) {
        console.log('Articles déjà initialisés');
        return;
    }
    
    console.log('Initialisation de la page articles...');
    
    try {
        // Vérifier que le conteneur existe
        const articlesList = document.getElementById('articlesList');
        if (!articlesList) {
            console.error('Conteneur articlesList non trouvé');
            return;
        }
        
        // Nettoyer le conteneur
        articlesList.innerHTML = '';
        
        // Rendre les articles
        renderArticles();
        
        // Initialiser la modal
        initializeModal();
        
        // Démarrer les animations après un court délai
        setTimeout(function() {
            initializeAnimations();
        }, 100);
        
        isInitialized = true;
        console.log('Initialisation terminée avec succès');
        
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
}

// ==========================================================================
// RENDER ARTICLES
// ==========================================================================

function sortArticles() {
    return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function renderArticles() {
    const articlesList = document.getElementById('articlesList');
    if (!articlesList) {
        console.error('Conteneur articles non trouvé');
        return false;
    }

    console.log('Rendu de', articles.length, 'articles');
    
    // Vider complètement le conteneur
    articlesList.innerHTML = '';
    
    // Créer et ajouter chaque article
    const sortedArticles = sortArticles();
    const fragment = document.createDocumentFragment();
    
    sortedArticles.forEach(function(article) {
        const articleCard = createArticleCard(article);
        if (articleCard) {
            fragment.appendChild(articleCard);
        }
    });
    
    articlesList.appendChild(fragment);
    
    console.log('Articles rendus:', articlesList.children.length);
    return true;
}

function createArticleCard(article) {
    if (!article || !article.id) {
        console.error('Données d\'article invalides:', article);
        return null;
    }
    
    const card = document.createElement('div');
    card.className = 'article-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    // Formatage de la date
    let formattedDate = '';
    try {
        formattedDate = new Date(article.date).toLocaleDateString('fr-FR', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        });
    } catch (e) {
        formattedDate = article.date;
    }
    
    card.innerHTML = `
        <div class="article-image">
            <img src="${article.image}" alt="${article.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDE1MCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjBGMEYwIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZTwvdGV4dD4KPC9zdmc+'">
        </div>
        <div class="article-content">
            <h3 class="article-title">${article.title}</h3>
            <p class="article-date">${formattedDate}</p>
            <button class="read-more" data-article-id="${article.id}">Lire l'article</button>
        </div>
    `;
    
    // Ajouter l'événement click au bouton
    const button = card.querySelector('.read-more');
    if (button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const articleId = parseInt(this.getAttribute('data-article-id'));
            openArticleModal(articleId);
        });
    }
    
    return card;
}

// ==========================================================================
// MODAL SYSTEM
// ==========================================================================

function initializeModal() {
    const modal = document.getElementById('articleModal');
    if (!modal) {
        console.error('Modal non trouvée');
        return;
    }
    
    console.log('Initialisation de la modal');
    
    // Fermeture en cliquant sur le fond
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeArticleModal();
        }
    });
    
    // Fermeture avec Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeArticleModal();
        }
    });
    
    // Bouton de fermeture
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeArticleModal);
    }
}

function openArticleModal(articleId) {
    console.log('Ouverture modal pour article:', articleId);
    
    const modal = document.getElementById('articleModal');
    const article = articles.find(function(a) { return a.id === articleId; });
    
    if (!article || !modal) {
        console.error('Article ou modal non trouvé:', articleId);
        return;
    }
    
    // Mise à jour du contenu
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDate = document.getElementById('modalDate');
    const modalText = document.getElementById('modalText');
    
    if (modalTitle) modalTitle.textContent = article.title;
    
    if (modalImage) {
        modalImage.src = article.image;
        modalImage.alt = article.title;
        modalImage.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDYwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjBGMEYwIi8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4=';
        };
    }
    
    if (modalDate) {
        try {
            modalDate.textContent = new Date(article.date).toLocaleDateString('fr-FR', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric' 
            });
        } catch (e) {
            modalDate.textContent = article.date;
        }
    }
    
    if (modalText) {
        modalText.innerHTML = '<p>' + article.text + '</p>';
    }
    
    // Afficher la modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeArticleModal() {
    console.log('Fermeture de la modal');
    
    const modal = document.getElementById('articleModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ==========================================================================
// ANIMATIONS
// ==========================================================================

function initializeAnimations() {
    const cards = document.querySelectorAll('.article-card');
    console.log('Initialisation animations pour', cards.length, 'cartes');
    
    if (cards.length === 0) {
        console.log('Aucune carte trouvée pour l\'animation');
        return;
    }
    
    // Nettoyer l'observer précédent
    if (animationObserver) {
        animationObserver.disconnect();
    }
    
    // Créer un nouvel observer
    animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                console.log('Animation de la carte:', entry.target.querySelector('.article-title').textContent);
                animateCard(entry.target);
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });
    
    // Observer chaque carte
    cards.forEach(function(card, index) {
        // Réinitialiser les styles
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
        
        // Observer la carte
        animationObserver.observe(card);
    });
}

function animateCard(card) {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
}

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

function addArticle(newArticle) {
    console.log('Ajout d\'un nouvel article:', newArticle.title);
    
    // Assigner un ID unique
    newArticle.id = Math.max(...articles.map(a => a.id)) + 1;
    
    // Ajouter à la liste
    articles.push(newArticle);
    
    // Re-rendre
    renderArticles();
    
    // Réinitialiser les animations
    setTimeout(function() {
        initializeAnimations();
    }, 100);
}

function updateArticle(articleId, updatedData) {
    console.log('Mise à jour de l\'article:', articleId);
    
    const index = articles.findIndex(function(article) { 
        return article.id === articleId; 
    });
    
    if (index !== -1) {
        // Mettre à jour les données
        articles[index] = Object.assign({}, articles[index], updatedData);
        
        // Re-rendre
        renderArticles();
        
        // Réinitialiser les animations
        setTimeout(function() {
            initializeAnimations();
        }, 100);
        
        return true;
    } else {
        console.error('Article non trouvé:', articleId);
        return false;
    }
}

function deleteArticle(articleId) {
    console.log('Suppression de l\'article:', articleId);
    
    const index = articles.findIndex(function(article) { 
        return article.id === articleId; 
    });
    
    if (index !== -1) {
        articles.splice(index, 1);
        renderArticles();
        setTimeout(function() {
            initializeAnimations();
        }, 100);
        return true;
    } else {
        console.error('Article non trouvé:', articleId);
        return false;
    }
}

// ==========================================================================
// EXPOSITION DES FONCTIONS GLOBALES
// ==========================================================================

// Exposer les fonctions nécessaires globalement
if (typeof window !== 'undefined') {
    window.openArticleModal = openArticleModal;
    window.closeArticleModal = closeArticleModal;
    window.addArticle = addArticle;
    window.updateArticle = updateArticle;
    window.deleteArticle = deleteArticle;
    
    // Fonction de débogage
    window.debugArticles = function() {
        console.log('État des articles:');
        console.log('- Nombre d\'articles:', articles.length);
        console.log('- Initialisé:', isInitialized);
        console.log('- Conteneur DOM:', document.getElementById('articlesList'));
        console.log('- Cartes dans le DOM:', document.querySelectorAll('.article-card').length);
    };
}

console.log('Articles.js chargé - Version corrigée');