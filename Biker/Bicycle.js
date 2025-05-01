const swiper = new Swiper('.swiper-response', {
    // Optional parameters
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-response__arrow.swiper-button-next',
      prevEl: '.swiper-response__arrow.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });