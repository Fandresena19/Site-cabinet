// Fichier: Contact.js
// Ce script gère l'envoi des messages du formulaire de contact via EmailJS.

// --- Configurations EmailJS et Email Admin ---
const ADMIN_EMAIL = 'fandresenaandrinirina@gmail.com';     // Adresse e-mail de l'administrateur (vous)

const EMAILJS_PUBLIC_KEY = 'xEpun770snmtB4__h';             // Clé publique EmailJS
const CLIENT_TEMPLATE_ID = 'template_sj6wiwr';             // ID du template d'auto-réponse pour le client (celui de votre capture d'écran)
const ADMIN_TEMPLATE_ID = 'template_rnmjeo1';    // IMPORTANT: Remplacez par l'ID de votre NOUVEAU template pour l'admin
const EMAILJS_SERVICE_ID = 'service_k5srs1q';               // ID de votre service EmailJS

// Initialisation de la bibliothèque EmailJS.
emailjs.init(EMAILJS_PUBLIC_KEY);

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Envoi en cours...';

        try {
            const formData = new FormData(form);
            const data = {
                prenom: formData.get('prenom'),
                nom: formData.get('nom'),
                email: formData.get('email'),
                telephone: formData.get('telephone') || 'Non renseigné',
                entreprise: formData.get('entreprise') || 'Non renseignée',
                message: formData.get('message'),
                date: new Date().toLocaleString('fr-FR') 
            };

            // --- Préparation des données pour EmailJS ---
            // Ces paramètres seront envoyés aux DEUX templates.
            // Assurez-vous que les noms de clés correspondent aux variables dans vos templates !
            const templateParams = {
                // Variables utilisées dans les deux templates (si applicable)
                from_name: `${data.prenom} ${data.nom}`, // Pour {{from_name}} dans les templates
                from_email: data.email,                  // Pour {{from_email}} dans les templates
                message: data.message,                   // Pour {{message}} dans les templates
                date: data.date,                         // Pour {{date}} dans les templates

                // Variables spécifiques au template d'auto-réponse (pour le client)
                name: data.prenom,                       // Pour {{name}} dans le template client
                title: data.message,                     // Pour {{title}} dans le template client

                // Variables supplémentaires pour le template admin (si besoin)
                phone: data.telephone,                   // Pour {{phone}} dans le template admin
                company: data.entreprise,                // Pour {{company}} dans le template admin
                to_admin_email: ADMIN_EMAIL              // Variable pour le template admin si son "To Email" est {{to_admin_email}}
            };

            // --- Envoi de l'e-mail d'auto-réponse au client ---
            await emailjs.send(EMAILJS_SERVICE_ID, CLIENT_TEMPLATE_ID, templateParams);

            // --- Envoi de l'e-mail de notification à l'administrateur (VOUS) ---
            // Le template ADMIN_TEMPLATE_ID doit être configuré avec votre Gmail comme destinataire.
            await emailjs.send(EMAILJS_SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams);


            // Succès si les deux envois sont passés
            showMessage('Votre message a été envoyé avec succès !', 'success');
            form.reset();

        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            showMessage('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
});

// --- Fonctions de Validation et d'Affichage des Messages (inchangées) ---

function validateForm() {
    const requiredFields = [
        { id: 'prenom', name: 'Prénom' },
        { id: 'nom', name: 'Nom' },
        { id: 'email', name: 'Email' },
        { id: 'message', name: 'Message' }
    ];

    let isValid = true;

    requiredFields.forEach(field => {
        const input = document.getElementById(field.id);
        const value = input.value.trim();
        
        if (!value) {
            showFieldError(input, `Le champ ${field.name} est requis`);
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });

    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value && !emailRegex.test(emailInput.value)) {
        showFieldError(emailInput, 'Veuillez saisir un email valide');
        isValid = false;
    }

    const rgpdCheckbox = document.getElementById('rgpd');
    if (!rgpdCheckbox.checked) {
        showMessage('Vous devez accepter l\'utilisation de vos données personnelles', 'error');
        isValid = false;
    }

    return isValid;
}

function showFieldError(input, message) {
    input.style.borderColor = '#dc3545';
    
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function clearFieldError(input) {
    input.style.borderColor = '#e1e1e1';
    const errorDiv = input.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showMessage(message, type) {
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.style.padding = '15px';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.marginBottom = '20px';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.fontWeight = '600';
    
    if (type === 'success') {
        messageDiv.style.background = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else {
        messageDiv.style.background = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    }
    
    messageDiv.textContent = message;

    const form = document.getElementById('contactForm');
    form.insertBefore(messageDiv, form.firstChild);

    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}
