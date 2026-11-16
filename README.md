# Romantic Surprise Web Application ❤️

A responsive, production-ready, interactive romantic surprise single-page application built with **Next.js (App Router)**, **Tailwind CSS**, and **Framer Motion**, engineered for seamless zero-config deployment on **Vercel**.

---

## ✨ Features & Step Architecture

The entire journey is orchestrated through an interactive 8-step state machine:

1. **Step 1: Welcome Screen**
   - Soft pastel pink background (`bg-[#fce4ec]`).
   - Heading *"Welcome, lovely!"* and subtext *"I have a special surprise for you!"*.
   - Prominent rounded pill button (`bg-[#d32f2f] text-white`) labeled **"Open here"** with buttery smooth entrance and exit animations.
   - Floating romantic heart particles and audio cue.

2. **Step 2: Anniversary Passcode Screen**
   - Heading *"🔒 When is our anniversary?"*.
   - 4-digit PIN indicator (`• • • •`) with numeric keypad (1–9, 0, Clear, Backspace) + physical keyboard listener.
   - Auto-validates code `0327` (March 27) with celebratory chimes and heart confetti.

3. **Step 3: Interactive Photo Puzzle**
   - Heading *"🔓 Photo puzzle"*.
   - 3x3 sliding tile puzzle of a romantic couple photo.
   - Adjacent tile tapping mechanic, move counter, instant "Preview" toggle, "Shuffle" button, and a "Solve" helper.
   - Auto-unlocks and transitions upon solving.

4. **Step 4: Trivia Question**
   - Heading *"🔒 Where did we first meet?"*.
   - Text input with placeholder `school`.
   - White button with red border/text labeled **"Unlock"**.
   - Case-insensitive validation for `"school"` with helpful hint toggles.

5. **Step 5: Voice Message Player (Retro Cassette Tape)**
   - Heading *"Voice message"*.
   - Detailed vintage cassette tape graphic with animated spinning reels, dual spools, and dancing audio visualizer bars.
   - Active progress indicator (`0:08 / 0:15`) with Web Audio API sound synthesis, play/pause controls, and transcript toggle.

6. **Step 6: Envelope & Love Letter Reveal**
   - Heading *"A letter for you"*.
   - UI Part A: Realistic closed envelope with a wax seal stamp (**"P"**) and instruction: *"Tap to remove the seal."*
   - UI Part B: Tapping plays a wax cracking sound, pops open the envelope flap, and slides out an aged parchment letter displaying:
     > *"I'm in love with you and all your little things. :)"*
   - Bottom pill button labeled **"Continue"**.

7. **Step 7: Prize Selector / "Spin to Win" Gamification**
   - Miniature arcade pink slot machine with neon lights and a mechanical lever labeled **"SPIN ⬇"**.
   - Pulling lever plays ratcheting physics animation and decelerates spinning reels to land on a jackpot.
   - Flashes **"CONGRATS. YOU WON."** with gift icon and confetti celebration before advancing to the final showcase.

8. **Step 8: Final Product Showcase & Sticky CTA**
   - Heading *"This one is really yours."*.
   - Customized **Monogram Necklace** graphic with engraved initials **"R & L"** and line-art couple motif.
   - Interactive finish switcher (18K Gold, Rose Gold, Sterling Silver).
   - Product details: *"Rarz & Lovely"* / *"Monogram Necklace"*.
   - **"Preview complete"** celebratory certificate modal.
   - Sticky bottom checkout bar with **"Shop now"** linking externally to `https://perfectpresents.ph`.
   - Footer watermark: *"Create yours at PERFECTPRESENTS.PH"*.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom pastel palette, metallic sheen effects, glassmorphism)
- **Animations:** Framer Motion 11
- **Icons:** Lucide React
- **Confetti:** Canvas Confetti
- **Sound Effects:** Web Audio API (Zero external audio file dependencies; synthesizes clicks, chimes, cassette sounds, wax crunches, and fanfare reliably across all browsers)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## ☁️ Deployment on Vercel

1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework preset will automatically detect **Next.js**.
5. Click **Deploy**. No special environment variables are required!
