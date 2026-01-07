let floor = 1;
const maxFloor = 3;

const player = document.getElementById("player");
const floorText = document.getElementById("floor");
const message = document.getElementById("message");
const game = document.getElementById("game");

const speed = 15;
const playerWidth = 40;

/* 背景画像の横幅（road.png に合わせる） */
const BACKGROUND_WIDTH = 900;

/* 歩行アニメ用 */
let walkFrame = 0;
let walking = false;
const BASE_BOTTOM = 80; // CSSの bottom と同じ値

function getBackgroundBounds() {
  const gameWidth = game.clientWidth;
  const left = (gameWidth - BACKGROUND_WIDTH) / 2;
  const right = left + BACKGROUND_WIDTH;
  return { left, right };
}

/* 初期位置 */
let playerX = (game.clientWidth - playerWidth) / 2;

/* 初期向き */
player.classList.add("right");

/* 表示更新 */
function updatePlayer() {
  player.style.left = playerX + "px";

  /* ★ 歩行アニメ（上下1px） */
  if (walking) {
    walkFrame++;
    const offset = walkFrame % 2 === 0 ? 0 : 2;
    player.style.bottom = BASE_BOTTOM + offset + "px";
  } else {
    player.style.bottom = BASE_BOTTOM + "px";
  }
}

function updateFloorText() {
  floorText.textContent = "階層: " + floor;
}

/* キー操作 */
document.addEventListener("keydown", (e) => {
  message.textContent = "";
  const bounds = getBackgroundBounds();
  walking = false;

  if (e.key === "ArrowLeft") {
    walking = true;

    /* 向き */
    player.classList.remove("right");
    player.classList.add("left");

    playerX -= speed;

    if (playerX < bounds.left) {
      if (floor < maxFloor) {
        floor++;
        playerX = bounds.right - playerWidth;
      } else {
        message.textContent = "これ以上先の階層はありません";
        playerX = bounds.left;
      }
    }
  }

  if (e.key === "ArrowRight") {
    walking = true;

    /* 向き */
    player.classList.remove("left");
    player.classList.add("right");

    playerX += speed;

    if (playerX + playerWidth > bounds.right) {
      if (floor > 1) {
        floor--;
        playerX = bounds.left;
      } else {
        message.textContent = "これ以上戻れません";
        playerX = bounds.right - playerWidth;
      }
    }
  }

  updatePlayer();
  updateFloorText();
});

/* キーを離したら停止 */
document.addEventListener("keyup", () => {
  walking = false;
  updatePlayer();
});

/* 初期表示 */
updatePlayer();
updateFloorText();
