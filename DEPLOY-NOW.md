# DEPLOY THIS UPDATE — 3 steps

The site at efg-wrapper.vercel.app is running an OLD version.
This ZIP contains the new version with video backgrounds and the D-ID avatar.

## Option A — Drag and Drop (fastest, 2 minutes)

1. Unzip this file → you get a folder called `efg-website-complete/`
2. Go to https://vercel.com/dashboard
3. Find your `efg-wrapper` project → Settings → Git
4. OR: Click **"New Project"** → drag the entire unzipped folder into the deploy window
   Vercel accepts folder drops directly — no Git needed.

## Option B — Git push (if you have the repo)

```bash
# Unzip the download
unzip efg-website-complete.zip
cd efg-website-complete

# If you have the repo already:
git init
git add .
git commit -m "v4: video backgrounds, D-ID avatar, interactive charts"
git remote add origin https://github.com/YOUR_USER/efg-wrapper.git
git push --force origin main
```
Vercel auto-deploys on push. Done in ~60 seconds.

## Option C — Vercel CLI (if installed)

```bash
cd efg-website-complete
npx vercel --prod
```

---

## After deploying — activate D-ID avatar

Add your D-ID API key to `business-plan.html` and `pitch.html` 
in the `<head>` section, just before `</head>`:

```html
<script>window.DID_API_KEY = "YOUR_BASE64_ENCODED_KEY";</script>
```

Your D-ID API key should be Base64 encoded. To encode it:
```js
btoa("your_did_api_key:") // run in browser console
```

