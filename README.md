# Romantic Surprise Gift Website ❤️

A luxury, personalized romantic surprise website with animations, music, interactive love letter, polaroid gallery, sweet treats rain, video reels, and an interactive scratch card.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies (already done)
npm install

# 2. Start the local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## ⚙️ How to Customize (Everything in One File!)

You do not need an admin dashboard or database. Everything is configured in **`src/config.js`**:

```javascript
// Open src/config.js to change:
export const config = {
  recipientName: "Ananya",     // Partner's name
  senderName: "Arjun",         // Your name

  // Background romantic song (MP3 file or stream)
  audio: {
    title: "A little something for you",
    url: "/song.mp3",
    autoplay: true,
  },

  // Hero section photo
  hero: {
    profilePhoto: "...",
  },

  // 3D Love letter & wax-sealed envelope
  loveLetter: {
    heading: "To My Dearest...",
    paragraphs: [...],
  },

  // Polaroid memories gallery ("The Reason I Smile")
  memories: [
    { title: "...", imageUrl: "...", caption: "..." },
  ],

  // Interactive Sweet Treat rain
  sweetSurprise: {
    headline: "🍯 You're the sweetest part of my life.",
    buttonText: "Tap here for a surprise",
    revealedMessage: "...",
  },

  // Romantic Dialogues & Film clips
  bollywoodMoments: {
    quote: "...",
    videos: [...],
  },

  // Interactive Scratch Card Surprise
  scratchCard: {
    prize: "My Heart",
    terms: "No Expiry.\nNo Returns.\nYours Forever. ♾️",
  },

  // Final Quote & Footer
  foreverPerson: {
    message: "...",
  },
};
```

---

## 🌐 How to Deploy (Free)

### Vercel / Netlify
1. Run `npm run build`.
2. Drag and drop the `dist` folder onto [Netlify Drop](https://app.netlify.com/drop) or connect this GitHub repo to [Vercel](https://vercel.com).
3. Your romantic surprise link is live!

