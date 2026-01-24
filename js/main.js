document.addEventListener('DOMContentLoaded', function() {

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

}); // End of DOMContentLoaded listener