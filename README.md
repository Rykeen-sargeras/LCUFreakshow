# The LCU Freak Show

A vintage circus-poster website with mystery "reveal" cards for each act, plus a
staff-only admin panel for editing names, bios, and photos, reordering the
lineup, and adding new attractions. It runs on Railway with a tiny built-in
server so that whatever you change shows up for **everyone**.

---

## What's in this folder

- `index.html` — the website itself (all the default photos are baked in).
- `server.js` — a tiny server that serves the site and keeps one shared copy of
  the lineup so every visitor sees the same thing.
- `package.json` — tells Railway how to start the server.
- `.gitignore` — housekeeping; ignore it.
- `images/` — the character photos as separate files, for your records. The site
  doesn't need them.

You don't need to understand the code. Just upload the whole folder and follow
the steps below.

---

## Putting it on Railway (step by step)

You'll do this once. It takes about 10 minutes. No coding.

### Step 1 — Put these files on GitHub
1. Go to https://github.com and sign in (make a free account if needed).
2. Click the **+** in the top-right -> **New repository**.
3. Name it something like `lcu-freakshow`, leave it Public, click **Create repository**.
4. On the next page click **uploading an existing file**.
5. Drag in **all** the files from this folder (`index.html`, `server.js`,
   `package.json`, `.gitignore`, and the `images` folder). Click **Commit changes**.

### Step 2 — Deploy it on Railway
1. Go to https://railway.com and click **Login** -> **Login with GitHub**.
2. Click **New Project** -> **Deploy from GitHub repo**.
3. The first time, Railway asks permission to see your GitHub repos — allow it,
   then pick your `lcu-freakshow` repo.
4. Railway starts building automatically. Wait until the deploy succeeds
   (a minute or two).

### Step 3 — Give it a web address
1. Click your service (the box that appeared), then open the **Settings** tab.
2. Find **Networking** -> click **Generate Domain**.
3. Railway gives you a link like `lcu-freakshow-production.up.railway.app`.
   That's your live website. Open it!

### Step 4 — Make your edits stick (add a Volume)
Without this, anything you add could disappear when Railway restarts. Do this
once so your lineup is saved permanently:
1. Click your service, then choose **Add Volume** (in the service's **＋ / Create**
   menu, by right-clicking the service, or under **Settings -> Volumes**).
2. For the mount path, type **`/data`** and confirm.
3. Railway redeploys with the volume attached. Your saves now persist.

> The server detects the volume automatically, so there's nothing else to set.

### Step 5 (optional) — Change the password
The admin password is `123321`. To use a different one:
1. In Railway, open your service -> **Variables** tab -> **New Variable**.
2. Name it `ADMIN_PASSWORD`, set your new password, save.
3. Then open `index.html` on GitHub, click the pencil to edit, change the line
   `var ADMIN_PASSWORD = "123321";` to the same new password, and commit.
   (Both must match.)

You're done. The site is live and shared.

---

## Using the site

### Logging in
Scroll to the bottom and click **Staff Login**.
- Username: `rykeen`
- Password: `123321`

(Anyone who views the page source can see these — that's fine for a fan site.)

### Editing an act
Click the pencil on a card to change its **name**, **bio**, or **photo**, or to
**delete** it. Click **Save**. When it says *"Saved — now live for every
visitor,"* it worked.

### Adding an attraction
Log in, then click **＋ Add Attraction** under the cards. A new ring appears,
ready to edit. Fill it in and Save.

### Reordering the lineup
While logged in, use the left/right arrows at the top-left of a card, or drag the
handle at its bottom-right onto another card. Ring numbers update automatically.

### Enlarging a photo
Reveal a card, then click its photo to see it full-screen. Close with the X, a
click outside, or the Escape key.

### Background removal
When you upload a photo, the site automatically erases a white (or other plain,
even) background so the character sits cleanly on the card. White *inside* the
character (a shirt, teeth) is kept. Plain backgrounds come out cleanest.

### Names
Every act's name is always shown. Only the photo and bio hide behind "Reveal."

---

## Good to know

- **Everyone sees your changes.** The page quietly re-checks the server every few
  seconds, so new acts appear for visitors without them refreshing.
- **Updating the site later:** edit files on GitHub (or re-upload). Railway
  redeploys automatically. Your saved lineup (on the volume) is unaffected.
- **Running it on your own computer** (optional, for testing): install Node.js,
  then in this folder run `npm install` and `npm start`, and open
  http://localhost:3000.
