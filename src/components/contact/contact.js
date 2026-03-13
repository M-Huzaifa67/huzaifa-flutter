// ── src/components/contact/contact.js ──
// Handles contact form validation and Firebase submission.

const ContactComponent = {
  init() {
    this.setupForm();
  },

  setupForm() {
    const form    = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    const errorEl = document.getElementById('form-error-msg');
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const loadingSpinner = document.getElementById('submit-loading');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!this.validate()) return;

      // Show loading
      submitBtn.disabled  = true;
      submitText.classList.add('hidden');
      loadingSpinner.classList.remove('hidden');
      if (success)  success.classList.add('hidden');
      if (errorEl)  errorEl.classList.add('hidden');

      const data = {
        name:    document.getElementById('form-name').value.trim(),
        email:   document.getElementById('form-email').value.trim(),
        subject: document.getElementById('form-subject').value.trim(),
        message: document.getElementById('form-message').value.trim(),
      };

      try {
        await FirebaseService.submitContact(data);
        form.reset();
        success.classList.remove('hidden');
        // Animate success
        if (typeof gsap !== 'undefined') {
          gsap.from(success, { opacity: 0, y: 10, duration: 0.4 });
        }
      } catch (err) {
        console.error('Contact form error:', err);
        errorEl.classList.remove('hidden');
      } finally {
        submitBtn.disabled = false;
        submitText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
      }
    });

    // Real-time validation feedback
    ['form-name','form-email','form-subject','form-message'].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => {
          input.classList.remove('error');
        });
      }
    });
  },

  validateField(input) {
    const val = input.value.trim();
    let valid = val.length > 0;
    if (input.type === 'email') valid = Helpers.isValidEmail(val);
    input.classList.toggle('error', !valid);
    return valid;
  },

  validate() {
    let allValid = true;
    ['form-name','form-email','form-subject','form-message'].forEach(id => {
      const input = document.getElementById(id);
      if (input && !this.validateField(input)) allValid = false;
    });
    return allValid;
  }
};
