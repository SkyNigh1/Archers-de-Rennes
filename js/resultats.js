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
        tags: ["Tir Campagne"],
        description: "Excellente participation de nos archers au championnat national. Belles performances avec plusieurs podiums à la clé ! Cette compétition prestigieuse a rassemblé les meilleurs archers de France dans une ambiance exceptionnelle.",
        resultsLink: "#"
    },
    {
        id: "result2",
        title: "TAE i Groupe régional Jeunes",
        date: { day: "12", month: "AVR", year: "2025" },
        location: "Nantes, Complexe Sportif",
        tags: ["Tir TAE"],
        description: "Nos jeunes archers se sont illustrés lors de ce championnat régional avec deux qualifications pour la phase nationale. Un beau spectacle sportif avec des performances remarquables de nos espoirs.",
        resultsLink: "#"
    },
    {
        id: "result3",
        title: "Concours Débutants",
        date: { day: "16", month: "MAR", year: "2025" },
        location: "Rennes, Salle de tir",
        tags: ["Tir 18m"],
        description: "Traditionnel concours dédié aux débutants dans une ambiance conviviale. Parfait pour mesurer ses progrès avant les vacances et partager un moment d'échange entre membres du club.",
        resultsLink: "#"
    },
    {
        id: "result4",
        title: "Tir Campagne CD35",
        date: { day: "04", month: "MAI", year: "2025" },
        location: "Rennes, centre Dominique Savio",
        tags: ["Tir Campagne"],
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
        tags: ["Tir 18m"],
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
                <i class="location-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M 400.2818003913894 192.3757338551859 Q 398.27788649706457 131.25636007827788 358.1996086105675 90.17612524461839 L 358.1996086105675 90.17612524461839 L 358.1996086105675 90.17612524461839 Q 317.11937377690805 50.09784735812133 256 48.093933463796475 Q 194.88062622309198 50.09784735812133 153.8003913894325 90.17612524461839 Q 113.72211350293541 131.25636007827788 111.71819960861056 192.3757338551859 Q 111.71819960861056 211.412915851272 126.74755381604696 249.4872798434442 Q 143.78082191780823 287.56164383561645 169.83170254403132 329.64383561643837 Q 191.8747553816047 364.71232876712327 213.91780821917808 396.7749510763209 Q 236.9628180039139 428.83757338551857 256 452.8845401174168 Q 275.03718199608613 428.83757338551857 298.0821917808219 396.7749510763209 Q 321.12720156555775 364.71232876712327 342.1682974559687 329.64383561643837 Q 368.2191780821918 287.56164383561645 385.25244618395305 249.4872798434442 Q 400.2818003913894 211.412915851272 400.2818003913894 192.3757338551859 L 400.2818003913894 192.3757338551859 Z M 448.3757338551859 192.3757338551859 Q 446.37181996086105 237.4637964774951 416.31311154598825 296.57925636007826 L 416.31311154598825 296.57925636007826 L 416.31311154598825 296.57925636007826 Q 385.25244618395305 355.69471624266146 346.1761252446184 410.8023483365949 L 346.1761252446184 410.8023483365949 L 346.1761252446184 410.8023483365949 Q 307.0998043052838 466.9119373776908 280.04696673189824 499.9765166340509 Q 270.027397260274 512 256 512 Q 241.97260273972603 512 231.95303326810176 499.9765166340509 Q 204.90019569471625 466.9119373776908 165.8238747553816 410.8023483365949 Q 126.74755381604696 355.69471624266146 95.68688845401174 296.57925636007826 Q 65.62818003913894 237.4637964774951 63.62426614481409 192.3757338551859 Q 65.62818003913894 110.21526418786692 119.73385518590997 56.10958904109589 Q 173.83953033268102 2.003913894324853 256 0 Q 338.160469667319 2.003913894324853 392.26614481409 56.10958904109589 Q 446.37181996086105 110.21526418786692 448.3757338551859 192.3757338551859 L 448.3757338551859 192.3757338551859 Z M 288.06262230919765 192.3757338551859 Q 288.06262230919765 178.34833659491193 279.04500978473584 169.3307240704501 L 279.04500978473584 169.3307240704501 L 279.04500978473584 169.3307240704501 Q 270.027397260274 160.31311154598825 256 160.31311154598825 Q 241.97260273972603 160.31311154598825 232.9549902152642 169.3307240704501 Q 223.93737769080235 178.34833659491193 223.93737769080235 192.3757338551859 Q 223.93737769080235 206.40313111545987 232.9549902152642 215.4207436399217 Q 241.97260273972603 224.43835616438355 256 224.43835616438355 Q 270.027397260274 224.43835616438355 279.04500978473584 215.4207436399217 Q 288.06262230919765 206.40313111545987 288.06262230919765 192.3757338551859 L 288.06262230919765 192.3757338551859 Z M 175.84344422700588 192.3757338551859 Q 176.8454011741683 147.2876712328767 215.92172211350294 123.24070450097847 Q 256 101.19765166340508 296.07827788649706 123.24070450097847 Q 335.1545988258317 147.2876712328767 336.1565557729941 192.3757338551859 Q 335.1545988258317 237.4637964774951 296.07827788649706 261.51076320939336 Q 256 283.55381604696674 215.92172211350294 261.51076320939336 Q 176.8454011741683 237.4637964774951 175.84344422700588 192.3757338551859 L 175.84344422700588 192.3757338551859 Z" />
                    </svg>
                </i>
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
    if (modalLocation) modalLocation.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512">
        <path d="M 400.2818003913894 192.3757338551859 Q 398.27788649706457 131.25636007827788 358.1996086105675 90.17612524461839 L 358.1996086105675 90.17612524461839 L 358.1996086105675 90.17612524461839 Q 317.11937377690805 50.09784735812133 256 48.093933463796475 Q 194.88062622309198 50.09784735812133 153.8003913894325 90.17612524461839 Q 113.72211350293541 131.25636007827788 111.71819960861056 192.3757338551859 Q 111.71819960861056 211.412915851272 126.74755381604696 249.4872798434442 Q 143.78082191780823 287.56164383561645 169.83170254403132 329.64383561643837 Q 191.8747553816047 364.71232876712327 213.91780821917808 396.7749510763209 Q 236.9628180039139 428.83757338551857 256 452.8845401174168 Q 275.03718199608613 428.83757338551857 298.0821917808219 396.7749510763209 Q 321.12720156555775 364.71232876712327 342.1682974559687 329.64383561643837 Q 368.2191780821918 287.56164383561645 385.25244618395305 249.4872798434442 Q 400.2818003913894 211.412915851272 400.2818003913894 192.3757338551859 L 400.2818003913894 192.3757338551859 Z M 448.3757338551859 192.3757338551859 Q 446.37181996086105 237.4637964774951 416.31311154598825 296.57925636007826 L 416.31311154598825 296.57925636007826 L 416.31311154598825 296.57925636007826 Q 385.25244618395305 355.69471624266146 346.1761252446184 410.8023483365949 L 346.1761252446184 410.8023483365949 L 346.1761252446184 410.8023483365949 Q 307.0998043052838 466.9119373776908 280.04696673189824 499.9765166340509 Q 270.027397260274 512 256 512 Q 241.97260273972603 512 231.95303326810176 499.9765166340509 Q 204.90019569471625 466.9119373776908 165.8238747553816 410.8023483365949 Q 126.74755381604696 355.69471624266146 95.68688845401174 296.57925636007826 Q 65.62818003913894 237.4637964774951 63.62426614481409 192.3757338551859 Q 65.62818003913894 110.21526418786692 119.73385518590997 56.10958904109589 Q 173.83953033268102 2.003913894324853 256 0 Q 338.160469667319 2.003913894324853 392.26614481409 56.10958904109589 Q 446.37181996086105 110.21526418786692 448.3757338551859 192.3757338551859 L 448.3757338551859 192.3757338551859 Z M 288.06262230919765 192.3757338551859 Q 288.06262230919765 178.34833659491193 279.04500978473584 169.3307240704501 L 279.04500978473584 169.3307240704501 L 279.04500978473584 169.3307240704501 Q 270.027397260274 160.31311154598825 256 160.31311154598825 Q 241.97260273972603 160.31311154598825 232.9549902152642 169.3307240704501 Q 223.93737769080235 178.34833659491193 223.93737769080235 192.3757338551859 Q 223.93737769080235 206.40313111545987 232.9549902152642 215.4207436399217 Q 241.97260273972603 224.43835616438355 256 224.43835616438355 Q 270.027397260274 224.43835616438355 279.04500978473584 215.4207436399217 Q 288.06262230919765 206.40313111545987 288.06262230919765 192.3757338551859 L 288.06262230919765 192.3757338551859 Z M 175.84344422700588 192.3757338551859 Q 176.8454011741683 147.2876712328767 215.92172211350294 123.24070450097847 Q 256 101.19765166340508 296.07827788649706 123.24070450097847 Q 335.1545988258317 147.2876712328767 336.1565557729941 192.3757338551859 Q 335.1545988258317 237.4637964774951 296.07827788649706 261.51076320939336 Q 256 283.55381604696674 215.92172211350294 261.51076320939336 Q 176.8454011741683 237.4637964774951 175.84344422700588 192.3757338551859 L 175.84344422700588 192.3757338551859 Z" />
    </svg> ${data.location}`;
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