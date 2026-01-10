let floor = 1;
const maxFloor = 3;

const player = document.getElementById("player");
const floorText = document.getElementById("floor");
const message = document.getElementById("message");
const game = document.getElementById("game");

const speed = 15;
const playerWidth = 40;

/* 1階層の長さ（px） */
const WORLD_WIDTH = 3000;

/* 世界座標 */
let worldX = WORLD_WIDTH / 2;

/* カメラ */
let cameraX = 0;

/* 歩行 */
let walking = false;
let walkFrame = 0;
const BASE_BOTTOM = 80;

/* 足音 */
const footstep = new Audio("footstep.mp3");
footstep.volume = 0.4;
let audioUnlocked = false;
let lastStepFrame = 0;

function updateFloorText() {
  floorText.textContent = "階層: " + floor;
}

function updateCamera() {
  cameraX = worldX - game.clientWidth / 2;
  cameraX = Math.max(0, Math.min(cameraX, WORLD_WIDTH - game.clientWidth));

  /* 背景スクロール */
  game.style.backgroundPositionX = -cameraX + "px";

  /* プレイヤー画面位置 */
  const screenX = worldX - cameraX;
  player.style.left = screenX + "px";
}

function updatePlayer() {
  if (walking) {
    walkFrame++;
    const offset = walkFrame % 2 === 0 ? 0 : 2;
    player.style.bottom = BASE_BOTTOM + offset + "px";

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

document.addEventListener("keydown", (e) => {
  message.textContent = "";

  if (!audioUnlocked) {
    footstep.play().catch(() => {});
    audioUnlocked = true;
  }

  walking = false;

  if (e.key === "ArrowLeft") {
    walking = true;
    player.classList.remove("right");
    player.classList.add("left");
    worldX -= speed;
  }

  if (e.key === "ArrowRight") {
    walking = true;
    player.classList.remove("left");
    player.classList.add("right");
    worldX += speed;
  }

  /* 世界の端 */
  if (worldX < 0) {
    worldX = 0;
    message.textContent = "これ以上戻れません";
  }

  if (worldX > WORLD_WIDTH - playerWidth) {
    worldX = WORLD_WIDTH - playerWidth;
    message.textContent = "これ以上先はありません";
  }

  updatePlayer();
  updateCamera();
  updateFloorText();
});

document.addEventListener("keyup", () => {
  walking = false;
});

/* 初期表示 */
updateCamera();
updateFloorText();
