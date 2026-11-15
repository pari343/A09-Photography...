// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

// Gallery category filter (DOM update)
const categoryFilter = document.querySelector("#categoryFilter");
const galleryItems = document.querySelectorAll(".gallery-item");
const emptyGallery = document.querySelector("#emptyGallery");
if (categoryFilter) {
  categoryFilter.addEventListener("change", () => {
    let visibleCount = 0;
    galleryItems.forEach((item) => {
      const show = categoryFilter.value === "all" || item.dataset.category === categoryFilter.value;
      item.hidden = !show;
      if (show) visibleCount++;
    });
    if (emptyGallery) emptyGallery.hidden = visibleCount !== 0;
  });
}

// Enquiry form: validation, DOM message and Local Storage
const enquiryForm = document.querySelector("#enquiryForm");
const formMessage = document.querySelector("#formMessage");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!enquiryForm.checkValidity()) {
      enquiryForm.reportValidity();
      formMessage.textContent = "Please complete all required fields with valid information.";
      return;
    }

    const enquiry = {
      name: document.querySelector("#fullName").value.trim(),
      email: document.querySelector("#email").value.trim(),
      phone: document.querySelector("#phone").value.trim(),
      service: document.querySelector("#service").value,
      date: document.querySelector("#eventDate").value,
      message: document.querySelector("#message").value.trim(),
      savedAt: new Date().toLocaleString()
    };

    const savedEnquiries = JSON.parse(localStorage.getItem("a09Enquiries") || "[]");
    savedEnquiries.push(enquiry);
    localStorage.setItem("a09Enquiries", JSON.stringify(savedEnquiries));
    formMessage.textContent = `Thank you, ${enquiry.name}! Your demo enquiry has been saved in this browser.`;
    enquiryForm.reset();
  });
}
