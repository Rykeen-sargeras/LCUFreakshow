/* =============================================================================
   THE LCU FREAK SHOW — tiny server
   Serves the website and keeps one shared copy of the lineup so every visitor
   sees the same acts. No database to set up: the lineup is saved to a single
   JSON file on disk.

   Two endpoints:
     GET  /api/state  -> hand the current lineup to anyone who asks
     POST /api/state  -> save the lineup (only if the correct password is sent)

   On Railway, attach a Volume so the file survives restarts/redeploys.
   ========================================================================== */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Allow large bodies: uploaded photos travel inside the JSON as data URLs.
app.use(express.json({ limit: '30mb' }));

// Password the server requires before it will save. Set ADMIN_PASSWORD in
// Railway's Variables to change it (keep it matching ADMIN_PASSWORD in index.html).
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123321';

// Where the lineup file lives. If you attach a Railway Volume, Railway sets
// RAILWAY_VOLUME_MOUNT_PATH automatically and the data survives redeploys.
const DATA_DIR = process.env.DATA_DIR
  || process.env.RAILWAY_VOLUME_MOUNT_PATH
  || path.join(__dirname, 'data');
const STATE_FILE = path.join(DATA_DIR, 'state.json');

try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) { /* ignore */ }

// --- load the current lineup ---
app.get('/api/state', (req, res) => {
  try {
    if (fs.existsSync(STATE_FILE)) {
      res.type('application/json').send(fs.readFileSync(STATE_FILE, 'utf8'));
    } else {
      res.json({ data: null });        // nothing saved yet -> site shows defaults
    }
  } catch (e) {
    console.error('read failed', e);
    res.status(500).json({ error: 'read failed' });
  }
});

// --- save the lineup (admins only) ---
app.post('/api/state', (req, res) => {
  if (!req.body || req.body.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'bad password' });
  }
  try {
    const payload = JSON.stringify({ data: req.body.data, updatedAt: Date.now() });
    fs.writeFileSync(STATE_FILE, payload);
    res.json({ ok: true });
  } catch (e) {
    console.error('write failed', e);
    res.status(500).json({ error: 'write failed' });
  }
});

// --- serve the website itself ---
app.use(express.static(__dirname));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('LCU Freak Show running on port ' + PORT);
  console.log('Saving lineup to: ' + STATE_FILE);
});
