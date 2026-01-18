# AYOYA E-Commerce Responsive Design Tests

## Overview
Comprehensive Playwright test suite for responsive design testing across three viewport sizes.

**File:** `/home/claude-dev/qrcode/ayoya-ecommerce/tests/tests/public/responsive.spec.ts`

**Total Tests:** 18 tests (36 test instances across chromium and mobile profiles)

**Base URL:** https://ecom.ayoya.srv1164291.hstgr.cloud

---

## Test Breakdown

### Mobile 375px Tests (RESP-001 to RESP-009)
Tests for iPhone/small mobile device viewport (375x667)

| ID | Test | Purpose |
|----|------|---------|
| RESP-001 | Hamburger menu visible | Verify mobile menu button is shown |
| RESP-002 | Desktop menu hidden | Verify desktop nav is hidden on mobile |
| RESP-003 | Open/close mobile menu | Test menu toggle functionality |
| RESP-004 | Mobile menu links present | Verify navigation links exist in menu |
| RESP-005 | Navigation via mobile menu | Test link click navigation |
| RESP-006 | Hero responsive | Verify hero section scales to mobile width |
| RESP-007 | Form full width | Verify form inputs span mobile viewport |
| RESP-008 | Touch buttons min 44px | Verify buttons meet WCAG touch target size |
| RESP-009 | Spacing and padding | Verify proper mobile layout spacing |

### Tablet 768px Tests (RESP-010 to RESP-012)
Tests for tablet viewport (768x1024)

| ID | Test | Purpose |
|----|------|---------|
| RESP-010 | 2-column grid | Verify product grid uses 2 columns |
| RESP-011 | Adapted navigation | Verify navigation sizing for tablet |
| RESP-012 | Optimized images | Verify images load with proper dimensions |

### Desktop 1280px Tests (RESP-013 to RESP-018)
Tests for desktop viewport (1280x720)

| ID | Test | Purpose |
|----|------|---------|
| RESP-013 | Desktop nav visible | Verify desktop navigation is shown |
| RESP-014 | Hamburger hidden | Verify hamburger menu is hidden |
| RESP-015 | Full grid layout | Verify multi-column product grid |
| RESP-016 | Large hero image | Verify hero image for desktop display |
| RESP-017 | Footer columns | Verify footer displays in multiple columns |
| RESP-018 | Hover effects | Verify interactive hover states |

---

## Running Tests

### Run all responsive tests
```bash
npm run test:public -- responsive.spec.ts
```

### Run specific test by ID
```bash
npx playwright test --grep "RESP-001"
```

### Run mobile viewport tests only
```bash
npx playwright test --grep "Mobile 375px"
```

### Run tablet viewport tests only
```bash
npx playwright test --grep "Tablet 768px"
```

### Run desktop viewport tests only
```bash
npx playwright test --grep "Desktop 1280px"
```

### Run in UI mode (interactive)
```bash
npm run test:ui tests/public/responsive.spec.ts
```

### Generate HTML report
```bash
npm run report
```

---

## Test Features

- **Viewport Configuration**: Uses `test.use()` to set specific viewport sizes
- **CSS Detection**: Uses `window.getComputedStyle()` to verify responsive styles
- **DOM Measurement**: Uses `getBoundingClientRect()` to verify layout dimensions
- **Flexible Selectors**: Uses attribute and class pattern matching for robustness
- **Error Handling**: Graceful fallbacks for optional elements
- **DOM Traversal**: Counts elements and verifies grid configurations

---

## Selectors Used

### Navigation
- `button[aria-label="menu"]`
- `[class*="hamburger"]`
- `nav[class*="desktop"]`
- `[class*="mobile-menu"]`

### Content
- `section[class*="hero"]`
- `[class*="banner"]`
- `[class*="grid"]`
- `[class*="products"]`
- `footer`

### Forms
- `form`
- `input, textarea, select`

---

## Dependencies
- @playwright/test ^1.40.0
- Modern browser support (Chromium)

## Configuration
- Browser: Chromium
- Profiles: chromium, mobile (iPhone 13)
- Screenshots: On failure only
- Traces: On first retry
- Retries: 0 (local), 2 (CI)

