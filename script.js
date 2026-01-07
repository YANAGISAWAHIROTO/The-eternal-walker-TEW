let floor = 1;
const maxFloor = 3;

const player = document.getElementById("player");
const floorText = document.getElementById("floor");
const message = document.getElementById("message");
const game = document.getElementById("game");

const speed = 15;
const playerWidth = 40;

/* ★ 背景画像の実際の横幅（px）
   今の見た目だとだいたいこれくらい */
const BACKGROUND_WIDTH = 900;

/* 画面中央基準で背景の左右端を計算 */
function getBackgroundBounds() {
  const gameWidth = game.clientWidth;
  const left = (gameWidth - BACKGROUND_WIDTH) / 2;
  const right = left + BACKGROUND_WIDTH;
  return { left, right };
}

/* 初期位置：背景の中央 */
let playerX = (game.clientWidth - playerWidth) / 2;

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
    playerX -= speed;

    /* 背景の左端チェック */
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
    playerX += speed;

    /* 背景の右端チェック */
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
