const player = document.getElementById("player");
let x = 140;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    x -= 10;
  }
  if (e.key === "ArrowRight") {
    x += 10;
  }

  // 画面外に出ないように制限
  x = Math.max(0, Math.min(280, x));

  player.style.left = x + "px";
});
