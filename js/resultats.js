/* ==========================================================================
   RÉSULTATS PAGE JAVASCRIPT - VERSION LISTE AVEC TAGS AUTOMATIQUES
   ========================================================================== */

// Données complètes des résultats
const resultsData = [
    {
        id: "result1",
        title: "Championnat de France Campagne par équipe 2024",
        date: { day: "15", month: "NOV", year: "2024" },
        location: "Rennes, parc des Gayeulles",
        tags: ["championnat", "national", "Tir Campagne"],
        description: "Excellente participation de nos archers au championnat national. Belles performances avec plusieurs podiums à la clé ! Cette compétition prestigieuse a rassemblé les meilleurs archers de France dans une ambiance exceptionnelle.",
        resultsLink: "#"
    },
    {
        id: "result2",
        title: "TAE i Groupe régional Jeunes",
        date: { day: "12", month: "AVR", year: "2025" },
        location: "Nantes, Complexe Sportif",
        tags: ["regional", "jeunes","Tir TAE"],
        description: "Nos jeunes archers se sont illustrés lors de ce championnat régional avec deux qualifications pour la phase nationale. Un beau spectacle sportif avec des performances remarquables de nos espoirs.",
        resultsLink: "#"
    },
    {
        id: "result3",
        title: "Concours Débutants",
        date: { day: "16", month: "MAR", year: "2025" },
        location: "Rennes, Salle de tir",
        tags: ["club", "débutants","Tir 18m"],
        description: "Traditionnel concours dédié aux débutants dans une ambiance conviviale. Parfait pour mesurer ses progrès avant les vacances et partager un moment d'échange entre membres du club.",
        resultsLink: "#"
    },
    {
        id: "result4",
        title: "Tir Campagne CD35",
        date: { day: "04", month: "MAI", year: "2025" },
        location: "Rennes, centre Dominique Savio",
        tags: ["championnat", "départemental","club","Tir Campagne"],
        description: "Championnat départemental qui cette année se sera déroulé chez nous, nos archers se sont illustrés lors de ce championnat.",
        resultsLink: "#"
    },
    {
        id: "result5",
        title: "Tir TAE i",
        date: { day: "06", month: "AVR", year: "2025" },
        location: "Angers, Terrain de Tir",
        tags: ["Tir TAE"],
        description: "Excellente performance avec 5 qualifications pour la phase nationale. Un record pour notre club ! Les conditions météorologiques parfaites ont permis d'obtenir des scores exceptionnels.",
        resultsLink: "#"
    },
    {
        id: "result6",
        title: "Trophée départemental Tir 18m",
        date: { day: "23", month: "MAR", year: "2025" },
        location: "Liffré, salle omnisports",
        tags: ["départemental","championnat","Tir 18m"],
        description: "Nos jeunes archers mais pas seulement ont su montrer leurs talents lors de ce trophée.",
        resultsLink: "#"
    }
];

// Variables globales
let currentFilter = 'all';
let availableTags = [];

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    generateAvailableTags();
    generateResultsHTML();
    generateFilterButtons();
    initializeFilters();
    initializeModal();
    setTimeout(animateCards, 100);
});

// ==========================================================================
// GÉNÉRATION AUTOMATIQUE DES TAGS
// ==========================================================================

function generateAvailableTags() {
    const allTags = new Set();
    
    // Extraire tous les tags uniques des données
    resultsData.forEach(result => {
        result.tags.forEach(tag => {
            allTags.add(tag);
        });
    });
    
    // Convertir en tableau et trier alphabétiquement
    availableTags = Array.from(allTags).sort();
}

function generateFilterButtons() {
    const filtersContainer = document.querySelector('.filters');
    if (!filtersContainer) return;
    
    // Vider le conteneur
    filtersContainer.innerHTML = '';
    
    // Bouton "Tous"
    const allButton = document.createElement('button');
    allButton.className = 'filter-btn active';
    allButton.setAttribute('data-filter', 'all');
    allButton.textContent = 'Tous';
    filtersContainer.appendChild(allButton);
    
    // Générer un bouton pour chaque tag disponible
    availableTags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.setAttribute('data-filter', tag);
        button.textContent = getTagLabel(tag);
        filtersContainer.appendChild(button);
    });
}

// ==========================================================================
// GÉNÉRATION DU HTML - VERSION LISTE
// ==========================================================================

function generateResultsHTML() {
    const resultsGrid = document.getElementById('resultsGrid');
    if (!resultsGrid) return;
    
    resultsGrid.innerHTML = '';

    resultsData.forEach(result => {
        const resultCard = createResultCard(result);
        resultsGrid.appendChild(resultCard);
    });
}

function createResultCard(result) {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.setAttribute('data-tags', result.tags.join(','));

    // Extraire un aperçu du texte (environ 80 caractères)
    const previewText = result.description.length > 80 
        ? result.description.substring(0, 80) + '...' 
        : result.description;

    card.innerHTML = `
        <div class="result-date">
            <span class="day">${result.date.day}</span>
            <span class="month">${result.date.month}</span>
            <span class="year">${result.date.year}</span>
        </div>
        <div class="result-content">
            <h3 class="result-title">${result.title}</h3>
            <p class="result-location">
                <i class="location-icon">📍</i>
                ${result.location}
            </p>
            <p class="result-preview">${previewText}</p>
        </div>
        <div class="result-footer">
            <div class="result-tags">
                ${generateTagsHTML(result.tags)}
            </div>
            <button class="result-btn" onclick="openResultModal('${result.id}')">
                Voir les détails
            </button>
        </div>
    `;

    return card;
}

function generateTagsHTML(tags) {
    return tags.map(tag => {
        const tagLabel = getTagLabel(tag);
        const tagClass = getTagClass(tag);
        return `<span class="tag ${tagClass}">${tagLabel}</span>`;
    }).join('');
}

function getTagLabel(tag) {
    // Dictionnaire pour les libellés spécifiques
    const tagLabels = {
        'championnat': 'Championnat',
        'national': 'National',
        'regional': 'Régional',
        'international': 'International',   
        'départemental': 'Départemental',
        'club': 'Club',
        'jeunes': 'Jeunes',
        'adultes': 'Adultes',
        'débutants': 'Débutants',
        'Tir Campagne': 'Tir Campagne',
        'Tir TAE': 'Tir TAE',
        'Tir 18m': 'Tir 18m'
    };
    
    // Retourner le libellé personnalisé ou le tag original avec première lettre en majuscule
    return tagLabels[tag] || tag.charAt(0).toUpperCase() + tag.slice(1);
}

function getTagClass(tag) {
    // Normaliser le tag pour la classe CSS (minuscules, espaces remplacés par tirets)
    const normalizedTag = tag.toLowerCase().replace(/\s+/g, '-');
    
    // Classes CSS spécifiques pour certains tags
    const specificClasses = {
        'championnat': 'tag-championnat',
        'national': 'tag-national',
        'regional': 'tag-regional',
        'international': 'tag-international',
        'département': 'tag-departmental',
        'départemental': 'tag-departmental',
        'club': 'tag-club',
        'jeunes': 'tag-jeunes',
        'adultes': 'tag-adultes',
        'débutants': 'tag-debutants',
        'tir-campagne': 'tag-tir-campagne',
        'tir-tae': 'tag-tir-tae',
        'tir-18m': 'tag-tir-18m'
    };
    
    return specificClasses[normalizedTag] || `tag-${normalizedTag}`;
}

// ==========================================================================
// SYSTÈME DE FILTRAGE
// ==========================================================================

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setActiveFilter(this);
            filterResults(filter);
        });
    });
}

function setActiveFilter(activeButton) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    activeButton.classList.add('active');
}

function filterResults(filter) {
    currentFilter = filter;
    const resultCards = document.querySelectorAll('.result-card');
    const noResultsMessage = document.getElementById('noResults');
    let visibleCards = 0;

    resultCards.forEach(card => {
        const cardTags = card.getAttribute('data-tags');
        let shouldShow = false;

        if (filter === 'all') {
            shouldShow = true;
        } else {
            shouldShow = cardTags.includes(filter);
        }

        if (shouldShow) {
            showCard(card);
            visibleCards++;
        } else {
            hideCard(card);
        }
    });

    // Afficher/masquer le message "Aucun résultat"
    if (noResultsMessage) {
        if (visibleCards === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }
}

function showCard(card) {
    card.classList.remove('fade-out');
    card.classList.add('fade-in');
    setTimeout(() => {
        card.style.display = 'flex';
    }, 50);
}

function hideCard(card) {
    card.classList.remove('fade-in');
    card.classList.add('fade-out');
    setTimeout(() => {
        card.style.display = 'none';
    }, 300);
}

// ==========================================================================
// SYSTÈME DE MODALE
// ==========================================================================

function initializeModal() {
    const modal = document.getElementById('resultModal');
    if (!modal) return;
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeResultModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeResultModal();
        }
    });
}

function openResultModal(resultId) {
    const modal = document.getElementById('resultModal');
    const data = resultsData.find(result => result.id === resultId);
    
    if (!data || !modal) {
        console.error('Données du résultat non trouvées ou modale non disponible:', resultId);
        return;
    }
    
    // Remplir le contenu de la modale
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalLocation = document.getElementById('modalLocation');
    const modalTags = document.getElementById('modalTags');
    const modalDescription = document.getElementById('modalDescription');
    const modalResultsLink = document.getElementById('modalResultsLink');
    
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDate) modalDate.textContent = `${data.date.day} ${data.date.month} ${data.date.year}`;
    if (modalLocation) modalLocation.innerHTML = `📍 ${data.location}`;
    if (modalTags) modalTags.innerHTML = generateTagsHTML(data.tags);
    if (modalDescription) modalDescription.innerHTML = `<p>${data.description}</p>`;
    if (modalResultsLink) modalResultsLink.href = data.resultsLink;
    
    // Masquer la section stats si elle existe
    const statsContainer = document.getElementById('modalStats');
    if (statsContainer) {
        statsContainer.style.display = 'none';
    }
    
    // Afficher la modale
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeResultModal() {
    const modal = document.getElementById('resultModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ==========================================================================
// ANIMATIONS
// ==========================================================================

function animateCards() {
    const cards = document.querySelectorAll('.result-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ==========================================================================
// FONCTIONS UTILITAIRES PUBLIQUES
// ==========================================================================

// Fonction pour ajouter dynamiquement un nouveau résultat
function addResult(newResult) {
    resultsData.push(newResult);
    generateAvailableTags();
    generateFilterButtons();
    generateResultsHTML();
    initializeFilters();
    setTimeout(animateCards, 100);
}

// Fonction pour mettre à jour un résultat existant
function updateResult(resultId, updatedData) {
    const index = resultsData.findIndex(result => result.id === resultId);
    if (index !== -1) {
        resultsData[index] = { ...resultsData[index], ...updatedData };
        generateAvailableTags();
        generateFilterButtons();
        generateResultsHTML();
        initializeFilters();
        setTimeout(animateCards, 100);
    }
}

// ==========================================================================
// EXPOSITION DES FONCTIONS GLOBALES
// ==========================================================================

window.openResultModal = openResultModal;
window.closeResultModal = closeResultModal;
window.addResult = addResult;
window.updateResult = updateResult;