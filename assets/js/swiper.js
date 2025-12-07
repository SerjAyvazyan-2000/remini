const bWorkSwiper = new Swiper(".b-work-swiper", {
  slidesPerView: 3,
  spaceBetween: 21,
    autoHeight: true,

  pagination: {
    el: ".b-work-pagination",
    clickable: true,
  },
  loop: true,

  breakpoints: {
    320: { slidesPerView: 1 },
    500: { slidesPerView: 1.5 },
    626: { slidesPerView: 2 },
    830: { slidesPerView: 2.3 },
    1000: { slidesPerView: 2.5 },
    1200: { slidesPerView: 3 },
  },
});


