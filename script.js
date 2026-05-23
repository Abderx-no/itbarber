form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = '';
  statusEl.className = 'form-status';

  // Basic validation
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  if (new Date(data.date).getDay() === 0) {
    statusEl.textContent = 'We are closed on Sundays. Please pick another day.';
    statusEl.classList.add('error');
    return;
  }

  // Disable button during submission
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Processing...';

  try {
    // ✅ Formspree endpoint (make sure this is YOUR verified URL)
    const API_URL = 'https://formspree.io/f/xykvjazd'; 

    // ✅ Send as form-encoded (NOT JSON) for Formspree compatibility
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Accept': 'application/json'  // ✅ Tell Formspree we want JSON response
      },
      body: new URLSearchParams(data) // ✅ Form-encoded data
    });

    const result = await response.json(); // ✅ Parse JSON response

    if (response.ok) {
      statusEl.textContent = '✅ Booking confirmed! Check your email for a reminder.';
      statusEl.classList.add('success');
      form.reset();
    } else {
      // Show Formspree's error message if available
      throw new Error(result.errors ? Object.values(result.errors)[0] : 'Failed to submit');
    }
  } catch (error) {
    statusEl.textContent = '❌ Something went wrong. Please try again or call us.';
    statusEl.classList.add('error');
    console.error('Booking error:', error);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Confirm Booking';
  }
});