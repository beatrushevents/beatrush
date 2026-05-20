# BeatRush Events — Website

A Next.js website for BeatRush Events. Built with Next.js 14, React, and Tailwind CSS.

## Quick Start

### 1. Install Node.js (one-time setup)

If you don't already have it, install Node.js from **https://nodejs.org**
(download the "LTS" version, then run the installer — that's it).

To check it worked, open Terminal (Mac) or Command Prompt (Windows) and type:

```
node --version
```

You should see something like `v20.11.0`.

### 2. Open this folder in your Terminal

- **Mac:** Right-click the `beatrush-app` folder → "New Terminal at Folder"
- **Windows:** Shift + right-click the folder → "Open in Terminal"
- Or just `cd` into the folder manually

### 3. Install the project's dependencies (one-time, takes ~30 seconds)

```
npm install
```

### 4. Run the website locally

```
npm run dev
```

You'll see something like:

```
   ▲ Next.js 14.2.5
   - Local:        http://localhost:3000
```

Open **http://localhost:3000** in your browser. That's your site.

Any time you save a file, the browser auto-refreshes.

To stop the server: press `Ctrl + C` in the terminal.

---

## Project Structure

```
beatrush-app/
├── app/
│   ├── layout.js          ← page metadata, fonts
│   ├── page.js            ← the home page
│   └── globals.css        ← global styles (Tailwind)
├── components/
│   └── BeatRushSite.jsx   ← the entire site (all sections)
├── public/
│   ├── cinematic.mp4              ← the disco-ball video
│   ├── cinematic-still.jpg        ← video poster + gallery cell
│   └── gallery-bachelorette.jpg   ← the bachelorette photo
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## How to make common changes

### Change copy or text

Open `components/BeatRushSite.jsx` and search for the text you want to change.
Save the file — browser auto-refreshes.

### Add a new event (e.g. Event 02)

In `components/BeatRushSite.jsx`, find the comment that says
`EVENT 01 — Thala x Thalapathy`. Copy the entire `<article>` block,
paste it below, change `(01)` to `(02)`, and update the title/details.

### Add more event photos to the Gallery

Drop your photos into `/public/` (e.g. `event-1.jpg`, `event-2.jpg`).
Then in `components/BeatRushSite.jsx`, find any `<PlaceholderCell />`
in the gallery grid and replace it with:

```jsx
<div className={`cell ${galleryInView ? 'in' : ''} photo-cell relative col-span-1 row-span-2 rounded-lg overflow-hidden cursor-pointer`}>
  <img src="/event-1.jpg" alt="" className="photo-zoom absolute inset-0 w-full h-full object-cover" />
</div>
```

### Change the hero background

Drop your real club photo into `/public/hero.jpg`, then in the Hero section
of `BeatRushSite.jsx` (look for the comment "TO USE YOUR REAL CLUB PHOTO"),
replace the gradient div with:

```jsx
<img src="/hero.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
```

---

## Deploying to the internet

When you're ready to put this online, the easiest path is **Vercel**
(made by the same team as Next.js — one-click deploy).

1. Create a free account at **https://vercel.com**
2. Push this project to a GitHub repo (or use `vercel deploy` from your terminal)
3. Vercel auto-builds and gives you a live URL

That's it. No servers, no DevOps, no hosting bills until you have real traffic.

---

## If something breaks

- **"command not found: npm"** → Node.js isn't installed. See Step 1.
- **The page is blank** → Check the terminal for red error messages. Usually
  it's a typo in `BeatRushSite.jsx`. Press `Ctrl+C`, fix the file, run `npm run dev` again.
- **Fonts look wrong on first load** → They're loaded from Google Fonts.
  Make sure you have internet.

---

Built with Next.js + Tailwind. Edit freely.
