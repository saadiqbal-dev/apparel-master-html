/**
 * ========================================
 * APPARELMASTER - MAIN JAVASCRIPT
 * ========================================
 * Optimized jQuery-based implementation
 * ========================================
 */

$(document).ready(function () {
  "use strict";

  // ========================================
  // CONFIGURATION & UTILITIES
  // ========================================

  /**
   * Breakpoint configuration
   */
  var BREAKPOINTS = {
    mobile: 768,
    tablet: 1024,
    desktop: 1200,
  };

  /**
   * Cache window object for better performance
   */
  var $window = $(window);
  var $document = $(document);

  /**
   * Utility: Check if viewport is mobile
   */
  function isMobile() {
    return $window.width() < BREAKPOINTS.desktop;
  }

  /**
   * Utility: Check if viewport is desktop
   */
  function isDesktop() {
    return $window.width() >= BREAKPOINTS.desktop;
  }

  /**
   * Utility: Get viewport dimensions
   */
  function getViewport() {
    return {
      width: $window.width(),
      height: $window.height(),
    };
  }

  // ========================================
  // CACHED SELECTORS
  // ========================================

  var $header = $(".header");
  var $mobileNavOverlay = $(".mobile-nav-overlay");
  var $body = $("body");

  // ========================================
  // HEADER & NAVIGATION
  // ========================================

  /**
   * Header scroll behavior
   * Adds 'scrolled' class when page is scrolled
   */
  function updateHeaderScroll() {
    if ($window.scrollTop() > 0) {
      $header.addClass("scrolled");
    } else {
      $header.removeClass("scrolled");
    }
  }

  // Initialize on load and update on scroll
  updateHeaderScroll();
  $window.on("scroll", updateHeaderScroll);

  /**
   * Phone button reveal (Header)
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

  var activeMegaMenu = null;

  /**
   * Close mega menu
   */
  function closeMegaMenu() {
    if (activeMegaMenu) {
      $("#megamenu-" + activeMegaMenu).removeClass("active");
      $('.nav-btn[data-megamenu="' + activeMegaMenu + '"]').removeClass(
        "active",
      );
      activeMegaMenu = null;
      $header.removeClass("menu-open");
    }
  }

  /**
   * Mega menu toggle
   */
  $(".nav-btn").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var menuId = $(this).data("megamenu");
    var $megamenu = $("#megamenu-" + menuId);

    if (activeMegaMenu === menuId) {
      closeMegaMenu();
    } else {
      closeMegaMenu();
      activeMegaMenu = menuId;
      $megamenu.addClass("active");
      $('.nav-btn[data-megamenu="' + menuId + '"]').addClass("active");
      $header.addClass("menu-open");
    }
  });

  /**
   * Close mega menu on outside click
   */
  $document.on("mousedown", function (e) {
    if (activeMegaMenu) {
      var $target = $(e.target);
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
  $document.on("keydown", function (e) {
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
   * Open mobile menu
   */
  $(".mobile-menu-btn").on("click", function () {
    $mobileNavOverlay.addClass("active");
    $body.css("overflow", "hidden");
  });

  /**
   * Close mobile menu
   */
  $(".mobile-nav-close, .mobile-nav-header a, .mobile-nav-submenu a").on(
    "click",
    function () {
      $mobileNavOverlay.removeClass("active");
      $body.css("overflow", "");
    },
  );

  /**
   * Mobile menu accordion
   */
  $(".mobile-nav-toggle").on("click", function () {
    var $parent = $(this).closest(".mobile-nav-item");
    var wasActive = $parent.hasClass("active");

    $(".mobile-nav-item").removeClass("active");

    if (!wasActive) {
      $parent.addClass("active");
    }
  });

  // ========================================
  // ACCORDIONS
  // ========================================

  /**
   * Custom accordion functionality (Orange Section)
   */
  $(".accordion-button-custom").on("click", function () {
    var accordionId = $(this).data("accordion");
    var $button = $(this);
    var $content = $("#" + accordionId);
    var $wrapper = $content.find(".accordion-content-wrapper");
    var wasActive = $button.hasClass("active");

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
      var wrapperHeight = $wrapper.outerHeight(true);
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
    var $parent = $(this).closest(".footer-menu-item");
    var wasActive = $parent.hasClass("active");

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

  // ========================================
  // FORM SELECT CHEVRON POSITIONING
  // ========================================

  /**
   * Position chevron right after the selected text content
   */
  function positionChevron($select) {
    var $wrapper = $select.closest(
      ".jobs-search-select-wrapper, .form-select-wrapper",
    );
    var $chevron = $wrapper.find(".jobs-search-chevron");

    // Create temporary element to measure text width
    var $temp = $("<span>")
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

    var textWidth = $temp.outerWidth();
    $temp.remove();

    // Get select's padding and calculate chevron position
    var selectPadding = parseInt($select.css("padding-left"), 10) || 0;
    var chevronLeft = selectPadding + textWidth + 28;
    $chevron.css({
      position: "absolute",
      left: chevronLeft + "px",
    });
  }

  // Initialize chevron positions
  $(".jobs-search-select, .form-select-wrapper select").each(function () {
    positionChevron($(this));
  });

  // Update on change
  $(".jobs-search-select, .form-select-wrapper select").on(
    "change",
    function () {
      positionChevron($(this));
    },
  );

  // ========================================
  // MARQUEE / CAROUSEL IMPLEMENTATION
  // ========================================

  /**
   * Initialize marquee for seamless infinite scrolling
   */
  function initializeMarquee() {
    var $marqueeTrack = $(".marquee-track");

    if (!$marqueeTrack.length) return;

    var $marqueeItems = $marqueeTrack.find(".marquee-item");

    if (!$marqueeItems.length) {
      console.warn("No marquee items found to clone");
      return;
    }

    if ($marqueeTrack.data("marquee-initialized")) return;

    // Clone items for seamless infinite scrolling
    var cloneCount = 10;
    var originalItems = $marqueeItems.clone();

    for (var i = 0; i < cloneCount; i++) {
      originalItems.clone().appendTo($marqueeTrack);
    }

    $marqueeTrack.data("marquee-initialized", true);

    // Force reflow and start animation
    $marqueeTrack[0].offsetHeight;
    $marqueeTrack.addClass("marquee-active");
  }

  initializeMarquee();

  // Re-initialize on window resize
  var resizeTimer;
  $window.on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var $marqueeTrack = $(".marquee-track");
      if ($marqueeTrack.length && !$marqueeTrack.data("marquee-initialized")) {
        initializeMarquee();
      }
    }, 250);
  });

  // Pause animation when page is hidden
  $document.on("visibilitychange", function () {
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

  var $videoBackground = $("#heroVideoBackground");

  if ($videoBackground.length) {
    var $iframe = $videoBackground.find("iframe");

    /**
     * Size video properly based on viewport aspect ratio
     */
    function sizeHeroVideo() {
      if (!$iframe.length) return;

      var viewport = getViewport();
      var viewportAspect = viewport.width / viewport.height;
      var videoAspect = 16 / 9;
      var parallaxBuffer = 1.2;

      if (viewportAspect > videoAspect) {
        // Viewport is wider than video - anchor to height
        $iframe.css({
          height: viewport.height * parallaxBuffer + "px",
          width: viewport.height * parallaxBuffer * videoAspect + "px",
          minWidth: "unset",
          minHeight: "unset",
        });
      } else {
        // Viewport is taller than video - anchor to width
        $iframe.css({
          width: viewport.width * parallaxBuffer + "px",
          height: (viewport.width * parallaxBuffer) / videoAspect + "px",
          minWidth: "unset",
          minHeight: "unset",
        });
      }
    }

    /**
     * Handle hero video scroll effects
     */
    function handleHeroVideoScroll() {
      var $heroSection = $(".hero-video-section");
      var $heroContent = $(".hero-video-content");

      if (!$heroSection.length) return;

      var rect = $heroSection[0].getBoundingClientRect();
      var viewport = getViewport();
      var scrollY = $window.scrollTop();
      var threshold = viewport.height * 0.9;

      // Fade out effect
      $videoBackground.css("opacity", scrollY >= threshold ? "0" : "1");

      // Parallax effect - only when section is in viewport
      if (rect.bottom > 0 && rect.top < viewport.height) {
        var progress =
          (viewport.height - rect.top) / (viewport.height + rect.height);
        var mobile = isMobile();
        var maxMove = rect.height * (mobile ? 0.35 : 0.25);
        var translateY = (progress - 0.5) * maxMove;

        // Apply parallax to video
        if ($iframe.length) {
          $iframe.css(
            "transform",
            "translate(-50%, calc(-50% + " + translateY + "px))",
          );
        }

        // Apply parallax to text content
        if ($heroContent.length) {
          var textMaxMove = rect.height * (mobile ? 0.5 : 0.35);
          var textTranslateY = (progress - 0.5) * textMaxMove;
          $heroContent.css("transform", "translateY(" + textTranslateY + "px)");
        }
      }
    }

    // Initialize
    sizeHeroVideo();
    handleHeroVideoScroll();

    // Optimize scroll with requestAnimationFrame
    var heroTicking = false;
    $window.on("scroll", function () {
      if (!heroTicking) {
        requestAnimationFrame(function () {
          handleHeroVideoScroll();
          heroTicking = false;
        });
        heroTicking = true;
      }
    });

    $window.on("resize", function () {
      sizeHeroVideo();
      handleHeroVideoScroll();
    });
  }

  // ========================================
  // RENTAL SOLUTIONS CARDS (INDEX-2)
  // ========================================

  var $rentalCards = $(".rental-card");

  if ($rentalCards.length) {
    $rentalCards.each(function () {
      var $card = $(this);

      // Handle click on mobile/tablet
      $card.on("click", function (e) {
        if (isMobile()) {
          // Don't toggle if clicking the link
          if ($(e.target).hasClass("rental-card-overlay-btn")) return;

          e.preventDefault();
          $card.toggleClass("active");
        }
      });

      // Prevent link click from closing overlay
      var $link = $card.find(".rental-card-overlay-btn");
      if ($link.length) {
        $link.on("click", function (e) {
          e.stopPropagation();
        });
      }
    });

    // Close active cards when clicking outside
    $document.on("click", function (e) {
      if (isMobile()) {
        var $clickedCard = $(e.target).closest(".rental-card");
        if (!$clickedCard.length) {
          $rentalCards.removeClass("active");
        }
      }
    });
  }

  // ========================================
  // KIWI HERITAGE VIDEO PARALLAX (INDEX-2)
  // ========================================

  var $kiwiHeritageVideo = $("#kiwiHeritageVideo");

  if ($kiwiHeritageVideo.length) {
    var $kiwiSection = $(".kiwi-heritage-section");

    /**
     * Handle Kiwi Heritage video parallax effect
     */
    function handleKiwiParallax() {
      if (!$kiwiSection.length) return;

      var rect = $kiwiSection[0].getBoundingClientRect();
      var viewport = getViewport();

      // Only apply when section is in viewport
      if (rect.bottom > 0 && rect.top < viewport.height) {
        var progress =
          (viewport.height - rect.top) / (viewport.height + rect.height);
        var mobile = isMobile();
        var maxMove = rect.height * (mobile ? 0.35 : 0.25);
        var translateY = (progress - 0.5) * maxMove;

        $kiwiHeritageVideo.css("transform", "translateY(" + translateY + "px)");
      }
    }

    // Optimize with requestAnimationFrame
    var kiwiTicking = false;
    $window.on("scroll", function () {
      if (!kiwiTicking) {
        requestAnimationFrame(function () {
          handleKiwiParallax();
          kiwiTicking = false;
        });
        kiwiTicking = true;
      }
    });

    handleKiwiParallax();
  }

  // ========================================
  // LATEST NEWS CAROUSEL
  // ========================================

  var $newsCarousel = $("#newsCarousel");

  if ($newsCarousel.length) {
    var newsTrack = $newsCarousel[0];

    // Scroll by one card (card width + flex gap) per arrow click.
    function newsScrollStep() {
      var $card = $newsCarousel.children(".latest-news-card").first();
      if (!$card.length) return newsTrack.clientWidth;
      var gap = parseFloat($newsCarousel.css("column-gap")) || 0;
      return $card.outerWidth() + gap;
    }

    // Both desktop and mobile arrow pairs share these handlers.
    $("#newsCarouselNext, #newsCarouselNextMobile").on("click", function () {
      newsTrack.scrollBy({ left: newsScrollStep(), behavior: "smooth" });
    });

    $("#newsCarouselPrev, #newsCarouselPrevMobile").on("click", function () {
      newsTrack.scrollBy({ left: -newsScrollStep(), behavior: "smooth" });
    });
  }

  // ========================================
  // CLIENT TESTIMONIALS CAROUSEL
  // ========================================

  var $testimonialsCarousel = $("#testimonialsCarousel");

  if ($testimonialsCarousel.length) {
    var currentSlide = 0;
    // Only get direct children to avoid nested testimonial-items
    var $slides = $testimonialsCarousel.children(".testimonial-item");
    var $pagination = $(".testimonials-pagination");
    var totalSlides = $slides.length;
    var autoplayInterval;
    var autoplayDelay = 4000;

    // Dynamically generate dots based on number of slides
    if ($pagination.length && totalSlides > 0) {
      $pagination.empty();
      for (var i = 0; i < totalSlides; i++) {
        var activeClass = i === 0 ? " testimonials-dot-active" : "";
        $pagination.append(
          '<span class="testimonials-dot' +
            activeClass +
            '" data-slide="' +
            i +
            '"></span>',
        );
      }
    }

    // Get the dynamically created dots
    var $dots = $(".testimonials-dot");

    /**
     * Navigate to specific slide
     */
    function goToSlide(index) {
      if (index < 0) {
        currentSlide = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }

      $testimonialsCarousel.css(
        "transform",
        "translateX(-" + currentSlide * 100 + "%)",
      );

      // Update dots
      $dots.each(function (i) {
        if (i === currentSlide) {
          $(this).addClass("testimonials-dot-active");
        } else {
          $(this).removeClass("testimonials-dot-active");
        }
      });
    }

    /**
     * Move to next slide
     */
    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    /**
     * Start autoplay
     */
    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }

    /**
     * Stop autoplay
     */
    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    }

    /**
     * Reset autoplay timer
     */
    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Dot click handlers (using event delegation for dynamically created dots)
    $pagination.on("click", ".testimonials-dot", function () {
      var index = $(this).index();
      goToSlide(index);
      resetAutoplay();
    });

    // Start autoplay
    startAutoplay();

    // Pause on hover (desktop only)
    if (isDesktop()) {
      $testimonialsCarousel.on("mouseenter", stopAutoplay);
      $testimonialsCarousel.on("mouseleave", startAutoplay);
    }
  }

  // ========================================
  // IMAGE CAROUSEL (ASSURE QUALITY PAGE)
  // ========================================

  var $imgCarousel = $("#imgCarousel");

  if ($imgCarousel.length) {
    var $prevBtn = $("#imgCarouselPrev");
    var $nextBtn = $("#imgCarouselNext");

    /**
     * Scroll image carousel in specified direction
     * @param {string} direction - "next" or "prev"
     */
    function scrollImgCarousel(direction) {
      // Scroll by full carousel width (one image at a time) using jQuery
      var scrollAmount = $imgCarousel.width();
      var currentScroll = $imgCarousel.scrollLeft();
      var newScroll;

      if (direction === "next") {
        newScroll = currentScroll + scrollAmount;
      } else {
        newScroll = currentScroll - scrollAmount;
      }

      // Use jQuery animate for smooth scrolling
      $imgCarousel.animate(
        {
          scrollLeft: newScroll,
        },
        300,
      );
    }

    // Button click handlers using jQuery
    $prevBtn.on("click", function () {
      scrollImgCarousel("prev");
    });

    $nextBtn.on("click", function () {
      scrollImgCarousel("next");
    });
  }
});

// ========================================
// FAQ ACCORDION
// ========================================

/**
 * Initialize FAQ Accordion with smooth transitions
 */
function initFaqAccordion() {
  var $faqItems = $(".faq-item");
  var animationDuration = 300;

  // Exit early if no FAQ items exist
  if (!$faqItems.length) {
    return;
  }

  // Handle FAQ question click (using event delegation for dynamic content)
  $(".faq-container, .faq-contain, .faq-container-base").on(
    "click",
    ".faq-question",
    function () {
      var $question = $(this);
      var $faqItem = $question.parent();
      var $answer = $faqItem.find(".faq-answer");
      var isActive = $faqItem.hasClass("active");

      // Close all other FAQ items with smooth animation
      $(".faq-item")
        .not($faqItem)
        .each(function () {
          var $item = $(this);
          if ($item.hasClass("active")) {
            $item.removeClass("active");
            $item.find(".faq-answer").slideUp(animationDuration);
          }
        });

      // Toggle current FAQ item with smooth animation
      if (isActive) {
        $faqItem.removeClass("active");
        $answer.slideUp(animationDuration);
      } else {
        $faqItem.addClass("active");
        $answer.slideDown(animationDuration, function () {
          // Set display to flex after animation completes for proper layout
          $(this).css("display", "flex");
        });
      }
    },
  );
}

// Initialize FAQ accordion
initFaqAccordion();

// ========================================
// REGION-BASED BRANCH FILTERING
// ========================================

/**
 * Filter branch dropdown based on selected region
 */
var $regionSelect = $("#region");
var $branchSelect = $("#branch");

if ($regionSelect.length && $branchSelect.length) {
  // Store all branch options on page load
  var allBranchOptions = $branchSelect.find("option").clone();

  // Handle region change
  $regionSelect.on("change", function () {
    var selectedRegion = $(this).val();

    // Clear current branch options except the first (placeholder)
    $branchSelect.find("option:not(:first)").remove();

    if (selectedRegion) {
      // Filter and add matching branch options
      allBranchOptions.each(function () {
        var $option = $(this);
        var optionRegion = $option.data("region");

        // Add option if it matches the selected region or is the placeholder
        if (optionRegion === selectedRegion || $option.val() === "") {
          $branchSelect.append($option.clone());
        }
      });

      // Update placeholder text
      $branchSelect.find("option:first").text("Select Branch*");
    } else {
      // If no region selected, show placeholder message
      $branchSelect.find("option:first").text("Select Region First*");
    }

    // Reset branch selection
    $branchSelect.val("");
  });

  // Trigger change on page load to set initial state
  $regionSelect.trigger("change");
}

// ========================================
// HERO VIDEO POSTER FADE OUT
// ========================================

function initHeroVideoFade(posterId, iframeId) {
  var $poster = $("#" + posterId),
    $iframe = $("#" + iframeId);
  if (!$poster.length || !$iframe.length) return;

  $(window).on("load", function () {
    setTimeout(function () {
      $iframe.attr("src", $iframe.attr("data-src"));
      function reveal() {
        $iframe.addClass("video-loaded"); // fade video in, then poster out (no black gap)
        setTimeout(function () {
          $poster.addClass("fade-out");
        }, 300);
      }
      setTimeout(reveal, 8000); // fallback if Vimeo never reports playback
      try {
        var p = new Vimeo.Player($iframe[0]);
        p.on("timeupdate", function (d) {
          if (d.seconds >= 0.1) (p.off("timeupdate"), reveal()); // a few frames in
        });
      } catch (e) {}
    }, 2000); // let the page render before loading the video
  });
}
initHeroVideoFade("heroPoster", "heroVideoIframe");

// ========================================
// KIWI HERITAGE VIDEO POSTER FADE OUT
// ========================================

initHeroVideoFade("kiwiHeritagePoster", "kiwiHeritageIframe");
