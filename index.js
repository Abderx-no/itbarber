const form = document.getElementById('bookingForm');
const statusEl = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('https://formspree.io/f/xykvjazd', {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      statusEl.innerHTML = "✅ Booking sent successfully!";
      form.reset();
    } else {
      statusEl.innerHTML = "❌ Failed to send.";
    }

  } catch (error) {
    console.log(error);
    statusEl.innerHTML = "❌ Error happened.";
  }
});