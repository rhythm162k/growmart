document.addEventListener('DOMContentLoaded', function() {
  const districtSelect = document.getElementById('district');
  const areaSelect = document.getElementById('area');
  const submitBtn = document.querySelector('.submit-btn');

  // Handle district selection
  districtSelect.addEventListener('change', function() {
    const selectedValue = this.value;
    const selectedText = this.options[this.selectedIndex].text;
    
    if (selectedValue) {
      console.log('Selected District:', selectedText);
      // You can add additional logic here, like updating area options based on district
    }
  });

  // Handle area selection
  areaSelect.addEventListener('change', function() {
    const selectedValue = this.value;
    const selectedText = this.options[this.selectedIndex].text;
    
    if (selectedValue) {
      console.log('Selected Area:', selectedText);
    }
  });

  // Handle form submission
  submitBtn.addEventListener('click', function() {
    const district = districtSelect.value;
    const area = areaSelect.value;
    
    // Basic validation
    if (!district) {
      alert('Please select a district');
      districtSelect.focus();
      return;
    }
    
    if (!area) {
      alert('Please select an area type');
      areaSelect.focus();
      return;
    }
    
    // Success message
    const districtText = districtSelect.options[districtSelect.selectedIndex].text;
    const areaText = areaSelect.options[areaSelect.selectedIndex].text;
    
    console.log('Location selected:', {
      district: districtText,
      area: areaText
    });
    
    // You can add navigation or API call here
    alert(`Location set to: ${districtText} - ${areaText}`);
    
    // Optional: Navigate to next page or update UI
    // window.location.href = 'next-page.html';
  });

  // Add visual feedback for dropdown interactions
  const dropdowns = document.querySelectorAll('.dropdown-select');
  
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.02)';
    });
    
    dropdown.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
    });
  });

  // Optional: Add keyboard navigation
  submitBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });
}); 