# Apparel Master - HTML Header

This is a recreation of the React header component using vanilla HTML, CSS, jQuery, and Bootstrap 5.

## Files

- **index.html** - Main HTML structure
- **style.css** - Custom CSS with nested selectors (using simple class names)
- **script.js** - jQuery for interactions

## Technologies Used

- **Bootstrap 5.3.2** (latest stable version)
- **jQuery 3.7.1** (latest version)
- **Google Fonts** (Inter font family)
- **Custom CSS** (only where needed)

## Features

### Desktop Header
- Fixed position header that changes from transparent gradient to white on scroll
- Logo that links to homepage
- Navigation with:
  - Regular links (Find an Outlet, Client Tools)
  - Mega menu buttons (Services, About)
  - Hover underline animation
- "Get a Quote" CTA button
- Phone button that reveals number on click

### Mega Menus
- Services mega menu with 5 columns (Workwear, Workplace, Food Industry, Hospitality, PPE)
- About mega menu with About Us and Client Tools sections
- CTA cards at the bottom of each mega menu
- Click outside or press Escape to close
- Smooth slide-down animation

### Mobile Menu
- Hamburger menu button
- Full-screen mobile menu overlay
- Accordion-style navigation items
- Smooth expand/collapse animations
- Body scroll lock when menu is open

## CSS Approach

As requested, I used:
- **Simple class names** (e.g., `.header`, `.nav-list`, `.megamenu`) instead of BEM notation
- **Nested selectors** to style child elements (e.g., `.nav-list li`, `.megamenu-column ul`)
- **Bootstrap classes** where possible to minimize custom CSS
- **Custom CSS only where needed** for specific designs

## How to Use

1. Open `index.html` in a browser
2. Scroll down to see the header change from transparent to white
3. Click "Services" or "About" to open mega menus
4. Click "Click for 0800 Number" to reveal the phone number
5. Resize to mobile view to test the mobile menu

## Image Path

Make sure the logo image exists at:
```
public/images/apparel-master-logo.png
```

If your path is different, update the image `src` attributes in the HTML.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with Bootstrap 5 polyfills)
- Mobile browsers (iOS Safari, Chrome Android)
