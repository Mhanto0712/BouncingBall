const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
//canvas大小
let canHei = canvas.height;
let canWid = canvas.width;
//球大小與速度
let rBallX = 500;
let rBallY = 60;
let ballX = 500;
let ballY = 60;
let ballR = 20;
let speedX = 20;
let speedY = 20;
//地板大小
let groundX = 20;
let groundY = 500;
let groundH = 5;
canvas.addEventListener("mousemove", (e) => {
  groundX = e.clientX;
});
//製作磚塊
let arrBrick = [];
class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    arrBrick.push(this);
  }
  drawBrick() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  check() {
    return (
      ballX >= this.x - ballR &&
      ballX <= this.x + 50 + ballR &&
      ballY >= this.y - ballR &&
      ballY <= this.y + 50 + ballR
    );
  }
}
console.log(Brick);
function brickPosition(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}
for (let i = 0; i < 10; i++) {
  new Brick(brickPosition(0, 950), brickPosition(0, 550));
}
console.log(arrBrick);

function draw() {
  if (arrBrick.length == 0) {
    clearInterval(game);
    alert("遊戲結束，恭喜你！");
    location.reload();
  }
  //撞到磚塊反彈
  arrBrick.forEach((b, index) => {
    if (b.check()) {
      if (ballY >= b.y + 50 || ballY <= b.y) {
        speedY *= -1;
      } else if (ballX >= b.x + 50 || ballY <= b.x) {
        speedX *= -1;
      }
      arrBrick.splice(index, 1);
      console.log(arrBrick);
    }
  });
  //撞到地板反彈
  function test(ballX, ballY) {
    return (
      ballX >= groundX - ballR &&
      ballX <= groundX + 200 + ballR &&
      ballY >= groundY - ballR &&
      ballY <= groundY + 5 + ballR
    );
  }
  if (test(ballX, ballY)) {
    if (speedY > 0) {
      ballY -= 20;
    } else {
      ballY += 20;
    }
    speedY *= -1;
  }
  //撞到左右牆壁反彈
  if (ballX <= ballR || ballX >= canWid - ballR) {
    speedX *= -1;
  }
  //撞到上下牆壁反彈
  if (ballY <= ballR || ballY >= canHei - ballR) {
    speedY *= -1;
  }
  //圓球移動方向與速度
  rBallX = ballX;
  rBallY = ballY;
  ballX += speedX;
  ballY += speedY;
  if (test(ballX, ballY) && test(rBallX, rBallY)) {
    if (speedX > 0) {
      ballX -= 20;
    } else {
      ballX += 20;
    }
    speedX *= -1;
    speedY *= -1;
    ballX = rBallX += speedX;
    ballY = rBallY += speedY;
  }
  //畫黑色背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canWid, canHei);
  //畫出磚塊
  arrBrick.forEach((b) => {
    b.drawBrick();
  });
  //畫出地板
  ctx.fillStyle = "orange";
  ctx.fillRect(groundX, groundY, 200, groundH);
  //畫出圓球
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballR, 0, 2 * Math.PI);
  ctx.fillStyle = "yellow";
  ctx.fill();
}
let game = setInterval(draw, 25);
