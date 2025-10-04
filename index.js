const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const ResetButton=document.getElementById("btn")
const gamewidth = gameBoard.width;
const gameHeight = gameBoard.height;
const snakeColor = "rgb(0, 255, 0)";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
const boardBackground = "rgb(53, 113, 176)";

let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

let snake = [
  {
    x: unitSize * 4,
    y: 0,
  },
  {
    x: unitSize * 3,
    y: 0,
  },
  {
    x: unitSize * 2,
    y: 0,
  },
  {
    x: unitSize,
    y: 0,
  },
  {
    x: 0,
    y: 0,
  },
];

window.addEventListener("keydown", changeDirection);
gameStart()





function gameStart() {
  running = true;

  createFood();
  drawFood();
  nextTick();
  moveSnake();
  drawSnake();
  hahahah()
}

function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      drawSnake();
      moveSnake();
      nextTick();
      checkGameOver();
    }, 75);
  } else {
    displayGameOver();
  }
}
function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gamewidth, gameHeight);
}
function createFood() {
  function randomFood(max) {
    const randomNumber =
      Math.round((Math.random(max) * max) / unitSize) * unitSize;
    return randomNumber;
  }
  foodX = randomFood(gamewidth - unitSize);
  foodY = randomFood(gamewidth - unitSize);
}
function drawFood() {
  ctx.fillStyle = foodColor; //food color
  ctx.fillRect(foodX, foodY, unitSize, unitSize); //food Rectangle
}
function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head); //add body
  //if food is eaten

  if (snake[0].x == foodX && snake[0].y == foodY) {
    score++;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}
function hahahah(){
  const keyPressed = event.keyCode;
  console.log(keyPressed)
}
function changeDirection(event) {
  const keyPressed = event.keyCode;

  const LEFT = 37;
  const RIGHT = 39;
  const UP = 38;
  const DOWN = 40;

  const goingUp = yVelocity === -unitSize;
  const goingDown = yVelocity === unitSize;
  const goingRight = xVelocity === unitSize;
  const goingLeft = xVelocity === -unitSize;
  if ((running = true)) {
    if (keyPressed == LEFT && !goingRight) {
      xVelocity = -unitSize;
      yVelocity = 0;
    } else if (keyPressed == UP && !goingDown) {
      xVelocity = 0;
      yVelocity = -unitSize;
    } else if (keyPressed == DOWN && !goingUp) {
      xVelocity = 0;
      yVelocity = unitSize;
    } else if (keyPressed == RIGHT && !goingLeft) {
      xVelocity = unitSize;
      yVelocity = 0;
    }
  }

  //   console.log(keyPressed);
}
function checkGameOver() {
  if (running) {
    if (snake[0].x < 0) {
      running = false;
    } else if (snake[0].x >= gamewidth) {
      running = false;
    } else if (snake[0].y < 0) {
      running = false;
    } else if (snake[0].y >= gameHeight) {
      running = false;
    }
  }

  for (let i = 1; i < snake.length; i += 1) {
    if (snake[0].x == snake[i].x && snake[i].y == snake[0].y) running = false;
  }
 
}

function displayGameOver() {
  ctx.font = "50px Mv Boli";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER!", 250, 250);
  running = false;
}
