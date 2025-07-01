// Function to handle inscription confirmation
function confirmInscription(stageName) {
    const now = new Date();
    const confirmation = confirm(`Voulez-vous vous inscrire au stage "${stageName}" ? (Simulation : cette action ne modifie pas de base de données, car c'est une template.)`);
    if (confirmation) {
        alert(`Inscription confirmée pour ${stageName} ! (Simulation uniquement.)`);
    }
}