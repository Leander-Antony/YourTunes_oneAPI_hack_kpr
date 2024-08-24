document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("artistCarousel");
  const items = Array.from(carousel.children);
  const itemsPerSlide = 4; // Display four artists at a time
  const totalSlides = Math.ceil(items.length / itemsPerSlide);
  let currentSlide = 0;

  function showNextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  function updateCarousel() {
    const start = currentSlide * itemsPerSlide;
    const end = start + itemsPerSlide;
    items.forEach((item, index) => {
      if (index >= start && index < end) {
        item.style.display = "block";
        item.classList.add("fade-in");
      } else {
        item.style.display = "none";
        item.classList.remove("fade-in");
      }
    });

    // Shift positions within the visible set
    for (let i = 0; i < itemsPerSlide; i++) {
      const currentIndex = (start + i) % items.length;
      const nextIndex = (start + i + 1) % items.length;
      items[currentIndex].style.order = i;
      items[nextIndex].style.order = (i + 1) % itemsPerSlide;
    }
  }

  // Initial setup
  updateCarousel();

  // Auto-slide every 3 seconds
  setInterval(showNextSlide, 3000);
});
