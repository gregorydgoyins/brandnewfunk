#!/usr/bin/env python3
"""
ELEVATE FRAME GROUP — Asset Download Script
Run this once from your project root to pull all real photos.
Requires: pip install requests

Usage:
  python3 download-assets.py

Then optionally run:
  python3 download-assets.py --chartjs
  to also download the Chart.js vendor file for offline use.
"""

import os, sys, time
import urllib.request

IMAGES_DIR = os.path.join(os.path.dirname(__file__), 'images')
VENDOR_DIR = os.path.join(os.path.dirname(__file__), 'js', 'vendor')

# ── IMAGE MANIFEST ──────────────────────────────────────────────────────────
# Format: (unsplash_photo_id, local_filename, width, quality, description)
UNSPLASH_IMAGES = [
    # HERO / FULL-BLEED (download at 1800px)
    ("photo-1508739773434-c26b3d09e071", "aerial-coastline-hero.jpg",      1800, 85, "Aerial coastline — main hero"),
    ("photo-1492691527719-9d1e07e534b4", "studio-cinema-production.jpg",   1400, 85, "Studio cinema production — Studios hero"),
    ("photo-1552664730-d307ca884978",    "team-training-session.jpg",       1400, 85, "Team training — Academy hero"),
    ("photo-1533106497176-45ae19e68ba2", "south-florida-aerial.jpg",        1400, 85, "South Florida aerial"),
    ("photo-1617198769067-a9d86a6de98c", "cinema-gimbal-setup.jpg",         1400, 85, "Cinema gimbal — Ronin/Air hero"),
    ("photo-1521405924368-64c5b84bec60", "dji-inspire-drone.jpg",           1400, 85, "DJI Inspire drone"),

    # GEAR / PRODUCT TILES (900px is fine)
    ("photo-1516035069371-29a1b244cc32", "cinema-camera-closeup.jpg",       900,  85, "Cinema camera closeup — Sony FX6"),
    ("photo-1473968512647-3e447244af8f", "drone-mavic-flight.jpg",          900,  85, "Drone in flight — Mavic 3"),
    ("photo-1506947411487-a56738267384", "mini-drone-flight.jpg",           900,  85, "Mini drone — DJI Mini 4 Pro"),
    ("photo-1579829366248-204fe8413f31", "fpv-drone.jpg",                   900,  85, "FPV drone — Avata 2"),
    ("photo-1590736969955-71cc94901144", "led-lighting-setup.jpg",          900,  85, "LED lighting — Aputure"),
    ("photo-1452421822248-d4c2b47f0c81", "audio-equipment.jpg",             900,  85, "Audio gear — Rode"),
    ("photo-1587825140708-dfaf72ae4b04", "tripod-support.jpg",              900,  85, "Tripod support — Sachtler"),
    ("photo-1526170375885-4d8ecf77b99f", "camera-lens.jpg",                 900,  85, "Camera lens — Sony G Master"),

    # MARKET / CONTEXT PHOTOS
    ("photo-1563013544-824ae1b704d3",    "construction-site-aerial.jpg",    900,  80, "Construction site aerial"),
    ("photo-1558618666-fcd25c85cd64",    "agricultural-drone.jpg",          900,  80, "Agricultural drone survey"),

    # ACADEMY / TRAINING
    ("photo-1524178232363-1fb2b075b655", "classroom-instruction.jpg",       900,  80, "Classroom instruction"),
    ("photo-1531482615713-2afd69097998", "workshop-training.jpg",           900,  80, "Workshop training"),

    # STUDIOS PRODUCTION
    ("photo-1517604931442-7e0c8ed2963c", "film-production.jpg",             900,  80, "Film production set"),
    ("photo-1497366216548-37526070297c", "office-interior.jpg",             900,  80, "Professional office"),
]

# Founder photo (from base44 CDN — external)
FOUNDER_PHOTO = (
    "https://media.base44.com/images/public/69c5b381f6dbdc9a27e6cd17/0058fa6ce_generated_image.png",
    "founder-gregory-goyins.png",
    "Founder Gregory D. Goyins"
)

# Chart.js vendor (optional)
CHARTJS_URL = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"
CHARTJS_LOCAL = os.path.join(VENDOR_DIR, "chart.min.js")

# ── HELPERS ─────────────────────────────────────────────────────────────────
def download(url, dest, label):
    """Download url to dest. Returns True on success."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'image/webp,image/jpeg,image/*,*/*',
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
        with open(dest, 'wb') as f:
            f.write(data)
        kb = len(data) // 1024
        print(f"  ✓  {label} ({kb}KB)")
        return True
    except Exception as e:
        print(f"  ✗  {label} — {e}")
        return False

def build_unsplash_url(photo_id, width, quality):
    return (f"https://images.unsplash.com/{photo_id}"
            f"?w={width}&auto=format&fit=crop&q={quality}")

# ── MAIN ─────────────────────────────────────────────────────────────────────
def main():
    os.makedirs(IMAGES_DIR, exist_ok=True)
    os.makedirs(VENDOR_DIR, exist_ok=True)

    print("\n╔═══════════════════════════════════════════════════╗")
    print("║  ELEVATE FRAME GROUP — Asset Download             ║")
    print("╚═══════════════════════════════════════════════════╝\n")

    # ── UNSPLASH IMAGES ──────────────────────────────────────────
    print(f"Downloading {len(UNSPLASH_IMAGES)} Unsplash images...\n")
    ok = 0
    for photo_id, filename, width, quality, label in UNSPLASH_IMAGES:
        dest = os.path.join(IMAGES_DIR, filename)

        # Skip if file already exists (and is > 50KB — not a SVG placeholder)
        if os.path.exists(dest) and os.path.getsize(dest) > 51200:
            print(f"  –  {label} (already downloaded, skipping)")
            ok += 1
            continue

        # Also remove SVG placeholder if it exists
        svg_path = dest.replace('.jpg', '.svg').replace('.png', '.svg')
        if os.path.exists(svg_path):
            os.remove(svg_path)

        url = build_unsplash_url(photo_id, width, quality)
        success = download(url, dest, label)
        if success:
            ok += 1
        time.sleep(0.4)  # be polite to Unsplash

    print(f"\n  Downloaded: {ok}/{len(UNSPLASH_IMAGES)}")

    # ── FOUNDER PHOTO ─────────────────────────────────────────────
    print("\nDownloading founder photo...")
    founder_url, founder_file, founder_label = FOUNDER_PHOTO
    founder_dest = os.path.join(IMAGES_DIR, founder_file)
    if not (os.path.exists(founder_dest) and os.path.getsize(founder_dest) > 51200):
        svg_path = founder_dest.replace('.png', '.svg')
        if os.path.exists(svg_path):
            os.remove(svg_path)
        download(founder_url, founder_dest, founder_label)
    else:
        print(f"  –  Founder photo (already downloaded)")

    # ── CHART.JS VENDOR ───────────────────────────────────────────
    if '--chartjs' in sys.argv or '--all' in sys.argv:
        print("\nDownloading Chart.js vendor file...")
        download(CHARTJS_URL, CHARTJS_LOCAL, "Chart.js 4.4.0 (minified)")

    # ── REPORT ────────────────────────────────────────────────────
    print("\n╔═══════════════════════════════════════════════════╗")
    print("║  Download complete.                               ║")
    print("║                                                   ║")
    print("║  Next steps:                                      ║")
    print("║  1. Replace SVG placeholders with real EFG media  ║")
    print("║  2. Add your own footage stills to /images/       ║")
    print("║  3. Push to GitHub → Vercel auto-deploys          ║")
    print("╚═══════════════════════════════════════════════════╝\n")

    print("REPLACEMENT GUIDE:")
    print("─" * 50)
    replacements = [
        ("images/aerial-coastline-hero.jpg",    "Your best aerial hero shot — full width, 1800px+"),
        ("images/studio-cinema-production.jpg", "Behind the scenes Studios footage still"),
        ("images/dji-inspire-drone.jpg",        "Inspire 3 in flight or on pad"),
        ("images/team-training-session.jpg",    "Academy cohort or training photo"),
        ("images/south-florida-aerial.jpg",     "South Florida from the air"),
        ("images/founder-gregory-goyins.png",   "Gregory headshot — high contrast, B&W preferred"),
    ]
    for fname, note in replacements:
        print(f"  {fname}")
        print(f"    → {note}")

if __name__ == '__main__':
    main()
