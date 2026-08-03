# Firefox Sports & Resorts — current site files

## What's in this folder
```
index.html        Home  (finished — real photos, all latest changes)
weddings.html     Weddings & Events  (finished — real photos, 2 labelled placeholders)
corporate.html    Corporate & Team Outings  (draft — placeholder images)
sports.html       Sports & Adventure  (draft — placeholder images)
hotel.html        Hotel  (draft — pool & rooftop dining removed)
dayouts.html      Day Outings & Camps  (draft — placeholder images)
contact.html      Contact & enquiry form  (draft)
assets/styles.css Shared design system (colours, type, layout, responsive)
assets/script.js  Nav, mobile menu, scroll reveals, form stub
assets/fonts/     Self-hosted Cormorant Garamond + Mulish (no Google Fonts dependency)
assets/img/       Photos + logo.png
```

## Recent changes included in this version
- **Logo** — final phoenix mark (`assets/img/logo.png`), header size 40×49px.
- **Header enlarged** — logo, "Firefox" wordmark, and nav links all bumped up slightly.
- **"SPORTS & RESORTS"** nudged up 2px under the wordmark.
- **Location line** — now larger + bold, reads "Moinabad · 20 km from Hyderabad" (was 30 km).
- **Ranga Reddy district** — removed everywhere (hero, footers, contact page).
- **15 acres** — stat and intro copy updated (was "40+").
- **Memberships page deleted**; removed from all navs and footers.
- **Stay → Hotel** — page renamed to `hotel.html`; pool and rooftop-dining content removed;
  amenities are now Rooms, Fitness centre, Wi-Fi.
- **Weddings page rebuilt** with real photos and the finished header/footer.
- **Mobile menu bug fixed** — the scrolled header's backdrop blur was trapping the slide-out
  menu inside the header bar. Blur moved to a pseudo-element; menu now fills the screen.

## 3 August 2026 — homepage, second pass

Eight changes, all scoped to `body.home`, so the other six pages are untouched.
Two files: `index.html` and `assets/band.css`.

- The "Moinabad · 20 km from Hyderabad" line drops from 16px to 12.5px, matching
  the paired-banner eyebrows, and now fits on one line at desktop (it wrapped to
  two). A bold weight was tried and reverted.
- Every button on the homepage is outline-only — same border, padding and 50px
  height across all ten. `btn-gold` and `btn-pine` were solid fills.
- Removed the "One address" eyebrow: it restated the heading directly beneath it.
- Removed the four paired-banner titles — "Wedding and events", "Corporate
  escapes", "Sport", "Stay". The headings already carry the meaning.
- The between-functions line is reworded to "our guests", folded into the
  heading above it, and "Sports, a pool and rooms." is deleted.
- The scrim on the four paired banners is lightened so the photographs read:
  top of band 10% veil instead of 20%, midpoint moved from 26% to 34% of height.

Measured with the glyphs hidden, 90th percentile, at 1440px and 390px:

| band      | before | after | contrast, ivory text |
|-----------|--------|-------|----------------------|
| weddings  | 104    |  82   | 5.1 -> 7.1 : 1       |
| corporate |  93    |  76   | 6.0 -> 7.8 : 1       |
| sport     |  88    |  75   | 6.6 -> 7.9 : 1       |
| stay      | 135    | 108   | 3.3 -> 4.8 : 1       |

The limit is the Stay band — `ht-suite.jpg` is a bright room whose lower half
sits where the body copy goes. This is the lightest of four gradients tested
that still clears WCAG AA (4.5:1) for the 16px copy; one step lighter measures
3.9:1 and fails. Replacing that photograph would let all four go lighter.

Verified: 8 pages x 2 viewports x JS on and off = 32 renders. Zero horizontal
overflow, zero console errors, zero page-originated 4xx, every image decodes,
nothing left invisible, zero rounded corners.

Noted, not fixed: the site has no favicon. And the eyebrows are inconsistent in
weight site-wide — `.hero p`, `.say p` and `.feature p` each set 300 and beat
`.eyebrow`'s 700 on specificity, while `.where` has no `p` rule and renders at
700. Evening that out is a theme-wide change.

## IMPORTANT if you're updating an existing GitHub repo
Uploading files does **not** delete old ones. You must manually delete these two, or they'll
remain live as orphaned pages:
- `stay.html`  (replaced by `hotel.html`)
- `memberships.html`  (removed entirely)

In GitHub: open the file → **⋯** menu → **Delete file** → Commit.

## Viewing it locally
Open `index.html` **from inside this folder**. The images, fonts and stylesheet all live in
`assets/`, so the folder must stay together — opening `index.html` on its own shows broken icons.

## Still outstanding
- Real **sports count** (the "10+ sports" figure is still an assumption).
- **Photos to add**: a clean convention-hall interior, a sangeet/reception moment,
  a grand wedding shot, a badminton/sports action shot, and hotel room photos.
- The corporate photo currently shows another company's event banners — worth replacing
  before launch.
- Enquiry form is front-end only; needs wiring to email or WhatsApp.
- Interior pages (Corporate, Sports, Hotel, Day Outings, Contact) still need building out
  to match Home and Weddings.
