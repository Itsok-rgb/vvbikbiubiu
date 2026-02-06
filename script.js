// Elements
const nameInput = document.getElementById("nameInput");
const saveNameBtn = document.getElementById("saveNameBtn");
const savedNameLabel = document.getElementById("savedNameLabel");
const startJourneyBtn = document.getElementById("startJourneyBtn");
const secretHeart = document.getElementById("secretHeart");

const screenStart = document.getElementById("screen-start");
const screenGarden = document.getElementById("screen-garden");
const screenReasons = document.getElementById("screen-reasons");

const dynamicName = document.getElementById("dynamicName");
const roseGrid = document.getElementById("roseGrid");
const surpriseMessageEl = document.getElementById("surpriseMessage");
const shuffleMessageBtn = document.getElementById("shuffleMessageBtn");
const progressFill = document.getElementById("progressFill");
const nextToReasonsBtn = document.getElementById("nextToReasonsBtn");

const reasonsGrid = document.getElementById("reasonsGrid");
const openLetterBtn = document.getElementById("openLetterBtn");

const letterOverlay = document.getElementById("letterOverlay");
const closeLetterBtn = document.getElementById("closeLetterBtn");
const letterNameLine = document.getElementById("letterNameLine");
const letterBody = document.getElementById("letterBody");
const confettiBtn = document.getElementById("confettiBtn");

const secretNoteOverlay = document.getElementById("secretNoteOverlay");
const closeSecretNoteBtn = document.getElementById("closeSecretNoteBtn");

const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bg-music");
const petalLayer = document.getElementById("petal-layer");

// Data
const STORAGE_KEY_NAME = "roseDayLovedOneName";

const surpriseMessages = [
  "If I could give you one thing, it would be the ability to see yourself the way I see you – absolutely magical.",
  "You’re my favorite notification, my softest playlist, and my calm after every storm.",
  "Every time I think of you, a tiny rose grows quietly in my chest.",
  "You are the reason ordinary days feel like soft, pink sunsets.",
  "Some people bring flowers. You brought an entire garden into my life.",
  "If kisses were petals, I owe you an endless field of roses.",
  "The safest place I know is the space between your heartbeat and your smile.",
];

const reasons = [
  "The way your eyes light up when you talk about things you love.",
  "Your kindness, even when nobody is watching.",
  "The way you make even silence feel comfortable and warm.",
  "How you remember tiny details about me that I forgot myself.",
  "Your laugh – it’s easily my favorite sound in the world.",
  "The way you care about others, even when you’re tired.",
  "Because my day simply feels incomplete without hearing from you.",
  "You never try to be perfect, but you are perfect to me.",
  "You showed me that love can be gentle, patient, and safe.",
];

const letterParagraphs = [
  "On this Rose Day, I don’t just want to send you a flower. I want to wrap every petal around a feeling, every thorn around a lesson, and every leaf around a promise.",
  "You turned ordinary days into soft little memories – shared smiles, late-night talks, random jokes, and all those tiny moments that nobody else sees but mean everything to me.",
  "Like a rose, you’ve bloomed through sunlight and storms. I’ve watched you grow, fight, heal, and shine again, and I fall in love with your strength just as much as your softness.",
  "With you, love doesn’t feel like a movie scene. It feels better – like my favorite hoodie, a warm cup of chai, a late-night call that makes the whole day worth it.",
  "I don’t know what the future holds, but I know this: I want you in it. In my loud moments and my quiet ones, in my successes and my doubts, on the days I’m smiling and especially on the days I’m not.",
  "So here’s my little promise, wrapped in this digital rose: I’ll stay. I’ll choose you, again and again, in all your seasons – when you’re blooming, when you’re healing, and even when you feel like you’re barely holding your petals together.",
  "Happy Rose Day, my love. You are, and always will be, my favorite kind of beautiful.",
];

// Utilities
function saveNameToStorage(name) {
  try {
    localStorage.setItem(STORAGE_KEY_NAME, name);
  } catch {
    // ignore if blocked
  }
}

function getNameFromStorage() {
  try {
    return localStorage.getItem(STORAGE_KEY_NAME);
  } catch {
    return null;
  }
}

function getDisplayName() {
  const raw = (nameInput.value || getNameFromStorage() || "").trim();
  if (!raw) return "my love";

  return raw
    .split(" ")
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function updateSavedNameLabel() {
  const stored = getNameFromStorage();
  if (!stored) {
    savedNameLabel.textContent = "";
    return;
  }
  savedNameLabel.textContent = `Saved as: ${stored}`;
}

function switchPanel(from, to) {
  from.classList.remove("panel-active");
  to.classList.add("panel-active");
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* Petal animation */
function spawnPetal() {
  const petal = document.createElement("div");
  petal.className = "petal";

  const startLeft = Math.random() * 100;
  const fallDuration = 7 + Math.random() * 6;
  const delay = Math.random() * 3;

  petal.style.left = startLeft + "vw";
  petal.style.animation = `petal-fall ${fallDuration}s linear ${delay}s forwards`;

  // Custom per-petal transform via inline animation
  const drift = (Math.random() - 0.5) * 40;
  const rotate = (Math.random() - 0.5) * 80;

  petal.animate(
    [
      { transform: "translate3d(0, -10vh, 0) rotate(0deg)", opacity: 0 },
      { opacity: 1 },
      { transform: `translate3d(${drift}vw, 110vh, 0) rotate(${rotate}deg)`, opacity: 0.1 },
    ],
    {
      duration: fallDuration * 1000,
      delay: delay * 1000,
      easing: "linear",
      fill: "forwards",
    }
  );

  petalLayer.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, (fallDuration + delay + 0.5) * 1000);
}

function startPetals(count = 18) {
  for (let i = 0; i < count; i++) {
    spawnPetal();
  }
  // Sustain gently
  setInterval(() => spawnPetal(), 2000);
}

/* Confetti */
function launchConfetti() {
  const colors = ["#ff4b7d", "#ff9bb8", "#ffd1e3", "#ffe55e", "#ff8a5c"];
  const pieces = 120;

  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const color = colors[i % colors.length];
    const left = Math.random() * 100;
    const delay = Math.random() * 0.6;
    const fallDuration = 3 + Math.random() * 1.8;
    const rotate = (Math.random() - 0.5) * 360;

    piece.style.left = left + "vw";
    piece.style.top = "-2vh";
    piece.style.background = color;

    document.body.appendChild(piece);

    piece.animate(
      [
        { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
        {
          transform: `translate3d(${(Math.random() - 0.5) * 25}vw, 110vh, 0) rotate(${rotate}deg)`,
          opacity: 0.2,
        },
      ],
      {
        duration: fallDuration * 1000,
        delay: delay * 1000,
        easing: "cubic-bezier(0.2, 0.6, 0.4, 1)",
        fill: "forwards",
      }
    );

    setTimeout(() => piece.remove(), (fallDuration + delay + 0.5) * 1000);
  }
}

/* Garden setup */
function buildGarden() {
  const captions = [
    "Tap me softly",
    "I have a secret",
    "Hold me gently",
    "I’m your petal",
    "Smell this moment",
    "Bloom with me",
  ];

  for (let i = 0; i < 6; i++) {
    const card = document.createElement("div");
    card.className = "rose-card";

    const stem = document.createElement("div");
    stem.className = "rose-stem";

    const bud = document.createElement("div");
    bud.className = "rose-bud";

    const leafLeft = document.createElement("div");
    leafLeft.className = "leaf left";

    const leafRight = document.createElement("div");
    leafRight.className = "leaf right";

    const glow = document.createElement("div");
    glow.className = "rose-glow";

    const caption = document.createElement("div");
    caption.className = "rose-caption";
    caption.textContent = captions[i % captions.length];

    stem.appendChild(leafLeft);
    stem.appendChild(leafRight);

    card.appendChild(stem);
    card.appendChild(bud);
    card.appendChild(glow);
    card.appendChild(caption);

    card.addEventListener("click", () => {
      setSurpriseMessage(randomItem(surpriseMessages));
      highlightActiveRose(card);
    });

    roseGrid.appendChild(card);
  }
}

function highlightActiveRose(activeCard) {
  const all = Array.from(document.querySelectorAll(".rose-card"));
  all.forEach(card => card.classList.remove("active"));
  activeCard.classList.add("active");
}

/* Surprise message */
function setSurpriseMessage(text) {
  surpriseMessageEl.textContent = text;
}

/* Reasons grid */
function buildReasons() {
  reasonsGrid.innerHTML = "";
  reasons.forEach((reason, idx) => {
    const card = document.createElement("div");
    card.className = "reason-card locked";

    const label = document.createElement("div");
    label.className = "reason-label";
    label.textContent = `Reason ${idx + 1}`;

    const text = document.createElement("div");
    text.className = "reason-text";
    text.textContent = reason;

    card.appendChild(label);
    card.appendChild(text);

    card.addEventListener("click", () => {
      card.classList.remove("locked");
      card.classList.add("revealed");
      // subtle pop
      card.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.03)" },
          { transform: "scale(1)" },
        ],
        { duration: 180, easing: "ease-out" }
      );
    });

    reasonsGrid.appendChild(card);
  });
}

/* Music */
let musicOn = false;

musicToggle.addEventListener("click", async () => {
  if (!bgMusic) return;

  try {
    if (!musicOn) {
      await bgMusic.play();
      musicOn = true;
      musicToggle.textContent = "♫ Music On";
      musicToggle.classList.remove("pill-muted");
    } else {
      bgMusic.pause();
      musicOn = false;
      musicToggle.textContent = "♫ Music Off";
      musicToggle.classList.add("pill-muted");
    }
  } catch (e) {
    console.warn("Audio error:", e);
  }
});

/* Name logic */
saveNameBtn.addEventListener("click", () => {
  const display = getDisplayName();
  if (display === "my love") {
    saveNameToStorage("");
    updateSavedNameLabel();
    updateDynamicName();
    return;
  }
  saveNameToStorage(display);
  updateSavedNameLabel();
  updateDynamicName();

  // tiny pulse
  savedNameLabel.animate(
    [
      { transform: "scale(1)", opacity: 1 },
      { transform: "scale(1.05)", opacity: 1 },
      { transform: "scale(1)", opacity: 1 },
    ],
    { duration: 200, easing: "ease-out" }
  );
});

function updateDynamicName() {
  const display = getDisplayName();
  dynamicName.textContent = display === "my love" ? "my love" : display;
}

/* Journey buttons */
startJourneyBtn.addEventListener("click", () => {
  updateDynamicName();
  switchPanel(screenStart, screenGarden);
  progressFill.style.width = "40%";
});

nextToReasonsBtn.addEventListener("click", () => {
  switchPanel(screenGarden, screenReasons);
  progressFill.style.width = "75%";
});

/* Letter overlay */
openLetterBtn.addEventListener("click", () => {
  progressFill.style.width = "100%";

  const display = getDisplayName();
  letterNameLine.textContent = display === "my love"
    ? "Dear my beautiful rose,"
    : `Dear ${display},`;

  letterBody.innerHTML = "";
  openOverlay(letterOverlay);
  typeLetter(letterBody, letterParagraphs, 36);
});

closeLetterBtn.addEventListener("click", () => {
  closeOverlay(letterOverlay);
});

/* Secret note overlay */
secretHeart.addEventListener("click", () => {
  openOverlay(secretNoteOverlay);
});

closeSecretNoteBtn.addEventListener("click", () => {
  closeOverlay(secretNoteOverlay);
});

function openOverlay(overlay) {
  overlay.classList.add("open");
}

function closeOverlay(overlay) {
  overlay.classList.remove("open");
}

/* Typewriter effect for letter */
async function typeLetter(container, paragraphs, totalDurationMs = 40 * 1000) {
  const fullText = paragraphs.join("\n\n");
  const totalChars = fullText.length;
  const interval = Math.max(14, totalDurationMs / totalChars);

  let index = 0;
  container.textContent = "";

  function render() {
    const current = fullText.slice(0, index);
    const html = current
      .split("\n\n")
      .map(p => `<p>${p}</p>`)
      .join("");
    container.innerHTML = html;
  }

  function step() {
    if (!letterOverlay.classList.contains("open")) {
      // stop if user closed overlay
      return;
    }
    if (index <= totalChars) {
      index++;
      render();
      setTimeout(step, interval);
    }
  }

  step();
}

/* Confetti trigger */
confettiBtn.addEventListener("click", () => {
  launchConfetti();
});

/* Initialisation */
function init() {
  const storedName = getNameFromStorage();
  if (storedName) {
    savedNameLabel.textContent = `Saved as: ${storedName}`;
    nameInput.placeholder = storedName;
  }

  buildGarden();
  buildReasons();
  setSurpriseMessage(randomItem(surpriseMessages));
  startPetals(22);
}

document.addEventListener("DOMContentLoaded", init);
