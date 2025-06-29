/* ==========================================================================
   AUTH MODALS JAVASCRIPT - VERSION CORRIGÉE
   ========================================================================== */

class AuthModals {
    constructor() {
        this.init();
    }

    init() {
        this.createModals();
        this.bindEvents();
    }

    createModals() {
        // Créer les modales dans le DOM
        const modalsHTML = `
            <!-- Modal de Connexion -->
            <div id="loginModal" class="modal-overlay">
                <div class="modal">
                    <div class="modal-header">
                        <button class="modal-close" data-close="loginModal">&times;</button>
                        <h2 class="modal-title">Connexion</h2>
                        <p class="modal-subtitle">Accédez à votre espace personnel</p>
                    </div>
                    <div class="modal-body">
                        <form id="loginForm" class="auth-form">
                            <div class="form-group">
                                <label class="form-label" for="loginEmail">Adresse e-mail</label>
                                <input type="email" id="loginEmail" class="form-input" placeholder="votre@email.com" required>
                                <div class="error-message" id="loginEmailError"></div>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="loginPassword">Mot de passe</label>
                                <input type="password" id="loginPassword" class="form-input" placeholder="••••••••" required>
                                <div class="error-message" id="loginPasswordError"></div>
                            </div>
                            <button type="submit" class="submit-btn">Se connecter</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <p>Pas encore de compte ? <a href="#register" data-switch="registerModal">Créer un compte</a></p>
                    </div>
                </div>
            </div>

            <!-- Modal de Création de Compte -->
            <div id="registerModal" class="modal-overlay">
                <div class="modal">
                    <div class="modal-header">
                        <button class="modal-close" data-close="registerModal">&times;</button>
                        <h2 class="modal-title">Créer un compte</h2>
                        <p class="modal-subtitle">Rejoignez les Archers de Rennes</p>
                    </div>
                    <div class="modal-body">
                        <form id="registerForm" class="auth-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label" for="registerFirstName">Prénom</label>
                                    <input type="text" id="registerFirstName" class="form-input" placeholder="Prénom" required>
                                    <div class="error-message" id="registerFirstNameError"></div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="registerLastName">Nom</label>
                                    <input type="text" id="registerLastName" class="form-input" placeholder="Nom" required>
                                    <div class="error-message" id="registerLastNameError"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="registerEmail">Adresse e-mail</label>
                                <input type="email" id="registerEmail" class="form-input" placeholder="votre@email.com" required>
                                <div class="error-message" id="registerEmailError"></div>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="registerEmailConfirm">Confirmer l'adresse e-mail</label>
                                <input type="email" id="registerEmailConfirm" class="form-input" placeholder="Confirmer votre@email.com" required>
                                <div class="error-message" id="registerEmailConfirmError"></div>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="registerPassword">Mot de passe</label>
                                <input type="password" id="registerPassword" class="form-input" placeholder="••••••••" required>
                                <div class="password-strength" id="passwordStrength">
                                    <div class="password-strength-bar" id="passwordStrengthBar"></div>
                                </div>
                                <div class="password-strength-text" id="passwordStrengthText"></div>
                                <div class="error-message" id="registerPasswordError"></div>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="registerPasswordConfirm">Confirmer le mot de passe</label>
                                <input type="password" id="registerPasswordConfirm" class="form-input" placeholder="Confirmer ••••••••" required>
                                <div class="error-message" id="registerPasswordConfirmError"></div>
                            </div>
                            <div class="checkbox-group" id="accountTypeGroup">
                                <label class="custom-checkbox">
                                    <input type="checkbox" id="familyAccount">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="checkbox-label" for="familyAccount">
                                    Ce compte est pour un membre de ma famille
                                </label>
                            </div>
                            <button type="submit" class="submit-btn">Créer le compte</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <p>Déjà un compte ? <a href="#login" data-switch="loginModal">Se connecter</a></p>
                    </div>
                </div>
            </div>
        `;

        // Ajouter les modales au body
        document.body.insertAdjacentHTML('beforeend', modalsHTML);
    }

    bindEvents() {
        // Événements pour ouvrir les modales - VERSION CORRIGÉE
        document.addEventListener('click', (e) => {
            // Vérifier si l'élément cliqué ou son parent a un attribut data-modal
            const modalTrigger = e.target.closest('[data-modal]');
            if (modalTrigger) {
                e.preventDefault();
                const modalId = modalTrigger.getAttribute('data-modal');
                this.openModal(modalId);
                return;
            }

            // Vérifier les liens directs
            if (e.target.getAttribute('href') === '#login') {
                e.preventDefault();
                this.openModal('loginModal');
                return;
            }
            
            if (e.target.getAttribute('href') === '#register') {
                e.preventDefault();
                this.openModal('registerModal');
                return;
            }

            // Vérifier le texte des éléments (fallback)
            const text = e.target.textContent?.trim();
            if (text === 'Connexion') {
                e.preventDefault();
                this.openModal('loginModal');
                return;
            }
            
            if (text === 'Créer un compte') {
                e.preventDefault();
                this.openModal('registerModal');
                return;
            }
        });
        
        // Événements pour fermer les modales
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-close]')) {
                this.closeModal(e.target.getAttribute('data-close'));
            }
            if (e.target.matches('.modal-overlay')) {
                this.closeModal(e.target.id);
            }
        });

        // Événements pour changer de modale
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-switch]')) {
                e.preventDefault();
                const currentModal = e.target.closest('.modal-overlay').id;
                const targetModal = e.target.getAttribute('data-switch');
                this.closeModal(currentModal);
                setTimeout(() => this.openModal(targetModal), 300);
            }
        });

        // Fermer avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Validation en temps réel
        this.setupValidation();

        // Soumission des formulaires
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Checkbox pour le type de compte
        document.getElementById('familyAccount').addEventListener('change', (e) => {
            const group = document.getElementById('accountTypeGroup');
            if (e.target.checked) {
                group.classList.add('checked');
            } else {
                group.classList.remove('checked');
            }
        });
    }

    openModal(modalId) {
        console.log('Tentative d\'ouverture de la modale:', modalId); // Debug
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus sur le premier input
            setTimeout(() => {
                const firstInput = modal.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 100);
            
            console.log('Modale ouverte:', modalId); // Debug
        } else {
            console.error('Modale non trouvée:', modalId); // Debug
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            this.clearErrors(modal);
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    setupValidation() {
        // Attendre que les éléments soient créés
        setTimeout(() => {
            // Validation de l'email en temps réel
            const emailInputs = ['loginEmail', 'registerEmail', 'registerEmailConfirm'];
            emailInputs.forEach(id => {
                const input = document.getElementById(id);
                if (input) {
                    input.addEventListener('blur', () => this.validateEmail(input));
                    input.addEventListener('input', () => this.clearError(input));
                }
            });

            // Validation du mot de passe avec indicateur de force
            const passwordInput = document.getElementById('registerPassword');
            if (passwordInput) {
                passwordInput.addEventListener('input', () => {
                    this.validatePasswordStrength(passwordInput);
                    this.clearError(passwordInput);
                });
            }

            // Validation de la confirmation du mot de passe
            const passwordConfirmInput = document.getElementById('registerPasswordConfirm');
            if (passwordConfirmInput) {
                passwordConfirmInput.addEventListener('blur', () => this.validatePasswordConfirm());
                passwordConfirmInput.addEventListener('input', () => this.clearError(passwordConfirmInput));
            }

            // Validation de la confirmation de l'email
            const emailConfirmInput = document.getElementById('registerEmailConfirm');
            if (emailConfirmInput) {
                emailConfirmInput.addEventListener('blur', () => this.validateEmailConfirm());
            }

            // Validation des champs requis
            const requiredInputs = document.querySelectorAll('.form-input[required]');
            requiredInputs.forEach(input => {
                input.addEventListener('blur', () => this.validateRequired(input));
                input.addEventListener('input', () => this.clearError(input));
            });
        }, 100);
    }

    validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorElement = document.getElementById(input.id + 'Error');
        
        if (!input.value.trim()) {
            this.showError(input, errorElement, 'L\'adresse e-mail est requise');
            return false;
        }
        
        if (!emailRegex.test(input.value)) {
            this.showError(input, errorElement, 'Veuillez entrer une adresse e-mail valide');
            return false;
        }
        
        this.clearError(input);
        return true;
    }

    validateEmailConfirm() {
        const email = document.getElementById('registerEmail').value;
        const emailConfirm = document.getElementById('registerEmailConfirm');
        const errorElement = document.getElementById('registerEmailConfirmError');
        
        if (!emailConfirm.value.trim()) {
            this.showError(emailConfirm, errorElement, 'Veuillez confirmer votre adresse e-mail');
            return false;
        }
        
        if (email !== emailConfirm.value) {
            this.showError(emailConfirm, errorElement, 'Les adresses e-mail ne correspondent pas');
            return false;
        }
        
        this.clearError(emailConfirm);
        return true;
    }

    validatePasswordStrength(input) {
        const password = input.value;
        const strengthBar = document.getElementById('passwordStrengthBar');
        const strengthText = document.getElementById('passwordStrengthText');
        const strengthContainer = document.getElementById('passwordStrength');
        
        if (!strengthBar || !strengthText || !strengthContainer) return;
        
        if (password.length === 0) {
            strengthContainer.classList.remove('show');
            strengthText.classList.remove('show');
            return;
        }
        
        strengthContainer.classList.add('show');
        strengthText.classList.add('show');
        
        let score = 0;
        let feedback = '';
        
        // Critères de validation
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;
        
        // Mise à jour de l'affichage
        strengthBar.className = 'password-strength-bar';
        strengthText.className = 'password-strength-text show';
        
        if (score < 3) {
            strengthBar.classList.add('weak');
            strengthText.classList.add('weak');
            feedback = 'Mot de passe faible';
        } else if (score < 5) {
            strengthBar.classList.add('medium');
            strengthText.classList.add('medium');
            feedback = 'Mot de passe moyen';
        } else {
            strengthBar.classList.add('strong');
            strengthText.classList.add('strong');
            feedback = 'Mot de passe fort';
        }
        
        strengthText.textContent = feedback;
    }

    validatePasswordConfirm() {
        const password = document.getElementById('registerPassword').value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm');
        const errorElement = document.getElementById('registerPasswordConfirmError');
        
        if (!passwordConfirm.value.trim()) {
            this.showError(passwordConfirm, errorElement, 'Veuillez confirmer votre mot de passe');
            return false;
        }
        
        if (password !== passwordConfirm.value) {
            this.showError(passwordConfirm, errorElement, 'Les mots de passe ne correspondent pas');
            return false;
        }
        
        this.clearError(passwordConfirm);
        return true;
    }

    validateRequired(input) {
        const errorElement = document.getElementById(input.id + 'Error');
        
        if (!input.value.trim()) {
            let fieldName = input.previousElementSibling?.textContent || 'Ce champ';
            this.showError(input, errorElement, `${fieldName} est requis`);
            return false;
        }
        
        this.clearError(input);
        return true;
    }

    showError(input, errorElement, message) {
        input.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    clearError(input) {
        input.classList.remove('error');
        const errorElement = document.getElementById(input.id + 'Error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    clearErrors(modal) {
        const inputs = modal.querySelectorAll('.form-input');
        inputs.forEach(input => this.clearError(input));
        
        // Réinitialiser l'indicateur de force du mot de passe
        const strengthContainer = document.getElementById('passwordStrength');
        const strengthText = document.getElementById('passwordStrengthText');
        if (strengthContainer) strengthContainer.classList.remove('show');
        if (strengthText) strengthText.classList.remove('show');
    }

    handleLogin() {
        const email = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');
        
        let isValid = true;
        
        if (!this.validateEmail(email)) isValid = false;
        if (!this.validateRequired(password)) isValid = false;
        
        if (isValid) {
            // Ici vous pouvez ajouter la logique de connexion
            console.log('Tentative de connexion:', {
                email: email.value,
                password: password.value
            });
            
            // Simuler une connexion réussie
            alert('Connexion réussie !');
            this.closeModal('loginModal');
        }
    }

    handleRegister() {
        const firstName = document.getElementById('registerFirstName');
        const lastName = document.getElementById('registerLastName');
        const email = document.getElementById('registerEmail');
        const emailConfirm = document.getElementById('registerEmailConfirm');
        const password = document.getElementById('registerPassword');
        const passwordConfirm = document.getElementById('registerPasswordConfirm');
        const familyAccount = document.getElementById('familyAccount');
        
        let isValid = true;
        
        if (!this.validateRequired(firstName)) isValid = false;
        if (!this.validateRequired(lastName)) isValid = false;
        if (!this.validateEmail(email)) isValid = false;
        if (!this.validateEmailConfirm()) isValid = false;
        if (!this.validateRequired(password)) isValid = false;
        if (!this.validatePasswordConfirm()) isValid = false;
        
        if (isValid) {
            // Ici vous pouvez ajouter la logique de création de compte
            console.log('Tentative de création de compte:', {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value,
                isFamilyAccount: familyAccount.checked
            });
            
            // Simuler une création de compte réussie
            alert('Compte créé avec succès !');
            this.closeModal('registerModal');
        }
    }
}

// Initialiser les modales quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initialisation des modales...'); // Debug
    new AuthModals();
});