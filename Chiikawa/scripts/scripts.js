'use strict';

/* animation effect for sections with class 'info' using Intersection Observer */
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.info');
  sections.forEach(section => section.classList.add('animations'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Fade in
        } else {
          entry.target.classList.remove('visible'); // Fade out
        }
      });
    }, {
      threshold: 0.15
    });
    sections.forEach(section => observer.observe(section));
  } else {
    // Fallback for old browsers: show all
    sections.forEach(section => section.classList.add('visible'));
  }
});