//SELECTORS --------------------------------

const grid = document.querySelector('.grid');
const startButton = document.getElementById('start');
const score = document.getElementById('score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;

//EVENT LISTENERS -------------------------



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
    return clearInterval(timerId);
     
    //remove last element from currentSnake array
    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction);
    squares[currentSnake[0]].classList.add('snake');
}
move();

let timerId = setInterval(move, 500);

function generateApples() {
    do {
    appleIndex = Math.floor(Math.random() * squares.length);
    

    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
 }
generateApples();




function control(e) {
    // 38 is for the up arrow
    if(e.keyCode === 38) {
        direction = -width;
    // 39 is right arrow
    } else if(e.keyCode === 39) {
        direction = 1;
    // 40 is for the down arrow
    } else if(e.keyCode === 40) {
        console.log("baixo");
        direction = +width;
    // 37 is for the left arrow
    } else if(e.keyCode === 37) {
        direction = -1;
    }
}

document.addEventListener('keyup', control);



