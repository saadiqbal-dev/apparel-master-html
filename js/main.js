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
        "active",
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
    },
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
      ".jobs-search-select-wrapper, .form-select-wrapper",
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

      // Parallax effect - video moves slower than scroll (very subtle)
      var parallaxOffset = scrollY * 0.15;
      videoBackground.style.transform = "translateY(" + parallaxOffset + "px)";
    }

    window.addEventListener("scroll", handleHeroVideoScroll);
  }
});
