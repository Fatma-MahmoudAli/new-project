const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const reservationForm = document.querySelector("#reservation-form");
const formMessage = document.querySelector("#form-message");
const dateInput = document.querySelector('input[name="date"]');

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "فتح القائمة" : "إغلاق القائمة");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "فتح القائمة");
      navLinks.classList.remove("is-open");
    });
  });
}

if (dateInput) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  dateInput.min = localToday;
}

if (reservationForm && formMessage) {
  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!reservationForm.reportValidity()) {
      return;
    }

    const guestName = new FormData(reservationForm).get("name").trim();
    formMessage.textContent = `شكراً ${guestName}، تم استلام طلب الحجز بنجاح. سنتواصل معك قريباً لتأكيده.`;
    reservationForm.reset();
    dateInput.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
