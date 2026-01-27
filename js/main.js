/**
 * ========================================
 * APPARELMASTER - MAIN JAVASCRIPT
 * ========================================
 * Using jQuery for DOM manipulation
 * and event handling
 * ========================================
 */

$(document).ready(function () {
  // ========================================
  // VARIABLES
  // ========================================
  let activeMegaMenu = null;

  // ========================================
  // HEADER & NAVIGATION
  // ========================================

  /**
   * Header scroll behavior
   * Adds 'scrolled' class when page is scrolled
   */
  function updateHeaderScroll() {
    if ($(window).scrollTop() > 0) {
      $(".header").addClass("scrolled");
    } else {
      $(".header").removeClass("scrolled");
    }
  }

  // Check scroll position on page load
  updateHeaderScroll();

  // Update on scroll
  $(window).on("scroll", updateHeaderScroll);

  /**
   * Phone button reveal (Header)
   * Shows phone number when button is clicked
   */
  $(".phone-btn")
    .not(".phone-revealed")
    .on("click", function () {
      $(this).hide();
      $(".phone-revealed").show();
    });

  // ========================================
  // MEGA MENU
  // ========================================

  /**
   * Mega menu toggle
   * Opens/closes mega menu on nav button click
   */
  $(".nav-btn").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const menuId = $(this).data("megamenu");
    const $megamenu = $("#megamenu-" + menuId);

    if (activeMegaMenu === menuId) {
      closeMegaMenu();
    } else {
      closeMegaMenu();
      activeMegaMenu = menuId;
      $megamenu.addClass("active");
      $('.nav-btn[data-megamenu="' + menuId + '"]').addClass("active");
      $(".header").addClass("menu-open");
    }
  });

  /**
   * Close mega menu function
   */
  function closeMegaMenu() {
    if (activeMegaMenu) {
      $("#megamenu-" + activeMegaMenu).removeClass("active");
      $('.nav-btn[data-megamenu="' + activeMegaMenu + '"]').removeClass(
        "active"
      );
      activeMegaMenu = null;
      $(".header").removeClass("menu-open");
    }
  }

  /**
   * Close mega menu on outside click
   */
  $(document).on("mousedown", function (e) {
    if (activeMegaMenu) {
      const $target = $(e.target);

      if (
        !$target.closest(".nav-btn").length &&
        !$target.closest(".megamenu").length &&
        !$target.closest("nav").length
      ) {
        closeMegaMenu();
      }
    }
  });

  /**
   * Close mega menu on Escape key
   */
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && activeMegaMenu) {
      closeMegaMenu();
    }
  });

  /**
   * Close mega menu when clicking nav links
   */
  $(".nav-link, .megamenu a").on("click", function () {
    closeMegaMenu();
  });

  // ========================================
  // MOBILE MENU
  // ========================================

  /**
   * Mobile menu open
   */
  $(".mobile-menu-btn").on("click", function () {
    $(".mobile-nav-overlay").addClass("active");
    $("body").css("overflow", "hidden");
  });

  /**
   * Mobile menu close
   */
  $(".mobile-nav-close, .mobile-nav-header a, .mobile-nav-submenu a").on(
    "click",
    function () {
      $(".mobile-nav-overlay").removeClass("active");
      $("body").css("overflow", "");
    }
  );

  /**
   * Mobile menu accordion
   */
  $(".mobile-nav-toggle").on("click", function () {
    const $parent = $(this).closest(".mobile-nav-item");
    const wasActive = $parent.hasClass("active");

    $(".mobile-nav-item").removeClass("active");

    if (!wasActive) {
      $parent.addClass("active");
    }
  });

  // ========================================
  // ACCORDION (Orange Section)
  // ========================================

  /**
   * Custom accordion functionality
   */
  $(".accordion-button-custom").on("click", function () {
    const accordionId = $(this).data("accordion");
    const $button = $(this);
    const $content = $("#" + accordionId);
    const $wrapper = $content.find(".accordion-content-wrapper");
    const wasActive = $button.hasClass("active");

    // Close all other accordions
    $(".accordion-button-custom").not($button).removeClass("active");
    $(".accordion-content-custom")
      .not($content)
      .each(function () {
        $(this).css("max-height", "0").removeClass("active");
      });

    // Toggle clicked accordion
    if (wasActive) {
      $button.removeClass("active");
      $content.css("max-height", "0").removeClass("active");
    } else {
      $button.addClass("active");
      const wrapperHeight = $wrapper.outerHeight(true);
      $content.css("max-height", wrapperHeight + "px").addClass("active");
    }
  });

  // ========================================
  // FOOTER
  // ========================================

  /**
   * Footer menu accordion
   */
  $(".footer-menu-toggle").on("click", function () {
    const $parent = $(this).closest(".footer-menu-item");
    const wasActive = $parent.hasClass("active");

    $(".footer-menu-item").removeClass("active");

    if (!wasActive) {
      $parent.addClass("active");
    }
  });

  /**
   * Footer phone button reveal
   */
  $(".footer-phone-btn")
    .not(".revealed")
    .on("click", function () {
      $(this).hide();
      $(this).siblings(".footer-phone-btn.revealed").addClass("active");
    });

  /**
   * Set current year in footer
   */
  $(".current-year").text(new Date().getFullYear());

  /**
   * Jobs select chevron positioning
   * Positions chevron right after the selected text content
   */
  function positionChevron($select) {
    const $wrapper = $select.closest(
      ".jobs-search-select-wrapper, .form-select-wrapper"
    );
    const $chevron = $wrapper.find(".jobs-search-chevron");

    // Create a temporary element to measure text width
    const $temp = $("<span>")
      .css({
        visibility: "hidden",
        position: "absolute",
        whiteSpace: "nowrap",
        fontFamily: $select.css("font-family"),
        fontSize: $select.css("font-size"),
        fontWeight: $select.css("font-weight"),
      })
      .text($select.val() || $select.find("option:first").text())
      .appendTo("body");

    const textWidth = $temp.outerWidth();
    $temp.remove();

    // Get select's actual left padding dynamically
    const selectPadding = parseInt($select.css("padding-left"), 10) || 0;
    const chevronLeft = selectPadding + textWidth + 8; // padding + text + gap
    $chevron.css({
      position: "absolute",
      left: chevronLeft + "px",
    });
  }

  // Position chevrons on load
  $(".jobs-search-select").each(function () {
    positionChevron($(this));
  });

  // Reposition chevron on change
  $(".jobs-search-select").on("change", function () {
    positionChevron($(this));
  });

  // Position form select chevrons on load
  $(".form-select-wrapper select").each(function () {
    positionChevron($(this));
  });

  // Reposition form select chevron on change
  $(".form-select-wrapper select").on("change", function () {
    positionChevron($(this));
  });

  // Robust Marquee Implementation
  function initializeMarquee() {
    var $marqueeTrack = $(".marquee-track");

    // Check if marquee exists on this page
    if ($marqueeTrack.length === 0) {
      return;
    }

    // Get original items (only direct children that haven't been cloned)
    var $marqueeItems = $marqueeTrack.find(".marquee-item");

    // Verify we have items to clone
    if ($marqueeItems.length === 0) {
      console.warn("No marquee items found to clone");
      return;
    }

    // Check if already initialized (items already cloned)
    if ($marqueeTrack.data("marquee-initialized")) {
      return;
    }

    // Clone items multiple times for seamless infinite scrolling
    // We need enough clones to ensure smooth continuous animation
    var cloneCount = 10;

    // Store the original items
    var originalItems = $marqueeItems.clone();

    // Clone and append items
    for (let i = 0; i < cloneCount; i++) {
      originalItems.clone().appendTo($marqueeTrack);
    }

    // Mark as initialized
    $marqueeTrack.data("marquee-initialized", true);

    // Force reflow to ensure animation starts properly
    $marqueeTrack[0].offsetHeight;

    // Add class to start animation
    $marqueeTrack.addClass("marquee-active");
  }

  // Initialize marquee on page load
  initializeMarquee();

  // Re-initialize if window is resized (handles orientation changes on mobile)
  var resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Check if marquee needs re-initialization
      var $marqueeTrack = $(".marquee-track");
      if (
        $marqueeTrack.length > 0 &&
        !$marqueeTrack.data("marquee-initialized")
      ) {
        initializeMarquee();
      }
    }, 250);
  });

  // Handle visibility change - pause animation when page is hidden
  document.addEventListener("visibilitychange", function () {
    var $marqueeTrack = $(".marquee-track");
    if (document.hidden) {
      $marqueeTrack.css("animation-play-state", "paused");
    } else {
      $marqueeTrack.css("animation-play-state", "running");
    }
  });

  // ========================================
  // HERO VIDEO SCROLL BEHAVIOR (INDEX-2)
  // ========================================
  var videoBackground = document.getElementById("heroVideoBackground");

  if (videoBackground) {
    function handleHeroVideoScroll() {
      var scrollY = window.scrollY;
      var threshold = window.innerHeight * 0.9;

      // Fade out effect
      if (scrollY >= threshold) {
        videoBackground.style.opacity = "0";
      } else {
        videoBackground.style.opacity = "1";
      }

      // Parallax effect - video moves up as we scroll down (very subtle)
      var parallaxOffset = scrollY * -0.3;
      videoBackground.style.transform = "translateY(" + parallaxOffset + "px)";
    }

    window.addEventListener("scroll", handleHeroVideoScroll);
  }

  // ========================================
  // RENTAL SOLUTIONS CARDS (INDEX-2)
  // ========================================
  var rentalCards = document.querySelectorAll(".rental-card");

  if (rentalCards.length > 0) {
    rentalCards.forEach(function (card) {
      // Handle click on mobile/tablet
      card.addEventListener("click", function (e) {
        // Only on mobile/tablet (below 1200px)
        if (window.innerWidth < 1200) {
          // Don't toggle if clicking the link
          if (e.target.classList.contains("rental-card-overlay-btn")) {
            return;
          }
          e.preventDefault();
          card.classList.toggle("active");
        }
      });

      // Prevent link click from closing the overlay on mobile
      var link = card.querySelector(".rental-card-overlay-btn");
      if (link) {
        link.addEventListener("click", function (e) {
          e.stopPropagation();
        });
      }
    });

    // Close active cards when clicking outside
    document.addEventListener("click", function (e) {
      if (window.innerWidth < 1200) {
        var clickedCard = e.target.closest(".rental-card");
        if (!clickedCard) {
          rentalCards.forEach(function (card) {
            card.classList.remove("active");
          });
        }
      }
    });
  }

  // ========================================
  // KIWI HERITAGE VIDEO PARALLAX (INDEX-2)
  // ========================================
  var kiwiHeritageVideo = document.getElementById("kiwiHeritageVideo");

  if (kiwiHeritageVideo) {
    var kiwiSection = document.querySelector(".kiwi-heritage-section");

    function handleKiwiVideoScroll() {
      var rect = kiwiSection.getBoundingClientRect();
      var scrollY = window.scrollY;
      var sectionTop = kiwiSection.offsetTop;

      // Only apply parallax when section is in viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Calculate parallax offset relative to section position
        var relativeScroll = scrollY - sectionTop + window.innerHeight;
        var parallaxOffset = relativeScroll * 0.1;

        // Limit parallax range to prevent black bars (tighter limits)
        var maxOffset = kiwiSection.offsetHeight * 0.25;
        parallaxOffset = Math.max(-maxOffset, Math.min(maxOffset, parallaxOffset));

        kiwiHeritageVideo.style.transform = "translateY(" + parallaxOffset + "px)";
      }
    }

    window.addEventListener("scroll", handleKiwiVideoScroll);
    // Initial call
    handleKiwiVideoScroll();
  }

  // ========================================
  // LATEST NEWS CAROUSEL (INDEX-2)
  // ========================================
  var newsCarousel = document.getElementById("newsCarousel");

  if (newsCarousel) {
    var prevBtnDesktop = document.getElementById("newsCarouselPrev");
    var nextBtnDesktop = document.getElementById("newsCarouselNext");
    var prevBtnMobile = document.getElementById("newsCarouselPrevMobile");
    var nextBtnMobile = document.getElementById("newsCarouselNextMobile");

    function scrollCarousel(direction) {
      var scrollAmount = 0;
      var cardWidth = newsCarousel.querySelector(".latest-news-card").offsetWidth;
      var gap = window.innerWidth >= 1200 ? 50 : 20; // 3.125rem = 50px, 1.25rem = 20px

      if (window.innerWidth < 768) {
        // Mobile: scroll by 75% of container
        scrollAmount = newsCarousel.offsetWidth * 0.75;
      } else if (window.innerWidth < 1024) {
        // Tablet: scroll by 50% of container
        scrollAmount = newsCarousel.offsetWidth * 0.5;
      } else if (window.innerWidth < 1200) {
        // Small desktop: scroll by 33.333% of container
        scrollAmount = newsCarousel.offsetWidth * 0.33333;
      } else {
        // Large desktop: scroll by card width + gap
        scrollAmount = cardWidth + gap;
      }

      if (direction === "next") {
        newsCarousel.scrollLeft += scrollAmount;
      } else {
        newsCarousel.scrollLeft -= scrollAmount;
      }
    }

    // Desktop controls
    if (prevBtnDesktop) {
      prevBtnDesktop.addEventListener("click", function () {
        scrollCarousel("prev");
      });
    }

    if (nextBtnDesktop) {
      nextBtnDesktop.addEventListener("click", function () {
        scrollCarousel("next");
      });
    }

    // Mobile controls
    if (prevBtnMobile) {
      prevBtnMobile.addEventListener("click", function () {
        scrollCarousel("prev");
      });
    }

    if (nextBtnMobile) {
      nextBtnMobile.addEventListener("click", function () {
        scrollCarousel("next");
      });
    }
  }

  // Client Testimonials Carousel
  var testimonialsCarousel = document.getElementById("testimonialsCarousel");
  if (testimonialsCarousel) {
    var currentSlide = 0;
    var slides = testimonialsCarousel.querySelectorAll(".testimonial-item");
    var dots = document.querySelectorAll(".testimonials-dot");
    var totalSlides = slides.length;
    var autoplayInterval;
    var autoplayDelay = 4000;

    function goToSlide(index) {
      if (index < 0) {
        currentSlide = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }

      testimonialsCarousel.style.transform =
        "translateX(-" + currentSlide * 100 + "%)";

      // Update dots
      dots.forEach(function (dot, i) {
        if (i === currentSlide) {
          dot.classList.add("testimonials-dot-active");
        } else {
          dot.classList.remove("testimonials-dot-active");
        }
      });
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Dot click handlers
    dots.forEach(function (dot, index) {
      dot.addEventListener("click", function () {
        goToSlide(index);
        resetAutoplay();
      });
    });

    // Start autoplay
    startAutoplay();

    // Pause on hover (desktop only)
    if (window.innerWidth >= 1200) {
      testimonialsCarousel.addEventListener("mouseenter", stopAutoplay);
      testimonialsCarousel.addEventListener("mouseleave", startAutoplay);
    }
  }
});
