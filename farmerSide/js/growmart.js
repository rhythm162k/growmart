document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.ad-slide');
  const dots = document.querySelectorAll('.ad-nav .dot');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');
  let current = 0;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
    current = idx;
  }

  leftArrow.addEventListener('click', function () {
    let next = (current - 1 + slides.length) % slides.length;
    showSlide(next);
  });
  rightArrow.addEventListener('click', function () {
    let next = (current + 1) % slides.length;
    showSlide(next);
  });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', function () {
      showSlide(i);
    });
  });

  // Optional: swipe support for mobile
  let startX = null;
  const track = document.querySelector('.carousel-track');
  if (track) {
    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    });
    track.addEventListener('touchend', function (e) {
      if (startX === null) return;
      let endX = e.changedTouches[0].clientX;
      if (endX - startX > 40) {
        // swipe right
        let next = (current - 1 + slides.length) % slides.length;
        showSlide(next);
      } else if (startX - endX > 40) {
        // swipe left
        let next = (current + 1) % slides.length;
        showSlide(next);
      }
      startX = null;
    });
  }

  showSlide(0);
}); 
const navButtons = document.querySelectorAll('.nav-btn');

// 1. Highlight correct button on load
const currentPage = window.location.pathname.split("/").pop().replace(".html", "");
navButtons.forEach(btn => {
  if (btn.dataset.page === currentPage) {
    btn.classList.add('active');
  } else {
    btn.classList.remove('active');
  }
});

// 2. Handle navigation clicks
navButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    const page = this.dataset.page;
    switch(page) {
      case 'home':
        window.location.href = 'growmart.html';
        break;
      case 'sell':
        window.location.href = 'category-sell.html';
        break;
      case 'price':
        window.location.href = 'market-prices.html';
        break;
      case 'tips':
        window.location.href = 'tips.html';
        break;
      case 'profile':
        window.location.href = 'profile.html';
        break;
    }
  });

  // Hover effect
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });

  // Touch support for mobile
  let touchStartY = 0;
  btn.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  });
  btn.addEventListener('touchend', e => {
    if (Math.abs(touchStartY - e.changedTouches[0].clientY) < 10) {
      btn.click();
    }
  });
});

  document.querySelector('.see-more').addEventListener('click', function() {
    window.location.href = 'market-prices.html'; 
  });
  document.querySelector('.learn-more').addEventListener('click', function() {
    window.location.href = 'tips.html'; 
  });
  
  const locationData = JSON.parse(localStorage.getItem('userLocation'));
  const district = locationData?.district || "Dhaka"; // Default fallback

  async function fetchWeather(city) {
    try {
      const apiKey = '2b218c74fdc64e11b9893907240305'; 
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      const data = await response.json();

      document.getElementById('weatherTemp').textContent = `${data.current.temp_c}°`;
      document.getElementById('weatherDay').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      document.getElementById('weatherLocation').textContent = `${data.location.country}, ${data.location.name}`;
      const weatherCondition = data.current.condition.text.toLowerCase();
      const weatherIcon = document.getElementById('weatherIcon');

      if (weatherCondition.includes('sun')) {
        weatherIcon.src = '../images/sunny.png';
      } else if (weatherCondition.includes('rain')) {
        weatherIcon.src = '../images/rainy.png';
      } else if (weatherCondition.includes('cloud')) {
        weatherIcon.src = '../images/cloudy.png';
      } else {
        weatherIcon.src = '../images/weather.png';
      }
      document.getElementById('weatherUpdated').textContent = `Last updated ${data.current.last_updated.split(' ')[1]}`;
      document.getElementById('weatherCondition').textContent = data.current.condition.text;
      document.getElementById('weatherWind').textContent = `${data.current.wind_kph} km/h`;
      document.getElementById('weatherHumidity').textContent = `${data.current.humidity}%`;
      document.getElementById('weatherRange').textContent = `H ${data.forecast?.forecastday?.[0]?.day?.maxtemp_c || '--'}° L ${data.forecast?.forecastday?.[0]?.day?.mintemp_c || '--'}°`;

    } catch (error) {
      console.error("Failed to fetch weather:", error);
      document.getElementById('weatherLocation').textContent = "Unavailable";
    }
  }

  fetchWeather(district);
