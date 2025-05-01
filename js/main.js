document.addEventListener('DOMContentLoaded', function() {

  // --- Language Switcher Logic ---
  const langSwitcher = document.querySelector('.language-switcher');
  const langButtons = document.querySelectorAll('.lang-button');
  const langContents = document.querySelectorAll('.language-content');
  const lastUpdatedEN = document.getElementById('last-updated-en');
  const lastUpdatedKO = document.getElementById('last-updated-ko');
  const htmlElement = document.documentElement; // Get the <html> element

  // Function to switch language visibility and related elements
  const switchLang = (targetLang) => {
    // 1. Set lang attribute on <html> tag for accessibility/SEO
    if (htmlElement) {
        htmlElement.setAttribute('lang', targetLang);
    }

    // 2. Update button active states
    langButtons.forEach(button => {
      button.classList.toggle('is-active', button.getAttribute('data-lang') === targetLang);
    });

    // 3. Update content section visibility
    langContents.forEach(content => {
      content.classList.toggle('is-active', content.getAttribute('id') === `content-${targetLang}`);
    });

    // 4. Update "Last Updated" visibility
    if (lastUpdatedEN && lastUpdatedKO) {
      lastUpdatedEN.style.display = (targetLang === 'en') ? 'block' : 'none';
      lastUpdatedKO.style.display = (targetLang === 'ko') ? 'block' : 'none';
    }
  };

  // Check if necessary elements exist before adding listeners
  if (langSwitcher && langButtons.length > 0 && langContents.length > 0) {

    // Add click listeners to language buttons
    langButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Get the language from the clicked button's data attribute
        const selectedLang = this.getAttribute('data-lang');
        // Call the function to update the display
        switchLang(selectedLang);
      });
    });

    // Set the initial state based on the default active button/content
    const initialActiveButton = document.querySelector('.lang-button.is-active');
    if (initialActiveButton) {
        const initialLang = initialActiveButton.getAttribute('data-lang');
        // We don't need to call switchLang() here initially,
        // because the correct content section and button ALREADY have
        // the 'is-active' class from the HTML/CSS.
        // We only need to make sure the correct initial "last updated" is shown.
        const initialLastUpdated = document.getElementById(`last-updated-${initialLang}`);
        if (initialLastUpdated) {
            initialLastUpdated.style.display = 'block';
        }
         // Also set initial HTML lang attribute
        if (htmlElement) {
            htmlElement.setAttribute('lang', initialLang);
        }
    } else {
        // Fallback: If no button is active by default, activate English
        switchLang('en');
    }

  } else {
    // Log a warning if elements are missing, helps debugging
    console.warn('Language switcher elements (buttons or content sections) not found. Switching will not work.');
  }

  // --- End Language Switcher Logic ---


  // --- You can add other JavaScript functionality below if needed ---


}); // End of DOMContentLoaded listener