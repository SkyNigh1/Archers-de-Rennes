document.addEventListener('DOMContentLoaded', function() {
    // Leaflet Map Initialization
    const map = L.map('map').setView([48.133224, -1.650623], 15); // Default to Salle de Tir
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        tileSize: 256,
    }).addTo(map);

    const locations = [
        { name: 'Salle de Tir', lat: 48.133224, lng: -1.650623 },
        { name: 'Jardin d\'arc Henri WARDALE', lat: 48.132288, lng: -1.648105 },
        { name: 'Terrain de Parcours', lat: 48.144535, lng: -1.635531 }
    ];

    let markers = {};

    locations.forEach(location => {
        markers[location.name] = L.marker([location.lat, location.lng]).addTo(map)
            .bindPopup(location.name);
    });

    const locationButtons = document.querySelectorAll('.btn-location');
    
    if (locationButtons) {
        locationButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const lat = parseFloat(this.getAttribute('data-lat'));
                const lng = parseFloat(this.getAttribute('data-lng'));
                map.setView([lat, lng], 15);
                Object.values(markers).forEach(marker => marker.closePopup());
                const locationName = this.parentElement.querySelector('h3').textContent;
                markers[locationName].openPopup();
            });
        });
    }
});