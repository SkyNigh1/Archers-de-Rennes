/* ==========================================================================
   COMPÉTITIONS PAGE JAVASCRIPT - VERSION LISTE AVEC TAGS AUTOMATIQUES
   ========================================================================== */

// Données complètes des compétitions
const competitionsData = [
    {
        id: "comp1",
        title: "Concours TAE International 2025",
        date: { day: "10", month: "MAI", year: "2025" },
        location: "Rennes, Jardin d'Arc",
        tags: ["international", "Tir TAE"],
        description: "Rejoignez notre concours TAE international au Jardin d'Arc. Une compétition ouverte à tous les niveaux avec des archers venant de toute l'Europe. Inscrivez-vous pour une expérience unique !",
        registerLink: "#"
    },
    {
        id: "comp2",
        title: "Championnat Départemental Salle 18m",
        date: { day: "07", month: "FÉV", year: "2026" },
        location: "Rennes, Salle de Tir",
        tags: ["départemental", "Tir 18m"],
        description: "Compétition départementale en salle à 18m. Parfaite pour les archers souhaitant se mesurer dans un cadre compétitif et convivial. Places limitées, inscrivez-vous vite !",
        registerLink: "#"
    },
    {
        id: "comp3",
        title: "Concours Campagne CD35",
        date: { day: "14", month: "JUN", year: "2025" },
        location: "Rennes, Centre Dominique Savio",
        tags: ["départemental", "Tir Campagne"],
        description: "Participez à notre concours de tir campagne organisé au Centre Dominique Savio. Un parcours varié et stimulant pour tous les passionnés de tir en extérieur.",
        registerLink: "#"
    },
    {
        id: "comp4",
        title: "Concours Nature Régional",
        date: { day: "21", month: "JUN", year: "2025" },
        location: "Rennes, Centre Dominique Savio",
        tags: ["regional", "Tir Nature"],
        description: "Compétition régionale de tir nature au Centre Dominique Savio. Une occasion idéale pour les archers de tous niveaux de découvrir le tir en pleine nature.",
        registerLink: "#"
    },
    {
        id: "comp5",
        title: "TAE Jeunes",
        date: { day: "28", month: "MAI", year: "2025" },
        location: "Rennes, Jardin d'Arc",
        tags: ["jeunes", "Tir TAE"],
        description: "Compétition dédiée aux jeunes archers au Jardin d'Arc. Une belle opportunité pour nos espoirs de briller et de se qualifier pour les phases nationales.",
        registerLink: "#"
    },
    {
        id: "comp6",
        title: "Concours Salle Débutants",
        date: { day: "15", month: "JAN", year: "2026" },
        location: "Rennes, Salle de Tir",
        tags: ["débutants", "Tir 18m"],
        description: "Concours en salle dédié aux débutants. Une ambiance conviviale pour découvrir la compétition et progresser dans une atmosphère détendue.",
        registerLink: "#"
    }
];

// Variables globales
let currentFilter = 'all';
let availableTags = [];

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    generateAvailableTags();
    generateCompetitionsHTML();
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
    competitionsData.forEach(comp => {
        comp.tags.forEach(tag => {
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

function generateCompetitionsHTML() {
    const competitionsGrid = document.getElementById('competitionsGrid');
    if (!competitionsGrid) return;
    
    competitionsGrid.innerHTML = '';

    competitionsData.forEach(comp => {
        const compCard = createCompetitionCard(comp);
        competitionsGrid.appendChild(compCard);
    });
}

function createCompetitionCard(comp) {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.setAttribute('data-tags', comp.tags.join(','));

    // Extraire un aperçu du texte (environ 80 caractères)
    const previewText = comp.description.length > 80 
        ? comp.description.substring(0, 80) + '...' 
        : comp.description;

    card.innerHTML = `
        <div class="result-date">
            <span class="day">${comp.date.day}</span>
            <span class="month">${comp.date.month}</span>
            <span class="year">${comp.date.year}</span>
        </div>
        <div class="result-content">
            <h3 class="result-title">${comp.title}</h3>
            <p class="result-location">
                <i class="location-icon">📍</i>
                ${comp.location}
            </p>
            <p class="result-preview">${previewText}</p>
        </div>
        <div class="result-footer">
            <div class="result-tags">
                ${generateTagsHTML(comp.tags)}
            </div>
            <button class="result-btn" onclick="openCompetitionModal('${comp.id}')">
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
        'Tir Nature': 'Tir Nature',
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
        'départemental': 'tag-departmental',
        'club': 'tag-club',
        'jeunes': 'tag-jeunes',
        'adultes': 'tag-adultes',
        'débutants': 'tag-debutants',
        'tir-campagne': 'tag-tir-campagne',
        'tir-nature': 'tag-tir-nature',
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
            filterCompetitions(filter);
        });
    });
}

function setActiveFilter(activeButton) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    activeButton.classList.add('active');
}

function filterCompetitions(filter) {
    currentFilter = filter;
    const competitionCards = document.querySelectorAll('.result-card');
    const noResultsMessage = document.getElementById('noResults');
    let visibleCards = 0;

    competitionCards.forEach(card => {
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

    // Afficher/masquer le message "Aucune compétition"
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
    const modal = document.getElementById('competitionModal');
    if (!modal) return;
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCompetitionModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCompetitionModal();
        }
    });
}

function openCompetitionModal(compId) {
    const modal = document.getElementById('competitionModal');
    const data = competitionsData.find(comp => comp.id === compId);
    
    if (!data || !modal) {
        console.error('Données de la compétition non trouvées ou modale non disponible:', compId);
        return;
    }
    
    // Remplir le contenu de la modale
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalLocation = document.getElementById('modalLocation');
    const modalTags = document.getElementById('modalTags');
    const modalDescription = document.getElementById('modalDescription');
    const modalRegisterLink = document.getElementById('modalRegisterLink');
    
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDate) modalDate.textContent = `${data.date.day} ${data.date.month} ${data.date.year}`;
    if (modalLocation) modalLocation.innerHTML = `📍 ${data.location}`;
    if (modalTags) modalTags.innerHTML = generateTagsHTML(data.tags);
    if (modalDescription) modalDescription.innerHTML = `<p>${data.description}</p>`;
    if (modalRegisterLink) modalRegisterLink.href = data.registerLink;
    
    // Afficher la modale
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCompetitionModal() {
    const modal = document.getElementById('competitionModal');
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

// Fonction pour ajouter dynamiquement une nouvelle compétition
function addCompetition(newCompetition) {
    competitionsData.push(newCompetition);
    generateAvailableTags();
    generateFilterButtons();
    generateCompetitionsHTML();
    initializeFilters();
    setTimeout(animateCards, 100);
}

// Fonction pour mettre à jour une compétition existante
function updateCompetition(compId, updatedData) {
    const index = competitionsData.findIndex(comp => comp.id === compId);
    if (index !== -1) {
        competitionsData[index] = { ...competitionsData[index], ...updatedData };
        generateAvailableTags();
        generateFilterButtons();
        generateCompetitionsHTML();
        initializeFilters();
        setTimeout(animateCards, 100);
    }
}

// ==========================================================================
// EXPOSITION DES FONCTIONS GLOBALES
// ==========================================================================

window.openCompetitionModal = openCompetitionModal;
window.closeCompetitionModal = closeCompetitionModal;
window.addCompetition = addCompetition;
window.updateCompetition = updateCompetition;