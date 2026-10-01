const screens = document.querySelectorAll(".screen");
const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");
const confettiBtn = document.getElementById("confettiBtn");

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

openBtn.addEventListener("click", async () => {
  // The button click is a direct user action, so browsers allow audio playback here.
  try {
    music.currentTime = 0;
    await music.play();
    musicBtn.textContent = "⏸️ Дууг түр зогсоох";
  } catch (error) {
    console.warn("Audio could not start automatically:", error);
  }

  envelope.classList.add("open");

  setTimeout(() => {
    showScreen("photosScreen");
  }, 900);
});

document.querySelectorAll(".next-btn").forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.next));
});

musicBtn.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicBtn.textContent = "⏸️ Дууг түр зогсоох";
    } else {
      music.pause();
      musicBtn.textContent = "🎵 Дуугаа тоглуулах";
    }
  } catch (error) {
    music.controls = true;
    alert("Дууг тоглуулахын тулд доорх audio player дээр Play дарна уу.");
  }
});

music.addEventListener("play", () => {
  musicBtn.textContent = "⏸️ Дууг түр зогсоох";
});

music.addEventListener("pause", () => {
  musicBtn.textContent = "🎵 Дуугаа тоглуулах";
});

confettiBtn.addEventListener("click", () => {
  makeConfetti(100);
});

function makeConfetti(count) {
  const pieces = ["💙", "💎", "✨", "🎉", "♡", "✦"];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.fontSize = (12 + Math.random() * 14) + "px";
    piece.style.animationDuration = (2.2 + Math.random() * 2.5) + "s";
    piece.style.setProperty("--x", ((Math.random() - .5) * 350) + "px");
    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 5000);
  }
}
