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
