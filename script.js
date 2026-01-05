let floor = 1;
const maxFloor = 3;

const player = document.getElementById("player");
const floorText = document.getElementById("floor");
const message = document.getElementById("message");

let playerX = window.innerWidth / 2;
const speed = 10;

function updatePlayer() {
  player.style.left = playerX + "px";
}

function updateFloorText() {
  floorText.textContent = "階層: " + floor;
}

document.addEventListener("keydown", (e) => {
  message.textContent = "";

  if (e.key === "ArrowLeft") {
    playerX -= speed;

    if (playerX <= 0) {
      if (floor < maxFloor) {
        floor++;
        playerX = window.innerWidth - 60;
      } else {
        message.textContent = "これ以上先の階層はありません";
        playerX = 0;
      }
    }
  }

  if (e.key === "ArrowRight") {
    playerX += speed;

    if (playerX >= window.innerWidth - 40) {
      if (floor > 1) {
        floor--;
        playerX = 20;
      } else {
        message.textContent = "これ以上戻れません";
        playerX = window.innerWidth - 40;
      }
    }
  }

  updatePlayer();
  updateFloorText();
});

// 初期表示
updatePlayer();
updateFloorText();
