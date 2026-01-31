const player = document.getElementById("player");

let x = 50; // 中央スタート
const speed = 2;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    x -= speed;
    player.classList.add("left");
  }

  if (e.key === "ArrowRight") {
    x += speed;
    player.classList.remove("left");
  }

  // 画面外に出ない制限
  x = Math.max(5, Math.min(95, x));
  player.style.left = x + "%";
});
