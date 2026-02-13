const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const proposalCard = document.getElementById("proposalCard");
const heartsLayer = document.getElementById("heartsLayer");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

function createHeart() {
  if (!heartsLayer) return;

  const heart = document.createElement("span");
  heart.className = "heart";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.bottom = "-20px";
  heart.style.animationDuration = `${6 + Math.random() * 4}s`;
  heart.style.opacity = `${0.55 + Math.random() * 0.3}`;
  heartsLayer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}

function burstHearts(count = 10) {
  for (let i = 0; i < count; i += 1) {
    setTimeout(createHeart, i * 90);
  }
}

if (heartsLayer) {
  setInterval(createHeart, 520);
}

function moveNoButton() {
  if (!noBtn) return;

  const padding = 14;
  const viewport = window.visualViewport;
  const vw = viewport ? viewport.width : window.innerWidth;
  const vh = viewport ? viewport.height : window.innerHeight;
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = Math.max(0, vw - btnRect.width - padding * 2);
  const maxY = Math.max(0, vh - btnRect.height - padding * 2);

  const x = padding + Math.random() * maxX;
  const y = padding + Math.random() * maxY;

  noBtn.style.position = "fixed";
  noBtn.style.left = "0";
  noBtn.style.top = "0";
  noBtn.style.zIndex = "60";
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

function keepNoAway(event) {
  if (!noBtn) return;

  const rect = noBtn.getBoundingClientRect();
  const px = event.clientX;
  const py = event.clientY;

  if (px == null || py == null) return;

  const dx = rect.left + rect.width / 2 - px;
  const dy = rect.top + rect.height / 2 - py;
  const distance = Math.hypot(dx, dy);

  if (distance < 110) moveNoButton();
}

if (noBtn) {
  ["mouseenter", "pointerdown", "touchstart", "click", "focus"].forEach((evt) => {
    noBtn.addEventListener(evt, (e) => {
      e.preventDefault();
      moveNoButton();
    });
  });

  document.addEventListener("mousemove", keepNoAway);
  document.addEventListener("touchmove", moveNoButton, { passive: true });
  window.addEventListener("resize", moveNoButton);
  window.visualViewport?.addEventListener("resize", moveNoButton);
  moveNoButton();
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    if (proposalCard) proposalCard.classList.add("leaving");
    burstHearts(20);

    localStorage.setItem("valentineMusicWanted", "yes");

    setTimeout(() => {
      window.location.href = "letter.html";
    }, 350);
  });
}

if (musicToggle && bgMusic) {
  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic
        .play()
        .then(() => {
          localStorage.setItem("valentineMusicWanted", "yes");
          musicToggle.textContent = "Pause Music";
        })
        .catch(() => {
          musicToggle.textContent = "Add music.mp3 for sound";
        });
    } else {
      bgMusic.pause();
      localStorage.setItem("valentineMusicWanted", "no");
      musicToggle.textContent = "Play Music";
    }
  });
}
(() => {
  const cards = document.querySelectorAll(".memory-card");
  cards.forEach((card) => {
    const tilt = (Math.random() * 8 - 4).toFixed(2); // -4deg to +4deg
    card.style.setProperty("--tilt", `${tilt}deg`);
  });
})();

