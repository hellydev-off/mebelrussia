/* global jQuery, Swiper */
(function ($) {
  'use strict';

  // ── Hero-слайдер (единственная инициализация) ────────────────────────────────
  if (document.querySelector('.hero-swiper')) {
    new Swiper('.hero-swiper', {
      loop: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      spaceBetween: 40,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        0:   { spaceBetween: 12 },
        576: { spaceBetween: 20 },
        768: { spaceBetween: 28 },
        992: { spaceBetween: 40 },
      },
    });
  }

  // ── Слайдеры товаров (независимые экземпляры) ───────────────────────────────
  document.querySelectorAll('.pp-swiper').forEach(function (el) {
    var section = el.closest('section');
    new Swiper(el, {
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: section.querySelector('.pp-nav-btn--next'),
        prevEl: section.querySelector('.pp-nav-btn--prev'),
      },
      breakpoints: {
        0:    { slidesPerView: 1 },
        576:  { slidesPerView: 2 },
        992:  { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
    });
  });

  // ── Кнопки +/− для количества товара ────────────────────────────────────────
  $(document).on('click', '.qty-btn', function () {
    var $input = $(this).siblings('input[type="number"]');
    var val = parseInt($input.val(), 10) || 1;
    $input.val($(this).data('action') === 'plus' ? val + 1 : Math.max(1, val - 1));
  });

  // ── Мобильное меню (off-canvas) ──────────────────────────────────────────────
  function openMobileMenu() {
    $('#mobile-menu').addClass('is-open').attr('aria-hidden', 'false');
    $('body').addClass('mobile-menu-open');
  }
  function closeMobileMenu() {
    $('#mobile-menu').removeClass('is-open').attr('aria-hidden', 'true');
    $('body').removeClass('mobile-menu-open');
  }

  $(document).on('click', '[data-mobile-menu-open]', openMobileMenu);
  $(document).on('click', '[data-mobile-menu-close]', closeMobileMenu);

  // Раскрывающиеся группы внутри меню (аккордеон)
  $(document).on('click', '.mobile-menu__group', function () {
    $(this).toggleClass('is-open').next('.mobile-menu__submenu').slideToggle(180);
  });

  // Закрытие по Escape
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') { closeMobileMenu(); }
  });

  // ── Sticky-шапка при скролле ─────────────────────────────────────────────────
  $(window).on('scroll', function () {
    $('body').toggleClass('scrolled', $(this).scrollTop() > 50);
  });

  // ── Выпадающие меню топбара ──────────────────────────────────────────────────
  $(document).on('click', '.topbar-dropdown__trigger', function (e) {
    e.preventDefault();
    var $parent = $(this).closest('.topbar-dropdown');
    var isOpen = $parent.hasClass('open');
    $('.topbar-dropdown.open').not($parent).removeClass('open');
    $parent.toggleClass('open', !isOpen);
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.topbar-dropdown').length) {
      $('.topbar-dropdown.open').removeClass('open');
    }
  });

}(jQuery));
