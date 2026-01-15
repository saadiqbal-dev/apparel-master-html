# Claude Code Reference - Apparel Master HTML

## Unified Class System

This document tracks the unified class structure created for cleaner, backend-friendly HTML.

---

## First Content Section (FC)

**Location in CSS:** `/css/main.css` lines 2445-2580

**Purpose:** Unified classes for the first content section that appears after hero/breadcrumb. This section typically has an image on the left and content with an orange bar on the right.

### Old Classes → New Classes Mapping

| Old Classes | New Class | Description |
|------------|-----------|-------------|
| `content-section py-5 content-section-last` | `fc-section` | Section wrapper with all padding |
| `container content-container` | `fc-container` | Container with responsive padding |
| `content-image-col` | `fc-img-col` | Image column wrapper |
| `content-image` | `fc-img` | Image element with aspect ratios |
| `content-text-col` | `fc-text-col` | Text column wrapper |
| `content-text` | `fc-text` | Text content wrapper |
| `content-bar` | `fc-bar` | Orange decorative bar |

### Complete Class Reference

#### `.fc-section`
**Merges:** `content-section` + `py-5` + `content-section-last`

**Styles:**
- Mobile: `padding-top: 1.5rem; padding-bottom: 56px;`
- Desktop (≥1200px): `padding-top: 50px; padding-bottom: 114px;`
- Row gutters: Mobile `54px`, Desktop `50px`

**Usage:**
```html
<section class="fc-section">
```

---

#### `.fc-container`
**Merges:** `container` + `content-container`

**Styles:**
- `max-width: 1720px`
- Mobile: `padding: 0 20px`
- Desktop (≥1200px): `padding: 0 40px`
- Wide (≥1920px): `padding: 0`

**Usage:**
```html
<div class="fc-container">
```

---

#### `.fc-img-col`
**Merges:** `content-image-col`

**Styles:**
- Mobile: `justify-content: flex-start`
- Desktop (≥1200px): `justify-content: center`

**Usage:**
```html
<div class="col-xl-6 d-flex align-items-center fc-img-col order-1 order-xl-0">
```

---

#### `.fc-img`
**Merges:** `content-image`

**Styles:**
- `width: 100%; height: auto; object-fit: cover;`
- Mobile: `aspect-ratio: 353 / 246`
- Desktop (≥1200px): `aspect-ratio: 835 / 580`

**Usage:**
```html
<img src="..." alt="..." class="img-fluid fc-img rounded-3" />
```

---

#### `.fc-text-col`
**Merges:** `content-text-col`

**Styles:**
- Mobile: `justify-content: flex-start`
- Desktop (≥1200px): `justify-content: center`

**Usage:**
```html
<div class="col-xl-6 d-flex align-items-center fc-text-col order-0 order-xl-1">
```

---

#### `.fc-text`
**Merges:** `content-text`

**Styles:**
- `text-align: left`
- Desktop (≥1200px): `max-width: 532px`
- Paragraph styles:
  - Mobile: `font-size: 18px; line-height: 26px; font-weight: 500`
  - Desktop: `font-size: 20px; line-height: 30px`
  - Font: Inter, sans-serif
  - Color: #000

**Usage:**
```html
<div class="fc-text">
  <div class="fc-bar mb-4"></div>
  <p>Content here...</p>
</div>
```

---

#### `.fc-bar`
**Merges:** `content-bar`

**Styles:**
- Mobile: `width: 55px; height: 3.71px`
- Desktop (≥1200px): `width: 100px; height: 6px`
- `background: #e9510e` (orange)

**Usage:**
```html
<div class="fc-bar mb-4"></div>
```

---

## Complete HTML Example

```html
<!-- First Content Section -->
<section class="fc-section">
  <div class="fc-container">
    <div class="row">
      <!-- Image Column (left on desktop) -->
      <div class="col-xl-6 d-flex align-items-center fc-img-col order-1 order-xl-0">
        <img
          src="public/images/about/about-1.png"
          alt="About Apparel Master"
          class="img-fluid fc-img rounded-3"
        />
      </div>

      <!-- Text Column (right on desktop) -->
      <div class="col-xl-6 d-flex align-items-center fc-text-col order-0 order-xl-1">
        <div class="fc-text">
          <div class="fc-bar mb-4"></div>
          <p>
            Your content text here...
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## Pages Using This Pattern

1. **about.html** (line 699) - ✅ Updated to new classes
2. **food-industry-workwear.html** (line 700) - ✅ Updated to new classes
3. **ppe.html** (line 703) - ✅ Updated to new classes
4. **workplace-floor-mats.html** (line 702) - ✅ Updated to new classes

**All 4 pages now use the unified FC class system!**

---

## Bootstrap Classes to Keep

Always keep these Bootstrap utility classes:
- `col-xl-6` - Column width (no need for col-12, mobile-first default)
- `d-flex` - Flexbox display
- `align-items-center` - Vertical centering
- `order-1 order-xl-0` - Image left on desktop
- `order-0 order-xl-1` - Text right on desktop
- `img-fluid` - Responsive image
- `rounded-3` - Border radius
- `mb-4` - Margin bottom (for orange bar)

---

## Notes

- **FC** stands for "First Content" (section after hero)
- All classes are single, unified classes with responsive behavior built-in
- No need for multiple custom classes on same element
- Original classes remain in CSS for backward compatibility with other pages
- This pattern appears on 4 pages total (excluding outlets, diamond-apparelmaster, and index)
