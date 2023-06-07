//initialize the board
const blockSize = 25;
const rows = 20;
const cols = 20;
let board;
let context;

//initialize the location of the snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5

//speed of the snake
let velocityX = 0;
let velocityY = 0;

//body of snake
let snakeBody = [];

//initialize food location variables
let foodX;
let foodY;

let gameOver = false;

window.onload = () => {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup",changeDirection);
    setInterval(update, 160); //redraw board every 100ms
}

const update = () => {

    if (gameOver) return;

    context.fillStyle = "black";
    context.fillRect(0,0, board.width, board.height);

    //draw the food on the canvas
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]); //add a square to the snake body array
        placeFood();
    }

    //move the tail to the prevous segment's location so the snake looks connected
    for (i = snakeBody.length -1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    //moves the segment closest to the head
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    //draw the snake 
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    //draw the body segments of the snake
    for (i=0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over logic
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        alert("GAME OVER- Coded by Orlando Rios");
    }
    for (i=0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("GAME OVER- Coded by Orlando Rios");
        }
    }
}

const changeDirection = (e) => {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1; 
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


const placeFood = () => {
    //(0-1) * cols/rows -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}