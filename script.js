const form = document.getElementById("bookingForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  statusEl.textContent = '';
  statusEl.className = 'form-status';

  const btn = form.querySelector("button[type='submit']");
  btn.disabled = true;
  btn.textContent = "Processing...";

  const formData = new FormData(form);
  const date = formData.get("date");

  if (date && new Date(date).getDay() === 0) {
    statusEl.textContent = "We are closed on Sundays.";
    statusEl.classList.add("error");

    btn.disabled = false;
    btn.textContent = "Confirm Booking";
    return;
  }

  try {
    const response = await fetch("https://formspree.io/f/xykvjazd", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    });

    if (response.ok) {
      statusEl.textContent = "✅ Booking confirmed!";
      statusEl.classList.add("success");
      form.reset();
    } else {
      statusEl.textContent = "❌ Failed to send booking.";
      statusEl.classList.add("error");
    }

  } catch (err) {
    console.error(err);
    statusEl.textContent = "❌ Network error.";
    statusEl.classList.add("error");
  }

  btn.disabled = false;
  btn.textContent = "Confirm Booking";
});
