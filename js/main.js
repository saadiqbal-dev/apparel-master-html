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
    $(".mobile-menu").addClass("active");
    $("body").css("overflow", "hidden");
  });

  /**
   * Mobile menu close
   */
  $(".mobile-menu-close, .mobile-menu-header a, .mobile-submenu a").on(
    "click",
    function () {
      $(".mobile-menu").removeClass("active");
      $("body").css("overflow", "");
    }
  );

  /**
   * Mobile menu accordion
   */
  $(".mobile-menu-toggle").on("click", function () {
    const $parent = $(this).closest(".mobile-menu-item");
    const wasActive = $parent.hasClass("active");

    $(".mobile-menu-item").removeClass("active");

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
});
