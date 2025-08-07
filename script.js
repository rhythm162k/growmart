window.addEventListener('DOMContentLoaded', () => {
    const splash = document.querySelector('.splash-screen');
  
    setTimeout(() => {
      splash.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      splash.style.opacity = '0';
      splash.style.transform = 'scale(1.05)';
  
      setTimeout(() => {
        window.location.href = "choose-role.html"; 
      }, 500);
    }, 400);
  });
  