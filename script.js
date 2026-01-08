$(document).ready(function () {
  let activeMegaMenu = null;

  // Header scroll behavior
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 0) {
      $(".header").addClass("scrolled");
    } else {
      $(".header").removeClass("scrolled");
    }
  });

  // Mega menu toggle
  $(".nav-btn").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const menuId = $(this).data("megamenu");
    const $megamenu = $("#megamenu-" + menuId);

    if (activeMegaMenu === menuId) {
      // Close the current menu
      closeMegaMenu();
    } else {
      // Close any open menu first
      closeMegaMenu();

      // Open new menu
      activeMegaMenu = menuId;
      $megamenu.addClass("active");
      $('.nav-btn[data-megamenu="' + menuId + '"]').addClass("active");
      $(".header").addClass("menu-open");
    }
  });

  // Close mega menu function
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

  // Close mega menu on outside click
  $(document).on("mousedown", function (e) {
    if (activeMegaMenu) {
      const $target = $(e.target);

      // Don't close if clicking on nav buttons or inside the mega menu
      if (
        !$target.closest(".nav-btn").length &&
        !$target.closest(".megamenu").length &&
        !$target.closest("nav").length
      ) {
        closeMegaMenu();
      }
    }
  });

  // Close mega menu on Escape key
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && activeMegaMenu) {
      closeMegaMenu();
    }
  });

  // Close mega menu when clicking nav links
  $(".nav-link, .megamenu a").on("click", function () {
    closeMegaMenu();
  });

  // Phone button reveal
  $(".phone-btn")
    .not(".phone-revealed")
    .on("click", function () {
      $(this).hide();
      $(".phone-revealed").show();
    });

  // Mobile menu open
  $(".mobile-menu-btn").on("click", function () {
    $(".mobile-menu").addClass("active");
    $("body").css("overflow", "hidden");
  });

  // Mobile menu close
  $(".mobile-menu-close, .mobile-menu-header a, .mobile-submenu a").on(
    "click",
    function () {
      $(".mobile-menu").removeClass("active");
      $("body").css("overflow", "");
    }
  );

  // Mobile menu accordion
  $(".mobile-menu-toggle").on("click", function () {
    const $parent = $(this).closest(".mobile-menu-item");
    const wasActive = $parent.hasClass("active");

    // Close all items
    $(".mobile-menu-item").removeClass("active");

    // Open clicked item if it wasn't active
    if (!wasActive) {
      $parent.addClass("active");
    }
  });

  // Custom accordion - completely rewritten
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
      // Close it
      $button.removeClass("active");
      $content.css("max-height", "0").removeClass("active");
    } else {
      // Open it
      $button.addClass("active");
      const wrapperHeight = $wrapper.outerHeight(true);
      $content.css("max-height", wrapperHeight + "px").addClass("active");
    }
  });

  // Footer menu accordion
  $(".footer-menu-toggle").on("click", function () {
    const $parent = $(this).closest(".footer-menu-item");
    const wasActive = $parent.hasClass("active");

    // Close all items
    $(".footer-menu-item").removeClass("active");

    // Open clicked item if it wasn't active
    if (!wasActive) {
      $parent.addClass("active");
    }
  });

  // Footer phone button reveal
  $(".footer-phone-btn")
    .not(".revealed")
    .on("click", function () {
      $(this).hide();
      $(this).siblings(".footer-phone-btn.revealed").addClass("active");
    });

  // Set current year in footer
  $(".current-year").text(new Date().getFullYear());
});
