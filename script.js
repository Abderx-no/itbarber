form.addEventListener('submit', async (e) => {
  e.preventDefault();

  statusEl.textContent = '';
  statusEl.className = 'form-status';

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Safe date check
  if (!data.date) {
    statusEl.textContent = 'Please select a date.';
    statusEl.classList.add('error');
    return;
  }

  if (new Date(data.date).getDay() === 0) {
    statusEl.textContent = 'We are closed on Sundays.';
    statusEl.classList.add('error');
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Processing...';

  try {
    const response = await fetch('https://formspree.io/f/xykvjazd', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: new FormData(form)
    });

    // SAFE response handling
    if (response.ok) {
      statusEl.textContent = '✅ Booking confirmed!';
      statusEl.classList.add('success');
      form.reset();
    } else {
      statusEl.textContent = '❌ Failed to send booking.';
      statusEl.classList.add('error');
    }

  } catch (error) {
    console.error(error);
    statusEl.textContent = '❌ Network error.';
    statusEl.classList.add('error');
  }

  btn.disabled = false;
  btn.textContent = 'Confirm Booking';
});
