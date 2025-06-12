// Script principal pour le site AUDIT
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling pour les liens de navigation
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation au scroll pour les éléments
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.mission-item, .value-item, .reference-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animation du bouton de soumission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> ENVOI EN COURS...';
            submitBtn.disabled = true;
            
            // Simulation d'envoi (remplacer par vraie logique d'envoi)
            setTimeout(() => {
                // Récupération des données du formulaire
                const formData = new FormData(contactForm);
                const data = {
                    prenom: formData.get('prenom'),
                    nom: formData.get('nom'),
                    email: formData.get('email'),
                    telephone: formData.get('telephone'),
                    entreprise: formData.get('entreprise'),
                    message: formData.get('message')
                };
                
                console.log('Données du formulaire:', data);
                
                // Affichage du message de succès
                submitBtn.innerHTML = '<i class="bx bx-check"></i> MESSAGE ENVOYÉ !';
                submitBtn.style.background = '#28a745';
                
                // Reset du formulaire après 3 secondes
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
                
            }, 2000);
        });
        
        // Validation en temps réel
        const requiredFields = contactForm.querySelectorAll('input[required], textarea[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '#28a745';
                }
            });
            
            field.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.style.borderColor = '#28a745';
                }
            });
        });
        
        // Validation email
        const emailField = contactForm.querySelector('#email');
        if (emailField) {
            emailField.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '#28a745';
                }
            });
        }
    }
    
    // Effet parallax léger sur le hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Navigation sticky - changement de couleur au scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    });
    
    // Fonction pour ajouter des interactions sur les cartes
    const cards = document.querySelectorAll('.mission-item, .value-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Console log pour confirmer le chargement
    console.log('Site AUDIT - Script chargé avec succès');
});

// Fonction utilitaire pour ajouter des animations personnalisées
function addCustomAnimation(element, animationType = 'fadeIn') {
    if (!element) return;
    
    switch(animationType) {
        case 'fadeIn':
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.6s ease';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 100);
            break;
            
        case 'slideUp':
            element.style.transform = 'translateY(30px)';
            element.style.opacity = '0';
            element.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
            setTimeout(() => {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, 100);
            break;
    }
}

// Fonction pour gérer les formulaires
function handleFormSubmission(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulaire soumis');
            // Ici vous pouvez ajouter la logique de traitement du formulaire
            // Exemple : envoyer les données à un serveur
            const formData = new FormData(form);
            // fetch('/submit-form', { method: 'POST', body: formData })
        });
    }
}

// Fonction pour valider les champs du formulaire
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#28a745';
        }
    });
    
    return isValid;
}

// Export des fonctions pour utilisation externe si nécessaire
window.AuditSite = {
    addCustomAnimation,
    handleFormSubmission,
    validateForm
}; 
// traitement du formulaire
  

// Export des fonctions pour utilisation externe si nécessaire
window.AuditSite = {
    addCustomAnimation,
    handleFormSubmission
};