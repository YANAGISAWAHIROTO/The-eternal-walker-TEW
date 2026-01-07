let floor = 1;
const maxFloor = 3;

const player = document.getElementById("player");
const floorText = document.getElementById("floor");
const message = document.getElementById("message");
const game = document.getElementById("game");

const speed = 15;
const playerWidth = 40;

/* ===== 道の左右端（★ここが重要） =====
   road.png の見た目に合わせて調整する */
const ROAD_LEFT = 80;   // 左の端
const ROAD_RIGHT = 80;  // 右の端

let playerX = game.clientWidth / 2;

function updatePlayer() {
  player.style.left = playerX + "px";
}

function updateFloorText() {
  floorText.textContent = "階層: " + floor;
}

document.addEventListener("keydown", (e) => {
  message.textContent = "";

  if (e.key === "ArrowLeft") {
    player.classList.remove("right");
    player.classList.add("left");

    playerX -= speed;

    /* 道の左端制限 */
    if (playerX < ROAD_LEFT) {
      if (floor < maxFloor) {
        floor++;
        playerX = game.clientWidth - ROAD_RIGHT - playerWidth;
      } else {
        message.textContent = "これ以上先の階層はありません";
        playerX = ROAD_LEFT;
      }
    }
  }

  if (e.key === "ArrowRight") {
    player.classList.remove("left");
    player.classList.add("right");

    playerX += speed;

    /* 道の右端制限 */
    if (playerX > game.clientWidth - ROAD_RIGHT - playerWidth) {
      if (floor > 1) {
        floor--;
        playerX = ROAD_LEFT;
      } else {
        message.textContent = "これ以上戻れません";
        playerX = game.clientWidth - ROAD_RIGHT - playerWidth;
      }
    }
  }

  updatePlayer();
  updateFloorText();
});

/* 初期表示 */
updatePlayer();
updateFloorText();
