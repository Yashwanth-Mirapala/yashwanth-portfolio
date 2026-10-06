const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const topBtn = document.getElementById("topBtn");
const year = document.getElementById("year");


/* YEAR */
if (year) {
  year.textContent = new Date().getFullYear();
}


/* MOBILE MENU */
if (menuBtn && nav) {

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });

}


/* BACK TO TOP */
if (topBtn) {

  window.addEventListener("scroll", () => {
    topBtn.classList.toggle("show", window.scrollY > 500);
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

}


/* ACTIVE NAVIGATION */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.id;
    }

  });

  navLinks.forEach(link => {

    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );

  });

});


/* SCROLL ANIMATION */
const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

    });

  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});


/* EMAILJS INITIALIZATION */
if (typeof emailjs !== "undefined") {

  emailjs.init({
    publicKey: "N7DTU4nQlWzXXW63x"
  });

}


/* CONTACT FORM */
const contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const status = document.getElementById("formStatus");
    const button = contactForm.querySelector("button");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();


    /* VALIDATION */
    if (!name || !email || !message) {

      status.textContent =
        "Please fill in all fields.";

      return;
    }


    /* CHECK EMAILJS */
    if (typeof emailjs === "undefined") {

      status.textContent =
        "EmailJS could not load. Please refresh the page.";

      return;
    }


    /* SENDING */
    button.disabled = true;
    button.textContent = "Sending...";

    status.textContent = "Sending message...";


    try {

      const response = await emailjs.sendForm(
        "service_attsc9r",
        "template_5ktxpgl",
        contactForm
      );


      console.log("EmailJS Success:", response);

      status.textContent =
        "Message sent successfully! ✅";

      contactForm.reset();

      button.disabled = false;
      button.textContent = "Send Message ↗";


    } catch (error) {

      console.error("EmailJS Full Error:", error);
      console.error("Status:", error?.status);
      console.error("Text:", error?.text);

      status.textContent =
        "EmailJS Error: " +
        (error?.text || "Unknown error");

      button.disabled = false;
      button.textContent = "Send Message ↗";

    }

  });

}