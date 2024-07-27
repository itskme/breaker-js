
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


canvas.width = 400;
canvas.height = 600;


let paddleWidth = 100;
let paddleHeight = 20;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 20;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 3;
let ballSpeedY = -3;
let ballRadius = 10;
let bricks = [];
let score = 0;

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 10; j++) {
    bricks.push({
      x: j * (canvas.width / 10),
      y: i * 20,
      width: canvas.width / 10,
      height: 20,
      visible: true
    });
  }
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
  

  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.fillStyle = 'black'; 
  ctx.fill();
  
  for (let brick of bricks) {
    if (brick.visible) {
      ctx.fillStyle = 'red';
      ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
    }
  }
  ctx.font = '24px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Score: ${score}`, 10, 10);
}


function update() {

  if (keysPressed['ArrowLeft'] && paddleX > 0) {
    paddleX -= 5;
  }
  if (keysPressed['ArrowRight'] && paddleX < canvas.width - paddleWidth) {
    paddleX += 5;
  }

 
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  
  if (ballY + ballRadius > paddleY && ballX > paddleX && ballX < paddleX + paddleWidth) {
    ballSpeedY = -ballSpeedY;
  }

 
  for (let brick of bricks) {
    if (brick.visible && ballX > brick.x && ballX < brick.x + brick.width && ballY > brick.y && ballY < brick.y + brick.height) {
      brick.visible = false;
      ballSpeedY = -ballSpeedY;
      score++;
    }
  }

 
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballY + ballRadius > canvas.height) {
    alert('Game Over!');
    location.reload();
  }
}


const keysPressed = {};
document.addEventListener('keydown', (e) => {
  keysPressed[e.key] = true;
});
document.addEventListener('keyup', (e) => {
  keysPressed[e.key] = false;
});


function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();