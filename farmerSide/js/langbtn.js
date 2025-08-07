// On load
document.addEventListener('DOMContentLoaded', () => {
    const langText = document.querySelector('.lang-text');
    const savedLang = localStorage.getItem('language') || 'EN';
    langText.textContent = savedLang;
  
    document.querySelector('.lang-btn').addEventListener('click', () => {
      const newLang = langText.textContent === 'EN' ? 'BN' : 'EN';
      langText.textContent = newLang;
      localStorage.setItem('language', newLang);
    });
  });
  