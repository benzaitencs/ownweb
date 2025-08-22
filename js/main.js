$(document).ready(function () {

  /* ====== Mobile nav toggle ====== */
  $('.fa-bars').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('load scroll', function () {
    $('.fa-bars').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if ($(window).scrollTop() > 35) {
      $('.header').css({ background: '#002e5f', boxShadow: '0 .2rem .5rem rgba(0,0,0,.4)' });
    } else {
      $('.header').css({ background: 'none', boxShadow: 'none' });
    }
  });

  /* ====== Counters ====== */
  const counters = document.querySelectorAll('.counter');
  const speed = 120;
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = target / speed;
      if (count < target) {
        counter.innerText = count + inc;
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });

  /* ====== Owl Carousels ====== */
  (function ($) {
    "use strict";
    $(".clients-carousel").owlCarousel({
      autoplay: true, dots: true, loop: true,
      responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 } }
    });
    $(".testimonials-carousel").owlCarousel({
      autoplay: true, dots: true, loop: true,
      responsive: { 0: { items: 1 }, 576: { items: 2 }, 768: { items: 3 }, 992: { items: 4 } }
    });
  })(jQuery);

  /* ====== Back to top ====== */
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) $('.back-to-top').fadeIn('slow');
    else $('.back-to-top').fadeOut('slow');
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo'); return false;
  });

  /* ====== FAQ accordion ====== */
  $('.accordion-header').click(function () {
    $('.accordion .accordion-body').slideUp(500);
    $(this).next('.accordion-body').slideDown(500);
    $('.accordion .accordion-header span').text('+');
    $(this).children('span').text('-');
  });

  /* ========================================================
     Loader → fly logo into fixed header (uses Web Animations)
     Requirements:
       - <div id="bzLoader"> with <img id="bzLoaderLogo">
       - Header logo: <img id="headerLogo">
       - CSS from my previous message (header opacity / loader styles)
     ======================================================== */
 /* ====== Loader → fly logo into header (ultra-robust) ====== */
(function(){
  const SHOW_MS = 2200;     // how long to keep the loader visible
  const FAILSAFE_MS = 2500; // absolute max (force remove)
  const $loader     = $('#bzLoader');
  const $loaderLogo = $('#bzLoaderLogo');
  const $header     = $('.header');
  const $headerLogo = $('#headerLogo');

  // If no loader markup, just reveal header and quit.
  if (!$loader.length || !$loaderLogo.length) {
    $header.addClass('bz-visible');
    return;
  }

  // In case there are multiple jQuery versions, lock this reference now
  const animateAvailable = typeof $loaderLogo[0].animate === 'function';

  // Make sure header eventually shows even if nothing else runs
  const globalFailSafe = setTimeout(() => {
    $header.addClass('bz-visible');
    if ($headerLogo.length) $headerLogo.css('opacity', 1);
    $loader.remove();
  }, FAILSAFE_MS);

  // Hide header logo until we finish the fly animation
  if ($headerLogo.length) $headerLogo.css('opacity', 0);

  function flyToHeader() {
    // Reveal header (it fades in via CSS)
    $header.addClass('bz-visible');

    // If the header logo is missing, or sizes can’t be measured, just fade out
    if (!$headerLogo.length) {
      $loader.fadeOut(300, () => { clearTimeout(globalFailSafe); $loader.remove(); });
      return;
    }

    const from = $loaderLogo[0].getBoundingClientRect();
    const to   = $headerLogo[0].getBoundingClientRect();

    // If a reload race gives zero sizes, fade out (don’t get stuck)
    if (!from.width || !from.height || !to.width || !to.height) {
      $loader.fadeOut(300, () => { clearTimeout(globalFailSafe); $headerLogo.css('opacity', 1); $loader.remove(); });
      return;
    }

    const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
    const dy = (to.top  + to.height / 2) - (from.top  + from.height / 2);
    const sx = to.width / from.width;
    const sy = to.height / from.height;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReduced ? 1 : 600;

    if (!animateAvailable) {
      // Fallback: just fade
      $loader.fadeOut(duration || 300, () => {
        clearTimeout(globalFailSafe);
        $headerLogo.css('opacity', 1);
        $loader.remove();
      });
      return;
    }

    const anim = $loaderLogo[0].animate(
      [
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, opacity: 0.98 }
      ],
      { duration, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' }
    );

    anim.addEventListener('finish', () => {
      clearTimeout(globalFailSafe);
      $headerLogo.css('opacity', 1);
      $loader.remove();
    });
  }

  // Start the fly after SHOW_MS when the page is actually shown
  function scheduleFly() { setTimeout(flyToHeader, SHOW_MS); }

  // 1) Normal load
  $(window).on('load', scheduleFly);

  // 2) BFCache / reload quirks: pageshow fires even when load doesn’t
  window.addEventListener('pageshow', (e) => {
    // If coming from BFCache (persisted) or just shown, run it
    if (e.persisted) scheduleFly();
  });

  // 3) Extra guard: if load/pageshow both fail for some reason, still kill loader
  // (globalFailSafe above will handle it)
})();


});
