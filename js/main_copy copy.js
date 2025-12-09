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
  $('.header').css({ background: '#002e5f', boxShadow: '0 .2rem .5rem rgba(0,0,0,.4)' })
              .addClass('white-shadow-hover scrolled');
  $('.logo').css({ background: 'rgba(63, 37, 37, 0.2)' });
} else {
  $('.header').css({ background: 'none', boxShadow: 'none' })
              .removeClass('white-shadow-hover scrolled');
  $('.logo').css({ background: 'rgba(255, 255, 255, 0.2)' });
}

  });

  const input = document.querySelector("#phone");
window.intlTelInput(input, {
  dropdownContainer: input.parentNode,  // attach dropdown inside wrapper
});

  /* ====== Counters ====== */
  // const counters = document.querySelectorAll('.counter');
  // const speed = 120;
  // counters.forEach(counter => {
  //   const updateCount = () => {
  //     const target = +counter.getAttribute('data-target');
  //     const count = +counter.innerText;
  //     const inc = target / speed;
  //     if (count < target) {
  //       counter.innerText = count + inc;
  //       setTimeout(updateCount, 1);
  //     } else {
  //       counter.innerText = target;
  //     }
  //   };
  //   updateCount();
  // });
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

$(document).ready(function() {
    // Array of phrases to be "typed" out.
    const phrases = ["Hello, World!", "I am a web developer.", "I love coding.", "What a beautiful day!"];

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
  const content = document.getElementById("pageContent");

  // Step 1: trigger final spin
  orbit.style.animation = "spin 1s linear forwards";

  // Step 2: when orbit finishes spinning → zoom logo
  orbit.addEventListener("animationend", () => {
    logo.classList.add("zoom-in");
  }, { once: true });

  // Step 3: when logo zoom completes → fade loader & show content
  logo.addEventListener("transitionend", () => {
    loader.classList.add("fade-out");
    
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
        const increment = Math.ceil(target / 200);

        if (current < target) {
            counter.innerText = current + increment > target ? target : current + increment;
            requestAnimationFrame(() => animateCounter(counter));
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

$(document).ready(function () {
    const form = $("#contactForm");
    const nameField = $("input[name='name']");
    const emailField = $("input[name='email']");
    const phoneField = $("input[name='phone']");
    const errorContainer = $("#error-messages");

    // --- intl-tel-input initialization ---
    const iti = window.intlTelInput(phoneField[0], {
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.6/build/js/utils.js",
        initialCountry: "auto",
        geoIpLookup: callback => {
            fetch("https://ipapi.co/json")
                .then(res => res.json())
                .then(data => callback(data.country_code))
                .catch(() => callback("us"));
        },
    });

    // --- Validation functions ---
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
        let error = "";
        if (!phoneField.val().trim()) error = "Phone number is required.";
        else if (!iti.isValidNumber()) error = "Please enter a valid phone number.";
        phoneField.toggleClass("input-error", !!error);
        return error;
    }

    function showErrors(errors) {
        const filtered = errors.filter(Boolean);
        if (filtered.length > 0) {
            errorContainer.html(filtered.map(e => `<div>• ${e}</div>`).join("")).show();
        } else {
            errorContainer.hide();
        }
    }

    // --- Real-time validation ---
    nameField.on("keyup blur", () => showErrors([validateName()]));
    emailField.on("keyup blur", () => showErrors([validateEmail()]));
    phoneField.on("keyup blur", () => showErrors([validatePhone()]));

    // --- Form submit ---
    form.on("submit", function (e) {
        e.preventDefault();
        const errors = [validateName(), validateEmail(), validatePhone()].filter(Boolean);
        if (errors.length > 0) {
            showErrors(errors);
            return;
        }

        // Replace phone input with full international number before submit
        phoneField.val(iti.getNumber());

        // AJAX submission
        $.ajax({
            url: form.attr("action"),
            type: "POST",
            data: form.serialize(),
            success: function () {
                toastsFactory.createToast({
                    type: "success",
                    icon: "check-circle",
                    message: "Your message has been sent successfully!",
                    duration: 4000
                });
                form[0].reset();
                iti.setNumber(""); // reset phone field
            },
            error: function () {
                toastsFactory.createToast({
                    type: "error",
                    icon: "exclamation-circle",
                    message: "❌ Server not responding!",
                    duration: 4000
                });
            }
        });
    });
});
// Swipe Handler
class SwipeHandler {
    getSwipeDirection({ touchstartX, touchstartY, touchendX, touchendY }) {
        const delx = touchendX - touchstartX;
        const dely = touchendY - touchstartY;
        if (Math.abs(delx) > Math.abs(dely)) return delx > 0 ? 'right' : 'left';
        if (Math.abs(delx) < Math.abs(dely)) return dely > 0 ? 'down' : 'up';
        return 'tap';
    }
}

// Toasts Factory
class ToastsFactory {
    constructor(swipeHandler, containerSelector = "#contact") {
        this.swipeHandler = swipeHandler;
        this.containerSelector = containerSelector;
        this.createToastsContainer();
    }

    createToastsContainer() {
        
        toastsContainer.classList.add('toasts-container');
        const parent = document.querySelector(this.containerSelector) || document.body;
        parent.style.position = "relative"; // ensures absolute positioning works
        parent.appendChild(toastsContainer);
        this.toastsContainer = toastsContainer;
    }

    createToast({ type, icon, message, duration = 3000 }) {
        const toast = document.createElement('div');
        
        toast.className = `toast ${type} active`;
        toast.innerHTML = `
            <div class="t-icon">${svgIcons.find(i => i.name === icon).svg}</div>
            <div class="t-message">${message}</div>
            <div class="t-close">${svgIcons.find(i => i.name === 'x-lg').svg}</div>
            <div class="t-progress-bar" style="--toast-duration:${duration}ms;"></div>
        `;
        this.toastsContainer.appendChild(toast);

        // Close button
        toast.querySelector('.t-close').onclick = () => this.removeToast(toast);

        // Auto remove
        toast.querySelector('.t-progress-bar').onanimationend = () => this.removeToast(toast);

        // Swipe remove
        this.observeSwipe(toast, 'right');
    }

    removeToast(toast) {
    toast.classList.remove('active');
    toast.classList.add('fade-out');
    toast.addEventListener("animationend", () => toast.remove(), { once: true });
  }

    observeSwipe(toast, direction) {
        let startX = 0, startY = 0;
        toast.addEventListener('touchstart', e => {
            startX = e.changedTouches[0].screenX;
            startY = e.changedTouches[0].screenY;
        }, { passive: true });

        toast.addEventListener('touchend', e => {
            const endX = e.changedTouches[0].screenX;
            const endY = e.changedTouches[0].screenY;
            if (this.swipeHandler.getSwipeDirection({ touchstartX: startX, touchstartY: startY, touchendX: endX, touchendY: endY }) === direction)
                this.removeToast(toast);
        }, { passive: true });
    }
}

// SVG icons
const svgIcons = [
    { name: 'check-circle', svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>` },
    { name: 'exclamation-circle', svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>` },
    { name: 'x-lg', svg: `<svg xmlns="http://www.w3.org/2000/svg" class="t-close" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/></svg>` }
];

// Instantiate
const swipeHandler = new SwipeHandler();
const toastsFactory = new ToastsFactory(swipeHandler, "#contact");
function showToast(message, type = "success", duration = 3000) {
  const container = document.querySelector("#contact .toasts-container");
  if (!container) return;

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.style.setProperty("--toast-duration", `${duration}ms`);

  toast.innerHTML = `
    <div class="t-icon">
      ${type === "success" ? "✅" : "❌"}
    </div>
    <div class="t-message">${message}</div>
    <div class="t-close">&times;</div>
    <div class="t-progress-bar"></div>
  `;

  container.appendChild(toast);

  // Close on click (manual dismiss)
  toast.querySelector(".t-close").addEventListener("click", () => {
    fadeOutToast(toast);
  });

  // Auto remove after duration
  setTimeout(() => {
    fadeOutToast(toast);
  }, duration);
}

function fadeOutToast(toast) {
  toast.style.animation = "toast-fade-out 0.5s forwards"; // smooth fade
  toast.addEventListener("animationend", () => {
    toast.remove();
  });
}
 