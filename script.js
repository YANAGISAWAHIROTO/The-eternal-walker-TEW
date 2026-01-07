let floor = 1;
const maxFloor = 3;

const player = document.getElementById("player");
const floorText = document.getElementById("floor");
const message = document.getElementById("message");
const game = document.getElementById("game");

const speed = 15;
const playerWidth = 40;

/* 背景画像の横幅 */
const BACKGROUND_WIDTH = 900;

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

function updatePlayer() {
  player.style.left = playerX + "px";
}

function updateFloorText() {
  floorText.textContent = "階層: " + floor;
}

document.addEventListener("keydown", (e) => {
  message.textContent = "";
  const bounds = getBackgroundBounds();

  if (e.key === "ArrowLeft") {
    /* ★ 向き変更 */
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
    /* ★ 向き変更 */
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

/* 初期表示 */
updatePlayer();
updateFloorText();
