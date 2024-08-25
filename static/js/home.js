document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("artistCarousel");
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
  let scrollInterval = setInterval(scrollCarousel, 4000);

  // Pause animation on hover
  carousel.addEventListener('mouseenter', () => {
    clearInterval(scrollInterval);
  });document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("artistCarousel");
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
    let scrollInterval = setInterval(scrollCarousel, 4000);
  
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  });document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("artistCarousel");
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
    let scrollInterval = setInterval(scrollCarousel, 4000);
  
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  });document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("artistCarousel");
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
    let scrollInterval = setInterval(scrollCarousel, 4000);
  
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  });document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("artistCarousel");
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
    let scrollInterval = setInterval(scrollCarousel, 4000);
  
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  });document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("artistCarousel");
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
    let scrollInterval = setInterval(scrollCarousel, 4000);
  
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  });document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("artistCarousel");
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
    let scrollInterval = setInterval(scrollCarousel, 4000);
  
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  });document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("artistCarousel");
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
    let scrollInterval = setInterval(scrollCarousel, 4000);
  
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  });document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("artistCarousel");
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
    let scrollInterval = setInterval(scrollCarousel, 4000);
  
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  });document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("artistCarousel");
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
    let scrollInterval = setInterval(scrollCarousel, 4000);
  
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  });document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("artistCarousel");
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
    let scrollInterval = setInterval(scrollCarousel, 4000);
  
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  });document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("artistCarousel");
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
    let scrollInterval = setInterval(scrollCarousel, 4000);
  
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  });document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("artistCarousel");
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
    let scrollInterval = setInterval(scrollCarousel, 4000);
  
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  });document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("artistCarousel");
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
    let scrollInterval = setInterval(scrollCarousel, 4000);
  
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  });document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("artistCarousel");
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
    let scrollInterval = setInterval(scrollCarousel, 4000);
  
    // Pause animation on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(scrollInterval);
    });
  
    carousel.addEventListener('mouseleave', () => {
      scrollInterval = setInterval(scrollCarousel, 4000);
    });
  });

  carousel.addEventListener('mouseleave', () => {
    scrollInterval = setInterval(scrollCarousel, 4000);
  });
});