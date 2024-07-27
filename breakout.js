
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

