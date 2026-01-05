// ===== 基本設定 =====
let floor = 1;
const maxFloor = 3;

const floorText = document.getElementById("floor");
const message = document.getElementById("message");
const playerDiv = document.getElementById("player");
const monsterDiv = document.getElementById("monster");

// プレイヤー左右位置
let playerX = 90;

// 階層ごとのモンスター（仮）
const monsters = {
  1: "スライム",
  2: "ゴブリン",
  3: "ドラゴン"
};

// ===== 階層読み込み =====
function loadFloor() {
  floorText.textContent = floor;
  monsterDiv.textContent = monsters[floor];
  playerX = 90; // 中央に戻す
  updatePlayer();
}

// ===== プレイヤー表示更新 =====
function updatePlayer() {
  playerDiv.style.left = playerX + "px";
}

// ===== キー操作 =====
document.addEventListener("keydown", e => {
  message.textContent = ""; // 毎回メッセージ消す

  if (e.key === "ArrowLeft") {
    playerX -= 10;

    // 左端チェック（次の階層）
    if (playerX < 0) {
      if (floor < maxFloor) {
        floor++;
        loadFloor();
      } else {
        message.textContent = "この先に階層はありません";
        playerX = 0;
        updatePlayer();
      }
      return;
    }
  }

  if (e.key === "ArrowRight") {
    playerX += 10;

    // 右端チェック（前の階層）
    if (playerX > 180) {
      if (floor > 1) {
        floor--;
        loadFloor();
      } else {
        message.textContent = "これ以上戻れません";
        playerX = 180;
        updatePlayer();
      }
      return;
    }
  }

  updatePlayer();
});

// 初期表示
loadFloor();
