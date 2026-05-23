const form = document.getElementById("bookingForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = form.querySelector("button[type='submit']");
  btn.disabled = true;
  btn.textContent = "Processing...";

  try {
    const response = await fetch("https://formspree.io/f/xykvjazd", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: new FormData(form)
    });

    if (response.ok) {
      statusEl.textContent = "✅ Booking sent successfully!";
      form.reset();
    } else {
      statusEl.textContent = "❌ Failed to send booking.";
    }

  } catch (error) {
    console.log(error);
    statusEl.textContent = "❌ Network error.";
  }

  btn.disabled = false;
  btn.textContent = "Confirm Booking";
});
