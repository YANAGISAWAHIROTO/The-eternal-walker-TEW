let floor = 1;
const maxFloor = 3;

const player = document.getElementById("player");
const floorText = document.getElementById("floor");
const message = document.getElementById("message");
const game = document.getElementById("game");

const speed = 15;
const playerWidth = 40;

/* 背景幅 */
const BACKGROUND_WIDTH = 900;

/* 歩行 */
let walkFrame = 0;
let walking = false;
const BASE_BOTTOM = 80;

/* 足音 */
const footstep = new Audio("footstep.mp3");
footstep.volume = 0.4;
let audioUnlocked = false;

/* フェード */
const fade = document.createElement("div");
fade.style.position = "fixed";
fade.style.top = 0;
fade.style.left = 0;
fade.style.width = "100%";
fade.style.height = "100%";
fade.style.background = "black";
fade.style.opacity = 0;
fade.style.pointerEvents = "none";
fade.style.transition = "opacity 0.4s";
fade.style.zIndex = 9999;
document.body.appendChild(fade);

function fadeOutIn(callback) {
  fade.style.opacity = 1;
  setTimeout(() => {
    callback();
    fade.style.opacity = 0;
  }, 400);
}

function getBackgroundBounds() {
  const gameWidth = game.clientWidth;
  const left = (gameWidth - BACKGROUND_WIDTH) / 2;
  const right = left + BACKGROUND_WIDTH;
  return { left, right };
}

let playerX = (game.clientWidth - playerWidth) / 2;
player.classList.add("right");

/* ★ 足音用：前の歩行フレーム */
let lastStepFrame = 0;

function updatePlayer() {
  player.style.left = playerX + "px";

  if (walking) {
    walkFrame++;
    const offset = walkFrame % 2 === 0 ? 0 : 2;
    player.style.bottom = BASE_BOTTOM + offset + "px";

    /* ★ フレームが切り替わった瞬間だけ足音 */
    if (walkFrame % 2 === 0 && lastStepFrame !== walkFrame) {
      if (audioUnlocked) {
        footstep.currentTime = 0;
        footstep.play().catch(() => {});
      }
      lastStepFrame = walkFrame;
    }

  } else {
    player.style.bottom = BASE_BOTTOM + "px";
  }
}

function updateFloorText() {
  floorText.textContent = "階層: " + floor;
}

document.addEventListener("keydown", (e) => {
  message.textContent = "";

  /* 音アンロック */
  if (!audioUnlocked) {
    footstep.play().catch(() => {});
    audioUnlocked = true;
  }

  const bounds = getBackgroundBounds();
  walking = false;

  if (e.key === "ArrowLeft") {
    walking = true;
    player.classList.remove("right");
    player.classList.add("left");
    playerX -= speed;

    if (playerX < bounds.left) {
      if (floor < maxFloor) {
        fadeOutIn(() => {
          floor++;
          playerX = bounds.right - playerWidth;
        });
      } else {
        message.textContent = "これ以上先の階層はありません";
        playerX = bounds.left;
      }
    }
  }

  if (e.key === "ArrowRight") {
    walking = true;
    player.classList.remove("left");
    player.classList.add("right");
    playerX += speed;

    if (playerX + playerWidth > bounds.right) {
      if (floor > 1) {
        fadeOutIn(() => {
          floor--;
          playerX = bounds.left;
        });
      } else {
        message.textContent = "これ以上戻れません";
        playerX = bounds.right - playerWidth;
      }
    }
  }

  updatePlayer();
  updateFloorText();
});

document.addEventListener("keyup", () => {
  walking = false;
});

/* 初期表示 */
updatePlayer();
updateFloorText();
