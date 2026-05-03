
$(document).ready(function () {
   const $menuBtn = $(".fa-bars");
  const $navbar = $(".navbar");
  const $header = $(".header");
  const $logo = $(".logo");

  /* ====== Mobile nav toggle ====== */
  $('.fa-bars').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('load scroll', function () {
    $('.fa-bars').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

  if ($(window).scrollTop() > 35) {
  $('.header').css({ background: '#002e5f', boxShadow: '0 .2rem .5rem rgba(0,0,0,.4)' })
              .addClass('white-shadow-hover scrolled');
  // $('.logo').css({ background: 'rgba(63, 37, 37, 0.2)' });
} else {
  $('.header').css({ background: 'none', boxShadow: 'none' })
              .removeClass('white-shadow-hover scrolled');
  // $('.logo').css({ background: 'rgba(255, 255, 255, 0.2)' });
}

  });
   $navbar.find("a").click(function () {
    $navbar.removeClass("active");
    $menuBtn.removeClass("fa-times");
  });

  /* ====== Counters ====== */
  // const counters = document.querySelectorAll('.counter');
  // const speed = 120;
 
   const menuBtn = document.querySelector(".fa-bars");
  const navbar = document.querySelector(".navbar");

  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });

  /* ====== Owl Carousels ====== */
  (function ($) {
    "use strict";
    $(".clients-carousel").owlCarousel({
      autoplay: true, dots: true, loop: true,
      responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 } }
    });
    $(".testimonials-carousel").owlCarousel({
      autoplay: true,
      autoplayTimeout: 4200,
      smartSpeed: 900,
      dots: true,
      loop: true,
      center: true,
      margin: 12,
      responsive: { 0: { items: 1 }, 768: { items: 2 }, 1200: { items: 3 } }
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
  // Smooth scroll for all anchor links
$('.navbar a').on('click', function (e) {
  if (this.hash !== "") {
    e.preventDefault();

    let target = this.hash;

    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 1000, 'easeInOutExpo');  // same easing as your back-to-top

    // Optional: update the URL hash without jumping
    window.location.hash = target;
  }
 });


  /* ====== FAQ accordion ====== */
  $('.accordion-header').click(function () {
    if ($(this).children('span').text() == '-'){
      $(this).next('.accordion-body').slideUp(500);
      $('.accordion .accordion-header span').text('+');
    }else{
      $('.accordion .accordion-body').slideUp(500);
      $(this).next('.accordion-body').slideDown(500);
      $('.accordion .accordion-header span').text('+');
      //console.log($('.accordion .accordion-header span').text())
      $(this).children('span').text('-');
      //console.log($(this).children('span').attr('id'))
    }
    
    
    
  });
  // $('.accordion .accordion-header span').click(function(){
  //   console.log(5)
  //   if ($(this).text() == '-'){
  //     console.log(this.innerText)
  //     $('.accordion .accordion-body').slideDown(500);
  //     $('.accordion .accordion-header span').text('+');
  //   }
  // });

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
  const $loaderLogo = $('#bzLoaderLogo, .bz-loader-logo').first();
  const $header     = $('.header');
  const $headerLogo = $('#headerLogo');

  // If no loader markup, just reveal header and quit.
  if (!$loader.length) {
    $header.addClass('bz-visible');
    return;
  }

  // If the loader exists but the animated logo is missing, don't leave the overlay stuck.
  if (!$loaderLogo.length) {
    $header.addClass('bz-visible');
    $loader.fadeOut(300, function () { $(this).remove(); });
    return;
  }

  // In case there are multiple jQuery versions, lock this reference now
  const animateAvailable = typeof $loaderLogo[0].animate === 'function';

  // Make sure header eventually shows even if nothing else runs
  const globalFailSafe = setTimeout(() => {
    $header.addClass('bz-visible');
    if ($headerLogo.length) $headerLogo.css({'opacity': 1});
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
      $loader.fadeOut(duration || 70, () => {
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

$(document).ready(function() {
    // Array of phrases to be "typed" out.
    const phrases = [
      "AI-Driven Growth",
      "NextGen Technology",
      "Cybersecurity First",
      "Cloud That Scales"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Use a jQuery object to store the element for efficiency
    const typedTextElement = $(".typed-text");
    
    // The main typing function
    function type() {
        // Get the current phrase based on phraseIndex
        let currentPhrase = phrases[phraseIndex];
        // Get the substring to display based on charIndex
        let currentText = currentPhrase.substring(0, charIndex);
        
        // Use the jQuery method .text() to update the content
        typedTextElement.text(currentText);
        
        if (!isDeleting && charIndex < currentPhrase.length) {
            // Typing forward
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            // Deleting backward
            charIndex--;
            setTimeout(type, 60);
        } else {
            // End of a phrase, or end of deletion
            isDeleting = !isDeleting;
            if (!isDeleting) {
                // Move to the next phrase
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
            setTimeout(type, 1000); // Pause before next action
        }
    }

    // Start the typing effect when the document is ready
    type();
});


window.addEventListener("load", () => {
  const loader = document.getElementById("bzLoader");
  const logo   = document.querySelector(".bz-loader-logo");
  const orbit  = document.querySelector(".orbit");
  if (!loader || !logo || !orbit) return;

  // Step 1: trigger final spin
  orbit.style.animation = "spin 1s linear forwards";

  // Step 2: when orbit finishes spinning → zoom logo
  orbit.addEventListener("animationend", () => {
    logo.classList.add("zoom-in");
  }, { once: true });

  // Step 3: when logo zoom completes → fade loader & show content
  logo.addEventListener("transitionend", () => {
    loader.classList.add("fade-out");
    window.setTimeout(() => {
      if (loader.parentNode) {
        loader.remove();
      }
    }, 1000);
  }, { once: true });
});
$(window).on("scroll", function () {
  $(".team-grid .card").each(function (i) {
    let card = $(this);
    let triggerPoint = $(window).scrollTop() + window.innerHeight;
    let cardTop = card.offset().top;
    let cardBottom = card.offset().top + card.outerHeight();

    if (cardTop < triggerPoint && cardBottom > $(window).scrollTop()) {
      // card is in viewport
      setTimeout(function () {
        card.addClass("animate");
      }, i * 200);
    } else {
      // reset when card leaves viewport
      card.removeClass("animate");
    }
  });
});


// JavaScript / jQuery

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        const increment = Math.max(1, Math.ceil(target / 60));

        if (current < target) {
            counter.innerText = current + increment > target ? target : current + increment;
            window.setTimeout(() => {
                requestAnimationFrame(() => animateCounter(counter));
            }, 45);
        } else {
            counter.innerText = target;
        }
    };

    // Use IntersectionObserver to trigger animation when visible
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of counter is visible

    counters.forEach(counter => observer.observe(counter));
});






/* Toasts container */

// SwipeHandler
// SwipeHandler class
class SwipeHandler {
  getSwipeDirection({ touchstartX, touchstartY, touchendX, touchendY }) {
    const delx = touchendX - touchstartX;
    const dely = touchendY - touchstartY;

    if (Math.abs(delx) > Math.abs(dely)) {
      return delx > 0 ? 'right' : 'left';
    }
    if (Math.abs(delx) < Math.abs(dely)) {
      return dely > 0 ? 'down' : 'up';
    }
    return 'tap';
  }
}

// SVG icons used by ToastsFactory
const svgIcons = [
  {
    name: 'check-circle',
    svg: `
      <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
        <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z'/>
      </svg>
    `,
  },
  {
    name: 'info-circle',
    svg: `
      <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
        <path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'/>
      </svg>
    `,
  },
  {
    name: 'exclamation-circle',
    svg: `
      <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
        <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'/>
      </svg>
    `,
  },
  {
    name: 'exclamation-triangle',
    svg: `
      <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
        <path d='M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'/>
      </svg>
    `,
  },
  {
    name: 'x-lg',
    svg: `
      <svg xmlns='http://www.w3.org/2000/svg' class='t-close' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
        <path d='M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z'/>
      </svg>
    `,
  },
];

// ToastsFactory class
class ToastsFactory {
  constructor(swipeHandler) {
    this.swipeHandler = swipeHandler;
    console.log('ToastsFactory instantiated');
    this.createToastsContainer();
    this.createToastsFromButtons();
  }

  createToastsContainer() {
    console.log("Creating toast container");
    const toastsContainer = document.createElement('div');
    toastsContainer.classList.add('toasts-container');
    this.toastsContainer = toastsContainer;
    document.body.appendChild(toastsContainer);
  }

  createToastsFromButtons() {
    document.addEventListener(
      'click',
      (e) => {
        if (!e.target.matches('.btn-toast')) return;
        const dataset = e.target.dataset;
        const config = {
          type: dataset.type,
          icon: dataset.icon,
          message: dataset.message,
          duration: dataset.duration ? parseInt(dataset.duration, 10) : undefined,
        };
        this.createToast(config);
      },
      false
    );
  }

  createToast({ type, icon, message, duration }) {
    console.log("Creating toast:", type, icon, message);
    const toast = this.createToastElement(type);
    this.addToastElement(toast, 't-icon', svgIcons.find((item) => item.name === icon).svg);
    this.addToastElement(toast, 't-message', message);
    this.addCloseButton(toast);
    const progressBar = this.getProgressBar(duration);
    if (progressBar) toast.appendChild(progressBar);

    this.observeSwipe(toast, 'right');

    if (!this.toastsContainer) {
      console.error("Toast container missing, creating...");
      this.createToastsContainer();
    }
    this.toastsContainer.appendChild(toast);
    console.log("Appended toast to container");

    if (!progressBar) return;

    progressBar.onanimationend = () => this.removeToast(toast);
  }

  createToastElement(type) {
    const toast = document.createElement('div');
    toast.classList.add('toast', type, 'active');
    console.log("Created toast element");
    return toast;
  }

  addToastElement(toast, className, content) {
    const element = document.createElement('div');
    element.classList.add(className);
    element.innerHTML = content;
    toast.appendChild(element);
    console.log("Added toast element:", className);
    return element;
  }

  addCloseButton(toast) {
    const closeButton = this.addToastElement(
      toast,
      't-close',
      svgIcons.find((icon) => icon.name === 'x-lg').svg
    );
    closeButton.onclick = () => this.removeToast(toast);
  }

  getProgressBar(duration) {
    if (duration === 0) return;
    const progressBar = document.createElement('div');
    progressBar.classList.add('t-progress-bar');
    if (duration) progressBar.style.setProperty('--toast-duration', `${duration}ms`);
    return progressBar;
  }

  removeToast(toast) {
    toast.classList.remove('active');
    toast.onanimationend = (evt) => {
      if (evt.target === toast) toast.remove();
    };
  }

  observeSwipe(toast, direction) {
    let touchstartX = 0,
      touchstartY = 0,
      touchendX = 0,
      touchendY = 0;

    toast.addEventListener(
      'touchstart',
      (event) => {
        window.document.body.style.overflow = 'hidden';
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
      },
      { passive: true }
    );

    toast.addEventListener(
      'touchend',
      (event) => {
        window.document.body.style.overflow = 'unset';
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        const swipeConfig = {
          touchstartX,
          touchstartY,
          touchendX,
          touchendY,
        };
        if (this.swipeHandler.getSwipeDirection(swipeConfig) === direction) {
          this.removeToast(toast);
        }
      },
      { passive: true }
    );
  }
}

$(document).ready(function () {
  const form = $("#contactForm");
  const nameField = $("input[name='name']");
  const emailField = $("input[name='email']");
  const phoneField = $("input[name='phone']");
  const formStartedAtField = $("#formStartedAt");
  const errorContainer = $("#error-messages");

  // Initialize SwipeHandler and ToastsFactory once
  const swipeHandler = new SwipeHandler();
  const toastsFactory = new ToastsFactory(swipeHandler);
  let attemptedSubmit = false;
  const touchedFields = {
    name: false,
    email: false,
    phone: false,
  };

  // intl-tel-input init
  const iti = window.intlTelInput(phoneField[0], {
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.6/build/js/utils.js",
    initialCountry: "auto",
    geoIpLookup: callback => {
      fetch("https://ipapi.co/json")
        .then(res => res.json())
        .then(data => callback((data.country_code || "").toLowerCase() || getFallbackCountry()))
        .catch(() => callback(getFallbackCountry()));
    },
    separateDialCode: true,
    nationalMode: false,
  });

  function getFallbackCountry() {
    const localeRegion = (navigator.language || "")
      .split("-")[1]
      ?.toLowerCase();

    if (localeRegion && localeRegion.length === 2) {
      return localeRegion;
    }

    return "us";
  }

  formStartedAtField.val(Math.floor(Date.now() / 1000));

  function validateName() {
    const name = nameField.val().trim();
    let error = "";
    if (!name) error = "Name is required.";
    else if (name.length < 2) error = "Name must be at least 2 characters.";
    else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'’\-\. ]+$/.test(name)) error = "Invalid characters in name.";
    nameField.toggleClass("input-error", !!error);
    return error;
  }

  function validateEmail() {
    const email = emailField.val().trim();
    let error = "";
    if (!email) error = "Email is required.";
    else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email))
      error = "Invalid email format.";
    emailField.toggleClass("input-error", !!error);
    return error;
  }

  function validatePhone() {
    const rawPhone = phoneField.val().trim();
    const digitsOnly = rawPhone.replace(/\D/g, "");
    let error = "";
    if (!rawPhone) {
      error = "Phone number is required.";
    } else if (digitsOnly.length < 7) {
      error = "Please enter a complete phone number.";
    } else if (/^(\d)\1+$/.test(digitsOnly)) {
      error = "Please enter a valid phone number.";
    } else if (!iti.isValidNumber()) {
      error = "Please enter a valid phone number.";
    }
    phoneField.toggleClass("input-error", !!error);
    phoneField.closest(".iti").toggleClass("input-error", !!error);
    return error;
  }

  function clearFieldError(fieldName) {
    if (fieldName === "name") {
      nameField.removeClass("input-error");
      return;
    }

    if (fieldName === "email") {
      emailField.removeClass("input-error");
      return;
    }

    if (fieldName === "phone") {
      phoneField.removeClass("input-error");
      phoneField.closest(".iti").removeClass("input-error");
    }
  }

  function collectVisibleErrors() {
    const errors = [];

    if (attemptedSubmit || touchedFields.name) {
      const nameError = validateName();
      if (nameError) errors.push(nameError);
    } else {
      clearFieldError("name");
    }

    if (attemptedSubmit || touchedFields.email) {
      const emailError = validateEmail();
      if (emailError) errors.push(emailError);
    } else {
      clearFieldError("email");
    }

    if (attemptedSubmit || touchedFields.phone) {
      const phoneError = validatePhone();
      if (phoneError) errors.push(phoneError);
    } else {
      clearFieldError("phone");
    }

    return errors;
  }

  function showErrors(errors) {
    const filtered = errors.filter(Boolean);
    if (filtered.length > 0) {
      errorContainer
        .html(filtered.map(e => `<div>• ${e}</div>`).join(""))
        .show();
    } else {
      errorContainer.hide();
    }
  }

  phoneField.on("countrychange", () => {
    if (!attemptedSubmit && !touchedFields.phone) return;
    showErrors(collectVisibleErrors());
  });

  nameField.on("keyup blur", () => {
    touchedFields.name = true;
    showErrors(collectVisibleErrors());
  });

  emailField.on("keyup blur", () => {
    touchedFields.email = true;
    showErrors(collectVisibleErrors());
  });

  phoneField.on("keyup blur", () => {
    touchedFields.phone = true;
    showErrors(collectVisibleErrors());
  });

  form.on("submit", function (e) {
    e.preventDefault();
    attemptedSubmit = true;
    touchedFields.name = true;
    touchedFields.email = true;
    touchedFields.phone = true;

    const errors = collectVisibleErrors();
    if (errors.length > 0) {
      showErrors(errors);
      return;
    }

    phoneField.val(iti.getNumber());

    $.ajax({
      url: form.attr("action"),
      type: "POST",
      data: form.serialize(),
      success: function () {
        toastsFactory.createToast({
          type: 'success',
          icon: 'check-circle',
          message: 'See you soon!!! 😍',
          duration: 4000
        });
        form[0].reset();
        iti.setNumber("");
        formStartedAtField.val(Math.floor(Date.now() / 1000));
        attemptedSubmit = false;
        touchedFields.name = false;
        touchedFields.email = false;
        touchedFields.phone = false;
        showErrors([]);
        clearFieldError("name");
        clearFieldError("email");
        clearFieldError("phone");
      },
      error: function () {
        toastsFactory.createToast({
          type: 'error',
          icon: 'exclamation-circle',
          message: 'Please try later!!! 🥲',
          duration: 5000
        });
      },
    });
  });
});
