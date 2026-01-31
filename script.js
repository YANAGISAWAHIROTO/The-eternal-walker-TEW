const player = document.getElementById("player");

let x = 50; // 中央スタート（%）

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    x -= 2;
    player.classList.add("left");
  }
  if (e.key === "ArrowRight") {
    x += 2;
    player.classList.remove("left");
  }

  // 画面外防止
  x = Math.max(5, Math.min(95, x));
  player.style.left = x + "%";
});
