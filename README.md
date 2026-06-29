# The LCU Freak Show

A single-page vintage-circus-poster website with mystery "reveal" cards for each
act, plus a staff-only admin panel for editing names, bios, and photos.

## Files

- `index.html` — the whole site. Self-contained: all default photos are embedded
  inside it, so there are no broken image links. **This is the only file you must
  upload to deploy.**
- `images/` — the same character photos as standalone transparent PNGs, in case
  you want them for anything else. Not required by the site.
- `.nojekyll` — tells GitHub Pages to serve the files as-is. Just leave it there.
- `README.md` — this file.

## Deploying on GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html` (and optionally the rest) to it.
3. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pick your `main` branch and `/ (root)`, then Save.
4. Wait a minute, then visit the URL GitHub gives you.

## Logging in as staff

Scroll to the very bottom and click **Staff Login**.

- Username: `rykeen`
- Password: `123321`

Note: these are checked in the browser, so anyone who views the page source can
read them. That's fine for a fan site, but don't reuse that password anywhere
that matters. To change them, edit `ADMIN_USERNAME` / `ADMIN_PASSWORD` near the
top of the `<script>` block in `index.html`.

## Editing acts

Once logged in, each card shows a pencil (✎) button. Click it to:

- change the display **name**
- rewrite the **bio**
- **replace the photo** (the white/solid background is removed automatically — see below)
- **delete** the attraction (button at the bottom of the edit panel)

Click **Save**. Click **Log Out (Staff)** when done.

## Enlarging images

Reveal any card, then click its photo to open it full-screen. Close it with the
× button, by clicking the dark area around it, or by pressing Escape. This works
for everyone, not just admins.

## Reordering the lineup

Log in as staff, then reorder acts either way:

- the ◀ / ▶ buttons on the top-left of each card move it earlier or later, or
- grab the ☰ handle on the bottom-right of a card and drag it onto another.

Ring numbers update automatically and the order is saved.

## Names

Each act's name is always shown. Only the photo and bio stay hidden behind the
"Reveal" button.

## Adding more attractions (from the site)

Log in, then click **＋ Add Attraction** below the cards. A new ring appears,
already open for editing — set its name, bio, and photo, then Save. Rings are
numbered automatically, so deleting one never leaves a gap. (You can also still
add acts by hand in `DEFAULT_ACTS`; see the bottom of this file.)

### Automatic background removal

When you upload a photo, the site removes a white (or any solid, even-colored)
backdrop and makes it transparent, so the character sits cleanly on the card.
It works by erasing inward from the edges, so white *inside* the character
(a white shirt, teeth, eyes) is kept. It works best on photos with a plain,
evenly-lit background. Busy or multi-colored backgrounds won't come out as clean.

## Making edits show up for EVERYONE (shared state)

By default, edits save to **your browser only** (so you can preview safely).
GitHub Pages has no server, so to make an admin's edits appear for every visitor
you need a free shared database. This site is wired for Firebase. Setup is about
5 minutes:

1. Go to <https://console.firebase.google.com> and create a project (free
   "Spark" plan is enough).
2. In the project, click the **web** icon (`</>`) to register a web app. Copy the
   `firebaseConfig` values it shows you.
3. Paste those values into `FIREBASE_CONFIG` near the top of the `<script>` block
   in `index.html` (apiKey, authDomain, projectId, storageBucket, etc.).
4. In the Firebase console, open **Build → Firestore Database → Create database**
   (start in test mode is fine to begin with).
5. Open **Build → Storage → Get started** (this is where uploaded photos go —
   photos are too large to live in Firestore).
6. Re-upload `index.html` to GitHub.

That's it. After that, when you log in and save, the status line will say
"Saved — now live for every visitor," and anyone who opens the page (or already
has it open) sees the current state.

### A note on Firestore/Storage security rules

"Test mode" rules expire and allow anyone to write. For a small fan site that's
usually acceptable short-term, but if you want to lock writes down, the proper
approach is Firebase Authentication. Ask and it can be added. For read-only-public
+ open-write (simplest), test-mode rules are fine to start.

## Adding more acts

Open `index.html`, find `DEFAULT_ACTS` in the `<script>` block, and copy one of
the `{ id: ..., num: ..., name: ..., bio: ..., image: ... }` blocks. Give it a
new unique `id` (e.g. `ring6`) and a new `num` ("Ring No. 6"). For the image you
can either paste a `data:image/png;base64,...` string or a normal URL, or just
leave a placeholder and replace it later via the admin panel.
