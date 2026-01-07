let floor = 1;
const maxFloor = 3;

const player = document.getElementById("player");
const floorText = document.getElementById("floor");
const message = document.getElementById("message");
const game = document.getElementById("game");

const speed = 15;
const playerWidth = 40;

/* 背景幅（road.pngに合わせる） */
const BACKGROUND_WIDTH = 900;

/* 歩行アニメ */
let walkFrame = 0;
let walking = false;
const BASE_BOTTOM = 80;

/* ===== SE（足音） ===== */
const footstep = new Audio("footstep.mp3");
footstep.volume = 0.4;
let stepCooldown = false;

/* ===== フェード暗転 ===== */
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

/* 背景制限 */
function getBackgroundBounds() {
  const gameWidth = game.clientWidth;
  const left = (gameWidth - BACKGROUND_WIDTH) / 2;
  const right = left + BACKGROUND_WIDTH;
  return { left, right };
}

/* 初期位置 */
let playerX = (game.clientWidth - playerWidth) / 2;
player.classList.add("right");

function updatePlayer() {
  player.style.left = playerX + "px";

  if (walking) {
    walkFrame++;
    const offset = walkFrame % 2 === 0 ? 0 : 2;
    player.style.bottom = BASE_BOTTOM + offset + "px";

    /* 足音 */
    if (!stepCooldown) {
      footstep.currentTime = 0;
      footstep.play();
      stepCooldown = true;
      setTimeout(() => (stepCooldown = false), 250);
    }
  } else {
    player.style.bottom = BASE_BOTTOM + "px";
  }
}

function updateFloorText() {
  floorText.textContent = "階層: " + floor;
}

/* ===== キー操作 ===== */
document.addEventListener("keydown", (e) => {
  message.textContent = "";
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

/* 停止 */
document.addEventListener("keyup", () => {
  walking = false;
  updatePlayer();
});

/* 初期表示 */
updatePlayer();
updateFloorText();
