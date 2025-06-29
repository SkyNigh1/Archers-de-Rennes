document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('contactSubmit');
    const consentCheckbox = document.getElementById('contactConsent');

    // Activer/désactiver le bouton en fonction de la case à cocher
    consentCheckbox.addEventListener('change', function() {
        submitBtn.disabled = !this.checked;
    });

    // Validation en temps réel
    const inputs = {
        contactLastName: document.getElementById('contactLastName'),
        contactFirstName: document.getElementById('contactFirstName'),
        contactEmail: document.getElementById('contactEmail'),
        contactEmailConfirm: document.getElementById('contactEmailConfirm'),
        contactPhone: document.getElementById('contactPhone'),
        contactOrganization: document.getElementById('contactOrganization'),
        contactRecipient: document.getElementById('contactRecipient'),
        contactSubject: document.getElementById('contactSubject'),
        contactMessage: document.getElementById('contactMessage')
    };

    Object.values(inputs).forEach(input => {
        if (input) {
            input.addEventListener('input', () => clearError(input));
            input.addEventListener('blur', () => validateInput(input));
        }
    });

    function validateInput(input) {
        const errorElement = document.getElementById(input.id + 'Error');
        let isValid = true;

        switch (input.id) {
            case 'contactLastName':
            case 'contactFirstName':
            case 'contactSubject':
            case 'contactMessage':
                if (!input.value.trim()) {
                    showError(input, errorElement, 'Ce champ est requis');
                    isValid = false;
                }
                break;
            case 'contactEmail':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!input.value.trim()) {
                    showError(input, errorElement, 'L\'adresse e-mail est requise');
                    isValid = false;
                } else if (!emailRegex.test(input.value)) {
                    showError(input, errorElement, 'Veuillez entrer une adresse e-mail valide');
                    isValid = false;
                }
                break;
            case 'contactEmailConfirm':
                const email = inputs.contactEmail.value;
                if (!input.value.trim()) {
                    showError(input, errorElement, 'Veuillez confirmer votre adresse e-mail');
                    isValid = false;
                } else if (email !== input.value) {
                    showError(input, errorElement, 'Les adresses e-mail ne correspondent pas');
                    isValid = false;
                }
                break;
            case 'contactPhone':
                const phoneRegex = /^[0-9]{10}$/;
                if (input.value && !phoneRegex.test(input.value.replace(/\s/g, ''))) {
                    showError(input, errorElement, 'Veuillez entrer un numéro de téléphone valide (10 chiffres)');
                    isValid = false;
                }
                break;
            case 'contactRecipient':
                if (!input.value) {
                    showError(input, errorElement, 'Veuillez sélectionner un destinataire');
                    isValid = false;
                }
                break;
        }

        return isValid;
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    function clearError(input) {
        input.classList.remove('error');
        const errorElement = document.getElementById(input.id + 'Error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    // Soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        Object.values(inputs).forEach(input => {
            if (input && !validateInput(input)) isValid = false;
        });

        if (isValid && consentCheckbox.checked) {
            const emailBody = `
                Nom: ${inputs.contactLastName.value}
                Prénom: ${inputs.contactFirstName.value}
                E-mail: ${inputs.contactEmail.value}
                Téléphone: ${inputs.contactPhone.value || 'Non fourni'}
                Organisme: ${inputs.contactOrganization.value || 'Non fourni'}
                Destinataire: ${inputs.contactRecipient.value}
                Objet: ${inputs.contactSubject.value}
                Message: ${inputs.contactMessage.value}
            `;

            const mailtoLink = `mailto:contact@archersderennes.fr?subject=${encodeURIComponent(inputs.contactSubject.value)}&body=${encodeURIComponent(emailBody)}`;
            window.location.href = mailtoLink;

            alert('Un e-mail a été généré. Vérifiez votre client de messagerie pour l\'envoyer.');
            form.reset();
            submitBtn.disabled = true;
            consentCheckbox.checked = false;
        } else if (!consentCheckbox.checked) {
            alert('Veuillez accepter les conditions d\'utilisation pour envoyer le formulaire.');
        }
    });
});