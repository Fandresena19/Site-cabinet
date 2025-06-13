// Navigation Toggle JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const navMenu = document.querySelector('.nav-menu');
    const toggleBtn = document.querySelector('.nav-toggle');
  
    // Fonction pour basculer le menu
    function toggleMenu() {
      const isActive = navMenu.classList.contains('active');
      const icon = toggleBtn.querySelector('i');
      
      if (isActive) {
        // Fermer le menu
        navMenu.classList.remove('active');
        toggleBtn.classList.remove('active');
        icon.className = 'bx bx-menu';
      } else {
        // Ouvrir le menu
        navMenu.classList.add('active');
        toggleBtn.classList.add('active');
        icon.className = 'bx bx-x';
      }
    }
  
    // Événement click sur le bouton toggle
    toggleBtn.addEventListener('click', toggleMenu);
  
    // Fermer le menu lors du clic sur un lien (navigation)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggleBtn.classList.remove('active');
        toggleBtn.querySelector('i').className = 'bx bx-menu';
      });
    });
  
    // Fermer le menu lors du redimensionnement de l'écran
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        toggleBtn.classList.remove('active');
        toggleBtn.querySelector('i').className = 'bx bx-menu';
      }
    });
  
    // Fermer le menu lors du clic en dehors
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        toggleBtn.classList.remove('active');
        toggleBtn.querySelector('i').className = 'bx bx-menu';
      }
    });
  });