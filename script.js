$(document).ready(function() {
    let activeMegaMenu = null;
    
    // Header scroll behavior
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 0) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });
    
    // Mega menu toggle
    $('.nav-btn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const menuId = $(this).data('megamenu');
        const $megamenu = $('#megamenu-' + menuId);
        
        if (activeMegaMenu === menuId) {
            // Close the current menu
            closeMegaMenu();
        } else {
            // Close any open menu first
            closeMegaMenu();
            
            // Open new menu
            activeMegaMenu = menuId;
            $megamenu.addClass('active');
            $('.nav-btn[data-megamenu="' + menuId + '"]').addClass('active');
            $('.header').addClass('menu-open');
        }
    });
    
    // Close mega menu function
    function closeMegaMenu() {
        if (activeMegaMenu) {
            $('#megamenu-' + activeMegaMenu).removeClass('active');
            $('.nav-btn[data-megamenu="' + activeMegaMenu + '"]').removeClass('active');
            activeMegaMenu = null;
            $('.header').removeClass('menu-open');
        }
    }
    
    // Close mega menu on outside click
    $(document).on('mousedown', function(e) {
        if (activeMegaMenu) {
            const $target = $(e.target);
            
            // Don't close if clicking on nav buttons or inside the mega menu
            if (!$target.closest('.nav-btn').length && 
                !$target.closest('.megamenu').length &&
                !$target.closest('nav').length) {
                closeMegaMenu();
            }
        }
    });
    
    // Close mega menu on Escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && activeMegaMenu) {
            closeMegaMenu();
        }
    });
    
    // Close mega menu when clicking nav links
    $('.nav-link, .megamenu a').on('click', function() {
        closeMegaMenu();
    });
    
    // Phone button reveal
    $('.phone-btn').not('.phone-revealed').on('click', function() {
        $(this).hide();
        $('.phone-revealed').show();
    });
    
    // Mobile menu open
    $('.mobile-menu-btn').on('click', function() {
        $('.mobile-menu').addClass('active');
        $('body').css('overflow', 'hidden');
    });
    
    // Mobile menu close
    $('.mobile-menu-close, .mobile-menu-header a, .mobile-submenu a').on('click', function() {
        $('.mobile-menu').removeClass('active');
        $('body').css('overflow', '');
    });
    
    // Mobile menu accordion
    $('.mobile-menu-toggle').on('click', function() {
        const $parent = $(this).closest('.mobile-menu-item');
        const wasActive = $parent.hasClass('active');
        
        // Close all items
        $('.mobile-menu-item').removeClass('active');
        
        // Open clicked item if it wasn't active
        if (!wasActive) {
            $parent.addClass('active');
        }
    });
});
