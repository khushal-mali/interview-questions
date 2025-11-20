const newYear = new Date("2026-01-01 12:00:00 AM").getTime(); // YYYY-MM-DD HH:MM:SS AM/PM

const countDownInterval = setInterval(function () {
  const now = new Date().getTime();

  let timeLeftInMilli = newYear - now;

  if (timeLeftInMilli <= 0) {
    clearInterval(countDownInterval);
    document.getElementById("countdown").innerHTML = "<p>Happy New Year</p>";
  }

  const days = Math.floor(timeLeftInMilli / (24 * 60 * 60 * 1000));

  timeLeftInMilli = timeLeftInMilli - days * (24 * 60 * 60 * 1000);

  const hours = Math.floor(timeLeftInMilli / (60 * 60 * 1000));

  timeLeftInMilli = timeLeftInMilli - hours * (60 * 60 * 1000);

  let minutes = Math.floor(timeLeftInMilli / (60 * 1000));

  timeLeftInMilli = timeLeftInMilli - minutes * (60 * 1000);

  const seconds = Math.floor(timeLeftInMilli / 1000);

  /////////////////////////////////////////////////////////////////////

  // helper for padding
  const pad = (num, size = 2) => String(num).padStart(size, "0");

  const textContent = `
        <p>Days: ${pad(days, 3)}, Hours: ${pad(hours)}, Minutes: ${pad(
    minutes
  )}, Seconds: ${pad(seconds)}</p>
        `;

  document.getElementById("countdown").innerHTML = textContent;
}, 1000);
