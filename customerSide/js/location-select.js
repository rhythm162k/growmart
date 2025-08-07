document.addEventListener('DOMContentLoaded', function () {
    const districtSelect = document.getElementById('district');
    const areaSelect = document.getElementById('area');
    const submitBtn = document.querySelector('.submit-btn');
  
    const upazilasByDistrict = {
      dhaka: ['Dhanmondi', 'Gulshan', 'Mirpur', 'Uttara'],
      mymensingh: ['Trishal', 'Muktagacha', 'Fulbaria'],
      chittagong: ['Pahartali', 'Halishahar', 'Agrabad'],
      sylhet: ['Beanibazar', 'Golapganj', 'Zakiganj'],
      rajshahi: ['Boalia', 'Paba', 'Godagari'],
      khulna: ['Daulatpur', 'Sonadanga', 'Khalishpur'],
      barisal: ['Kotwali', 'Bakerganj', 'Muladi'],
      rangpur: ['Gangachara', 'Pirganj', 'Badarganj']
    };
  
    function populateAreaOptions(districtKey) {
      areaSelect.innerHTML = '<option value="">Select Area</option>';
      const areas = upazilasByDistrict[districtKey.toLowerCase()];
      if (areas) {
        areas.forEach(area => {
          const option = document.createElement('option');
          option.value = area.toLowerCase();
          option.textContent = area;
          areaSelect.appendChild(option);
        });
      }
    }
  
    // Auto-detect location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
  
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
            const data = await response.json();
  
            const detectedDistrict = data.address?.state?.toLowerCase() || '';
            console.log("Detected district:", detectedDistrict);
  
            // Match and auto-select district dropdown
            for (let option of districtSelect.options) {
              if (detectedDistrict.includes(option.value)) {
                option.selected = true;
                populateAreaOptions(option.value);
                break;
              }
            }
          } catch (err) {
            console.error("Reverse geocoding error:", err);
          }
        },
        function (error) {
          console.error("Geolocation error:", error.message);
        }
      );
    }
  
    // Update area list when district is manually changed
    districtSelect.addEventListener('change', function () {
      const selectedDistrict = this.value;
      populateAreaOptions(selectedDistrict);
    });
  
    // Form submission
    submitBtn.addEventListener('click', function () {
      const district = districtSelect.value;
      const area = areaSelect.value;
  
      if (!district) {
        alert('Please select a district');
        return;
      }
      if (!area) {
        alert('Please select an area');
        return;
      }
  
      const districtText = districtSelect.options[districtSelect.selectedIndex].text;
      const areaText = areaSelect.options[areaSelect.selectedIndex].text;
  
      // Save location to localStorage
      const locationData = {
        district: districtText,
        area: areaText
      };
      localStorage.setItem('userLocation', JSON.stringify(locationData));
  
      alert(`Location set to: ${districtText} - ${areaText}`);
  
      // Optional: Redirect to profile
      window.location.href = 'profile.html';
    });
  });
  
  document.querySelector('.back-btn').addEventListener('click', () => {
    window.history.back();
  });
  
  document.querySelector('.lang-btn').addEventListener('click', () => {
    const langBtn = document.querySelector('.lang-text');
    if (langBtn.textContent === 'EN') {
        langBtn.textContent = 'BN';
    } else {
        langBtn.textContent = 'EN';
    }
  });
  