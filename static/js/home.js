document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("artistCarousel");
  const items = Array.from(carousel.children);
  const totalItems = items.length;
  let currentIndex = 0;

  function scrollCarousel() {
    currentIndex = (currentIndex + 1) % totalItems;
    const translateX = -currentIndex * 100 / 4; // Divide by 4 as we show 4 items at once
    carousel.style.transform = `translateX(${translateX}%)`;
  }

  // Initial setup
  items.forEach((item, index) => {
    item.style.left = `${index * 25}%`; // 25% as we show 4 items
  });

  // Auto-scroll every 3 seconds
  setInterval(scrollCarousel, 3000);

  // Pause animation on hover
  carousel.addEventListener('mouseenter', () => {
    clearInterval(scrollInterval);
  });

  carousel.addEventListener('mouseleave', () => {
    scrollInterval = setInterval(scrollCarousel, 3000);
  });
});