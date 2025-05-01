const swiper = new Swiper('.slider-material', {
    // Optional parameters
    loop: true,
    // If we need pagination
    pagination: {
      el: '.slider-material__pagination',
    },
});

window.addEventListener('scroll', function () {
  this.scrollY > 0 ? document.querySelector('.header').classList.add('scroll') : document.querySelector('.header').classList.remove('scroll');
})