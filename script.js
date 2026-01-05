let floor = 1;
const maxFloor = 3;

const player = document.getElementById("player");
const dungeon = document.getElementById("dungeon");
const floorText = document.getElementById("floor");
const message = document.getElementById("message");
const monster = document.getElementById("monster");

let playerX = window.innerWidth / 2;

// 階層ごとのモンスター
const monsters = {
  1: "スライム",
  2: "ゴブリン",
  3: "ドラゴン"
};

function loadFloor() {
  floorText.textContent = floor;
  monster.textContent = monsters[floor];
  playerX = window.innerWidth / 2;
  updatePlayer();
}

function updatePlayer() {
  player.style.left = playerX + "px";
}

document.addEventListener("keydown", e => {
  message.textContent = "";

  if (e.key === "ArrowLeft") {
    playerX -= 15;

    if (playerX <= 0) {
      if (floor < maxFloor) {
        floor++;
        loadFloor();
      } else {
        message.textContent = "この先に階層はありません";
        playerX = 0;
      }
    }
  }

  if (e.key === "ArrowRight") {
    playerX += 15;

    if (playerX >= window.innerWidth - 30) {
      if (floor > 1) {
        floor--;
        loadFloor();
      } else {
        message.textContent = "これ以上戻れません";
        playerX = window.innerWidth - 30;
      }
    }
  }

  updatePlayer();
});

loadFloor();
