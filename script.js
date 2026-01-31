const player = document.getElementById("player");

let x = 50; // 画面中央（%）
const speed = 2;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    x -= speed;
    if (x < 5) x = 5;
    player.style.left = x + "%";
    player.classList.add("left");
  }

  if (e.key === "ArrowRight") {
    x += speed;
    if (x > 95) x = 95;
    player.style.left = x + "%";
    player.classList.remove("left");
  }
});
