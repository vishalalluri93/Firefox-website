# Firefox Sports & Resorts — Website

A luxury, multi-page site for Firefox Sports & Resorts, Hyderabad.
Design direction: **"The Gilded Arbor"** — deep pine green + champagne gold, Cormorant Garamond display type, and a recurring arch (arbor/mandap) image frame.

## Pages
- `index.html` — Home
- `weddings.html` — Weddings & Events (star)
- `corporate.html` — Corporate & Team Outings (star)
- `sports.html` — Sports & Adventure
- `stay.html` — Stay & Dining
- `dayouts.html` — Day Outings & Camps
- `memberships.html` — Memberships
- `contact.html` — Contact & enquiry form
- `assets/styles.css`, `assets/script.js` — shared design system + interactions

## Preview it
Open `index.html` in any browser. (An internet connection loads the fonts.)

## 1. Add your photos
Every image slot is currently an elegant labelled placeholder. Each one tells you what photo goes there and the recommended size. To add a real photo, find the block like this:

```html
<div class="arch">
  <div class="ph">...placeholder...</div>
</div>
```

and replace the inner `<div class="ph">...</div>` with:

```html
<img src="assets/img/your-photo.jpg" alt="Short description of the photo">
```

Put your image files in an `assets/img/` folder. Keep the recommended aspect ratios (portrait 4:5, landscape ~16:9) so nothing gets awkwardly cropped. Compress large photos (aim for under ~400 KB each) so pages stay fast.

## 2. Make the enquiry form actually send
The form on `contact.html` is wired to the front end only right now. Two easy options with no server:
- **Formspree** (form-to-email): create a form at formspree.io and change the form tag to `<form id="enquiry" action="https://formspree.io/f/XXXX" method="POST">`, then remove the demo `preventDefault` block in `assets/script.js`.
- **WhatsApp**: replace the submit button with a link to `https://wa.me/919676716888` so enquiries land in WhatsApp.

## 3. Publish it
This is a plain static site, so hosting is simple and mostly free:
- **Netlify** or **Vercel** — drag the folder in, or connect a Git repo. (Netlify also gives you form handling for free.)
- **Cloudflare Pages** or **GitHub Pages** — same idea.
Point your `firefoxsar.com` domain at whichever host you choose.

## 4. Before going live — check these
- Confirm the acreage number on the home page (`40+`) and the "10+ sports" figure, or tell me the real numbers and I'll update them.
- Swap in your real logo if you have one (the current mark is a simple gold arch with an ember spark).
- Add a `favicon`, and I can generate Open Graph preview images for social sharing.
