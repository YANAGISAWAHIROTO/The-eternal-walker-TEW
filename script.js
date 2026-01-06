let floor = 1;
const maxFloor = 3;

const player = document.getElementById("player");
const floorText = document.getElementById("floor");
const message = document.getElementById("message");
const game = document.getElementById("game");

let playerX = game.clientWidth / 2;
const speed = 15;
const playerWidth = 40;

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
        playerX = game.clientWidth - playerWidth;
      } else {
        message.textContent = "これ以上先の階層はありません";
        playerX = 0;
      }
    }
  }

  if (e.key === "ArrowRight") {
    playerX += speed;

    if (playerX >= game.clientWidth - playerWidth) {
      if (floor > 1) {
        floor--;
        playerX = 0;
      } else {
        message.textContent = "これ以上戻れません";
        playerX = game.clientWidth - playerWidth;
      }
    }
  }

  updatePlayer();
  updateFloorText();
});

updatePlayer();
updateFloorText();
