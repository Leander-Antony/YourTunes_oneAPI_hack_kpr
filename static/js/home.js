document.addEventListener("DOMContentLoaded", function () {
  function setupCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    const items = Array.from(carousel.children);
    const totalItems = items.length;
    let currentIndex = 0;

    function updateCarousel() {
      items.forEach((item, index) => {
        let position = index - currentIndex;
        if (position < -2) position += totalItems;
        if (position > 2) position -= totalItems;

        if (position >= -2 && position <= 2) {
          item.style.display = 'block';
          const offset = position * 140;
          const scale = 1 - Math.abs(position) * 0.2;
          const zIndex = 2 - Math.abs(position);

          item.style.transform = `translateX(${offset}px) scale(${scale})`;
          item.style.opacity = 1 - Math.abs(position) * 0.3;
          item.style.zIndex = zIndex;

          if (position === 0) {
            item.classList.add('center');
          } else {
            item.classList.remove('center');
          }
        } else {
          item.style.display = 'none';
        }
      });
    }

    function scrollCarousel() {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }

    // Initial setup
    updateCarousel();

    // Auto-scroll every 4 seconds
    let scrollInterval = setInterval(scrollCarousel, 2000);

    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });

    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  }

  // Setup both carousels
  setupCarousel("artistCarousel");
  setupCarousel("trackCarousel");

  const form = document.querySelector('form');
  const popup = document.getElementById('popup');
  const popupContent = document.getElementById('popupContent');

  const facts = [
    "The world's oldest known musical instruments are flutes dating back over 40,000 years.",
    "They say Elizabeth Taylor helped in popularizing Michael Jackson’s title as the King of Pop.",
    "The Beatles hold the record for the most number one hits on the Billboard Hot 100 chart.",
    "Mozart composed over 600 works in his lifetime, many of which are considered masterpieces.",
    "The piano was invented in Italy by Bartolomeo Cristofori in the early 1700s.",
    "A Canadian astronaut released an album of songs all recorded in space",
    "Blues music was created post-slavery: During the 1860s, a revolutionary music genre called Blues emerged in the Deep South. African-Americans birthed this unique sound, drawing inspiration from work songs and spirituals.",
    "Mozart sold more CDs than Beyonce in 2016.",
    "Rap God by Eminem, the song with a world record.",
    "Only Metallica has played in all of the 7 continents.",
  ];

  const images = [
    "/static/image/Facts/flute.jpg", 
    "/static/image/Facts/Mj.jpg", 
    "/static/image/Facts/beatles.jpg", 
    "/static/image/Facts/mozart.jpg", 
    "/static/image/Facts/ilayraja.jpg", 
    "/static/image/Facts/astrounat.jpg", 
    "/static/image/Facts/blues.jpg", 
    "/static/image/Facts/mozart.jpg", 
    "/static/image/Facts/eminem.png", 
    "/static/image/Facts/world.png" 
  ];
  

  let factInterval;

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    try {
      popupContent.textContent = "Enlighten your music knowledge with some facts until our AI creates a playlist for you.";
      popup.style.display = 'flex';

      factInterval = setInterval(function() {
        const randomIndex = Math.floor(Math.random() * facts.length);
        const randomFact = facts[randomIndex];
        const relatedImage = images[randomIndex];

        popupContent.innerHTML = `
          <img src="${relatedImage}" alt="Related image" style="max-width: 100%; height: auto;">
          <p>${randomFact}</p>
        `;
      }, 4000);


      setTimeout(function() {
        clearInterval(factInterval);
        popup.style.display = 'none';
      }, 100000);

      form.submit();
    } catch (error) {
      console.error('Error displaying random fact:', error);
    }
  });
});