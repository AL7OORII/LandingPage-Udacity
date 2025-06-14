// ===== Global Variables =====
const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const hamburger = document.getElementById('hamburger');

// ===== Helper Functions =====

// Check if section is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= -200 && rect.top <= 150;
}

// Build Navigation Bar Dynamically
function buildNav() {
  sections.forEach(section => {
    const sectionID = section.id;
    const sectionName = section.getAttribute('data-nav');

    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#${sectionID}" class="menu__link">${sectionName}</a>`;

    navList.appendChild(listItem);
  });
}

// Set Active Section and Active Nav Link
function setActiveSection() {
  sections.forEach(section => {
    const navLink = document.querySelector(`a[href="#${section.id}"]`);

    if (isInViewport(section)) {
      section.classList.add('active-section');
      navLink.classList.add('active-link');
    } else {
      section.classList.remove('active-section');
      navLink.classList.remove('active-link');
    }
  });
}

// Smooth Scroll to Section on Click
function scrollToSection(event) {
  event.preventDefault();

  if (event.target.nodeName === 'A') {
    const targetSection = document.querySelector(event.target.getAttribute('href'));
    targetSection.scrollIntoView({ behavior: 'smooth' });

    // Close hamburger menu on mobile after click
    if (window.innerWidth <= 768) {
      navList.classList.remove('show');
    }
  }
}

// Show/Hide Scroll to Top Button
function toggleScrollToTopBtn() {
  if (window.scrollY > 400) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
}

// Scroll to Top Behavior
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// ===== Event Listeners =====

// Build navigation when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
});

// Add scroll event to set active section
window.addEventListener('scroll', () => {
  setActiveSection();
  toggleScrollToTopBtn();
});

// Add click event for smooth scroll
navList.addEventListener('click', scrollToSection);

// Add click event for scroll to top button
scrollToTopBtn.addEventListener('click', scrollToTop);

// Add click event to toggle hamburger menu
hamburger.addEventListener('click', () => {
  navList.classList.toggle('show');
});
