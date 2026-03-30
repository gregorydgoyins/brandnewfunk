# Elevate Frame Group — Website Package

**Status:** Production-ready  
**Stack:** HTML5 · CSS3 · Vanilla JS · Chart.js · Vercel  
**Owner:** Gregory D. Goyins — Elevate Frame Group, Boynton Beach FL  
**Classification:** Disabled & minority veteran-owned small business

---

## File Structure

```
/
├── index.html              Home — wrapper / brand hub
├── studios.html            Studios division page
├── air.html                Air division page
├── academy.html            Academy division page
├── work.html               Portfolio / case studies
├── contact.html            Contact & division routing
├── business-plan.html      Full business plan (investor)
├── pitch.html              6-slide pitch package (investor)
├── vercel.json             Vercel deployment config
├── download-assets.py      Run once to pull all images locally
│
├── css/
│   └── style.css           Complete design system
│
├── js/
│   ├── main.js             Nav, animations, interactions
│   └── vendor/
│       └── chart.min.js    Chart.js 4.4.0 (run download-assets.py --chartjs)
│
└── images/
    ├── business-card.jpg           EFG premium business card (actual asset)
    ├── aerial-coastline-hero.svg   ← PLACEHOLDER — replace with real photo
    ├── studio-cinema-production.svg← PLACEHOLDER — replace with real photo
    ├── dji-inspire-drone.svg       ← PLACEHOLDER — replace with real photo
    ├── drone-mavic-flight.svg      ← PLACEHOLDER — replace with real photo
    ├── mini-drone-flight.svg       ← PLACEHOLDER — replace with real photo
    ├── fpv-drone.svg               ← PLACEHOLDER — replace with real photo
    ├── cinema-camera-closeup.svg   ← PLACEHOLDER — replace with real photo
    ├── cinema-gimbal-setup.svg     ← PLACEHOLDER — replace with real photo
    ├── led-lighting-setup.svg      ← PLACEHOLDER — replace with real photo
    ├── camera-lens.svg             ← PLACEHOLDER — replace with real photo
    ├── audio-equipment.svg         ← PLACEHOLDER — replace with real photo
    ├── tripod-support.svg          ← PLACEHOLDER — replace with real photo
    ├── south-florida-aerial.svg    ← PLACEHOLDER — replace with real photo
    ├── construction-site-aerial.svg← PLACEHOLDER — replace with real photo
    ├── agricultural-drone.svg      ← PLACEHOLDER — replace with real photo
    ├── team-training-session.svg   ← PLACEHOLDER — replace with real photo
    ├── classroom-instruction.svg   ← PLACEHOLDER — replace with real photo
    ├── workshop-training.svg       ← PLACEHOLDER — replace with real photo
    ├── film-production.svg         ← PLACEHOLDER — replace with real photo
    ├── office-interior.svg         ← PLACEHOLDER — replace with real photo
    └── founder-gregory-goyins.svg  ← PLACEHOLDER — replace with real photo
```

---

## STEP 1: Download real images (run once)

```bash
cd efg-website
python3 download-assets.py
```

This pulls all 20 stock photos from Unsplash (free, no API key needed) and the founder photo. It also removes the SVG placeholders automatically.

To also cache Chart.js locally (for offline use):
```bash
python3 download-assets.py --chartjs
```

---

## STEP 2: Replace placeholders with real EFG assets

Priority replacements — these are the most visible:

| File | What to replace with |
|---|---|
| `images/aerial-coastline-hero.jpg` | Best EFG aerial shot — hero across all pages |
| `images/studio-cinema-production.jpg` | Behind-the-scenes Studios footage still |
| `images/dji-inspire-drone.jpg` | Inspire 3 on pad or in flight |
| `images/team-training-session.jpg` | Academy cohort or training session |
| `images/founder-gregory-goyins.png` | Gregory headshot — high contrast, ideally B&W |
| `images/south-florida-aerial.jpg` | South Florida from the air |

**Image specs:**
- Hero images: 1800×1012px minimum, JPG at 85% quality
- Section/grid images: 900×675px or 900×506px, JPG at 80-85%
- Founder portrait: 600×800px (portrait orientation), PNG or JPG

---

## STEP 3: Add your video reels

The reel card play buttons on the site currently use these YouTube placeholder videos.
Replace them with your actual EFG footage when ready.

**Current placeholders (working, viewable now):**

| Division | Placeholder | Replace with |
|---|---|---|
| Studios | https://www.youtube.com/watch?v=RgKAFK5djSk | Your brand film / founder story reel |
| Air | https://www.youtube.com/watch?v=o9ZaEL6fnqI | Your aerial cinematography reel |
| Academy | https://www.youtube.com/watch?v=Y7d3-ry7sKo | Your training / workshop reel |

To update, search each HTML file for the YouTube URLs above and replace with your own Vimeo or YouTube links.

```html
<!-- Example: replace placeholder with your real reel -->
<a href="https://vimeo.com/YOUR_REAL_REEL_ID" target="_blank">Watch Studios Reel</a>
```

---

## STEP 4: Deploy to Vercel

```bash
# Initialize git repo
git init
git add .
git commit -m "EFG website — initial deploy"

# Push to GitHub (create repo first at github.com)
git remote add origin https://github.com/YOUR_ORG/elevate-frame-group.git
git push -u origin main
```

Then in Vercel:
1. New Project → Import from GitHub
2. Framework: **Other** (plain static)
3. Build command: leave empty
4. Output directory: leave empty (`.`)
5. Deploy

---

## STEP 5: Connect your domains

In Vercel Settings → Domains, add:

| Domain | Action |
|---|---|
| `elevateframegroup.com` | Primary canonical domain |
| `www.elevateframegroup.com` | Redirect to root |
| `elevateframegroup.media` | Redirect to `/work` |
| `elevateframegroup.studio` | Redirect to `/studios` |
| `elevateframegroup.academy` | Redirect to `/academy` (or own project Year 2) |

The `vercel.json` also handles these short URL aliases:
- `/plan` → `/business-plan`
- `/deck` or `/investor` → `/pitch`
- `/drone` → `/air`
- `/training` → `/academy`

---

## Updating the contact form

The contact form currently simulates a send. To make it live, add your Formspree endpoint:

```html
<!-- In contact.html, find the form tag and add: -->
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Sign up at formspree.io (free tier handles 50 submissions/month).

---

## Brand System Quick Reference

| Token | Value | Use |
|---|---|---|
| Background | `#080808` | Page base |
| Gold | `#c9a84c` | CTAs, accents, monogram |
| Gold Light | `#e2c97e` | Hover states |
| Ivory | `#f4f2ee` | Headlines |
| Warm White | `#c0bdb5` | Body text |
| Grey | `#888888` | Labels, captions |

**Fonts:** Cormorant Garamond (display) · Inter (body) · JetBrains Mono (data/labels)

---

## Nav Structure

All 8 pages appear in the nav:
**Home · Studios · Air · Academy · Work · Plan · Pitch · Contact**

The `Plan` and `Pitch` links lead to the investor-facing pages. If you want to hide them from the public nav, remove the `<a href="business-plan.html">` and `<a href="pitch.html">` lines from the `nav-links` div in each HTML file. The pages themselves remain accessible via direct URL.

---

## Contact

**Elevate Frame Group**  
Gregory D. Goyins · CEO & Founder  
gregorydgoyins@gmail.com · 561.600.2271  
Boynton Beach, Florida  
© 2025 Elevate Frame Group. All rights reserved.
