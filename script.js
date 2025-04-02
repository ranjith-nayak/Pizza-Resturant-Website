'use strict';

/**
 * PRELOAD
 * 
 * Ensure the preloader stays visible for at least 3 seconds.
 */
const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  const minPreloadTime = 3000; // 3 seconds
  const startTime = performance.now();

  // Ensure the preloader stays for at least 3 seconds
  const hidePreloader = () => {
    const elapsedTime = performance.now() - startTime;
    const remainingTime = Math.max(0, minPreloadTime - elapsedTime);

    setTimeout(() => {
      preloader.classList.add("loaded");
      document.body.classList.add("loaded");
    }, remainingTime);
  };

  hidePreloader();
});
/**
 * Add event listener on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  elements.forEach(element => element.addEventListener(eventType, callback));
};

/**
 * NAVBAR
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER & BACK TO TOP BUTTON
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollDown = lastScrollPos < window.scrollY;
  header.classList.toggle("hide", isScrollDown);
  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  const isScrolled = window.scrollY >= 50;
  header.classList.toggle("active", isScrolled);
  backTopBtn.classList.toggle("active", isScrolled);
  hideHeader();
});

/**
 * HERO SLIDER
 */
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  currentSlidePos = (currentSlidePos + 1) % heroSliderItems.length;
  updateSliderPos();
};

const slidePrev = function () {
  currentSlidePos = (currentSlidePos - 1 + heroSliderItems.length) % heroSliderItems.length;
  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);
heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * Auto Slide
 */
let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(slideNext, 7000);
};

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);

/**
 * PARALLAX EFFECT
 */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

const handleParallax = function (event) {
  const xFactor = (event.clientX / window.innerWidth - 0.5) * -10;
  const yFactor = (event.clientY / window.innerHeight - 0.5) * -10;

  parallaxItems.forEach(item => {
    const speed = Number(item.dataset.parallaxSpeed);
    const x = xFactor * speed;
    const y = yFactor * speed;
    item.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  });
};


// Throttle the mousemove event for better performance
let throttleTimeout;
window.addEventListener("mousemove", function (event) {
  if (!throttleTimeout) {
    throttleTimeout = setTimeout(() => {
      handleParallax(event);
      throttleTimeout = null;
    }, 16); // ~60fps
  }
});

// Ensure the scrollable section is active
const scrollableContent = document.querySelector(".scrollable-content");

if (scrollableContent) {
  scrollableContent.addEventListener("scroll", () => {
    console.log("Scrolling inside the scrollable section");
  });
}
