let floor = 1;
const maxFloor = 3;

const floorText = document.getElementById("floor");
const monsterDiv = document.getElementById("monster");
const playerDiv = document.getElementById("player");

let playerX = 80; // 左右位置

// 階層ごとのモンスター（仮）
const monsters = {
  1: "スライム",
  2: "ゴブリン",
  3: "ドラゴン"
};

function loadFloor() {
  floorText.textContent = floor;
  monsterDiv.textContent = monsters[floor];
  playerX = 80; // 階層移動時は中央に戻す
  updatePlayer();
}

function updatePlayer() {
  playerDiv.style.left = playerX + "px";
}

// 左右キー操作
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") {
    playerX -= 10;

    // 左端で次の階層へ
    if (playerX < 0 && floor < maxFloor) {
      floor++;
      loadFloor();
      return;
    }
  }

  if (e.key === "ArrowRight") {
    playerX += 10;

    // 右端で前の階層へ
    if (playerX > 160 && floor > 1) {
      floor--;
      loadFloor();
      return;
    }
  }

  updatePlayer();
});

loadFloor();
