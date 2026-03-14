document.addEventListener('DOMContentLoaded', function() {
  // --- Mobile Nav Toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
    });
  }


  // --- Email Copy Button Functionality ---
  const copyButtons = document.querySelectorAll('.copy-email-btn');

  if (copyButtons.length > 0) {
    copyButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Get the email from the data attribute
        const email = this.getAttribute('data-email');
        
        try {
          // Try using modern Clipboard API first
          if (navigator.clipboard) {
            navigator.clipboard.writeText(email)
              .then(() => {
                showCopyFeedback(this);
              })
              .catch(err => {
                // Fall back to execCommand if Clipboard API fails
                fallbackCopy(email, this);
              });
          } else {
            // Use fallback for browsers without Clipboard API
            fallbackCopy(email, this);
          }
        } catch (err) {
          console.warn('Copy operation failed:', err);
          fallbackCopy(email, this);
        }
      });
    });
  }

  // Helper function for execCommand fallback
  function fallbackCopy(text, buttonElement) {
    const tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    tempInput.value = text;
    document.body.appendChild(tempInput);
    
    // Select the text and copy
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices
    
    let successful = false;
    try {
      successful = document.execCommand('copy');
    } catch (err) {
      console.warn('execCommand error:', err);
    }
    
    document.body.removeChild(tempInput);
    
    if (successful) {
      showCopyFeedback(buttonElement);
    }
  }

  // Helper function to show and hide the feedback message
  function showCopyFeedback(buttonElement) {
    const feedback = buttonElement.nextElementSibling;
    if (feedback && feedback.classList.contains('copy-feedback')) {
      feedback.classList.add('visible');
      
      // Hide feedback after 2 seconds
      setTimeout(() => {
        feedback.classList.remove('visible');
      }, 2000);
    }
  }
  // --- End Email Copy Button Functionality ---

  // --- Inline Copy Email Icon Functionality ---
  const inlineCopyIcons = document.querySelectorAll('.inline-copy-email');

  inlineCopyIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const email = this.getAttribute('data-email');
      const feedback = this.querySelector('.inline-copy-feedback');

      function showInlineFeedback() {
        if (feedback) {
          feedback.classList.add('visible');
          setTimeout(() => {
            feedback.classList.remove('visible');
          }, 2000);
        }
      }

      try {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(email)
            .then(showInlineFeedback)
            .catch(() => inlineFallbackCopy(email));
        } else {
          inlineFallbackCopy(email);
        }
      } catch (err) {
        console.warn('Copy operation failed:', err);
      }

      function inlineFallbackCopy(text) {
        const tempInput = document.createElement('input');
        tempInput.style.position = 'absolute';
        tempInput.style.left = '-9999px';
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        tempInput.setSelectionRange(0, 99999);
        try {
          if (document.execCommand('copy')) {
            showInlineFeedback();
          }
        } catch (err) {
          console.warn('execCommand error:', err);
        }
        document.body.removeChild(tempInput);
      }
    });
  });
  // --- End Inline Copy Email Icon Functionality ---

}); // End of DOMContentLoaded listener