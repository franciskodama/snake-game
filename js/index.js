//SELECTORS --------------------------------

const grid = document.querySelector('.grid');
const startButton = document.getElementById('start');
const upButton = document.querySelector('.btn-up');
const downButton = document.querySelector('.btn-down');
const rightButton = document.querySelector('.btn-right');
const leftButton = document.querySelector('.btn-left');
const scoreDisplay = document.getElementById('score');
const audioBite = document.getElementById('audio-bite'); 
const audioStart = document.getElementById('audio-start'); 
const audioDie = document.getElementById('audio-die'); 
const audioTurn = document.getElementById('audio-turn');
const gameOver = document.getElementById('over');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;


//EVENT LISTENERS -------------------------

document.addEventListener('keyup', control);
startButton.addEventListener('click', startGame);
upButton.addEventListener('click', controlUp);
downButton.addEventListener('click', controlDown);
rightButton.addEventListener('click', controlRight);
leftButton.addEventListener('click', controlLeft);


//FUNCTIONS -------------------------------

function createGrid() {
    for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
    squares.push(square);
    }
}
createGrid();

currentSnake.forEach(index => squares[index].classList.add('snake'));

function startGame() {
    //sound effect of the button
    audioStart.play();
    //clear game over animation
    gameOver.classList.remove('gameover');
    gameOver.style.display = 'none';
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    //remove the apple 
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    score = 0;
    //readd new score to browser
    scoreDisplay.textContent = score;
    direction = 1;
    intervalTime = 1000;
    generateApple();
    //readd the class of snake to our new current snake
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    timerId = setInterval(move, intervalTime);
}


function move() {
    if (
    //if snake has hit bottom
    (currentSnake[0] + width >= width*width && direction === width) ||
    //if snake has hit right wall
    (currentSnake[0] % width === width-1 && direction === 1) ||
    //if snake has hit left wall
    (currentSnake[0] % width === 0 && direction === -1) ||
    //if snake has hit top
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
    )
    return playDie(); 

    //remove last element from currentSnake array
    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction);
    
    //deal with snake eating the apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple');
        //sound effect of the bite
        playBite();
        //grow snake by adding class of snake
        squares[tail].classList.add('snake');
        //grow snake array
        currentSnake.push(tail);
        //generate a new apple
        generateApple();
        //add one to the score
        score++;
        //display the current score
        scoreDisplay.textContent = score;
        //speed up the snake
        clearInterval(timerId);
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime);
    }
    squares[currentSnake[0]].classList.add('snake');
}

function generateApple() {
    do {appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
 }
generateApple();

function control(e) {
    // 38 is for the up arrow
    if(e.keyCode === 38) {
        playTurn();
        direction = -width;
    // 39 is right arrow
    } else if(e.keyCode === 39) {
        playTurn();
        direction = 1;
    // 40 is for the down arrow
    } else if(e.keyCode === 40) {
        playTurn();
        direction = +width;
    // 37 is for the left arrow
    } else if(e.keyCode === 37) {
        playTurn();
        direction = -1;
    } else if(e.keyCode === 32) {
        startGame();
    }
}

function controlUp() {
    direction = -width;
    playTurn();
}

function controlDown() {
    direction = +width;
    playTurn();
}

function controlRight() {
    direction = 1;
    playTurn();
}

function controlLeft() {
    direction = -1;
    playTurn();
}

function playBite() { 
    audioBite.play(); 
}

function playStart() { 
    audioStart.play();
}

function playDie() { 
    clearInterval(timerId);
    gameOver.style.display = 'block';
    gameOver.classList.add('gameover');
    audioDie.play();
}

function playTurn() { 
    audioTurn.play(); 
}


