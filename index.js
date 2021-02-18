//SELECTORS --------------------------------

const grid = document.querySelector('.grid');
const startButton = document.getElementById('start');
const score = document.getElementById('score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;

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
    //remove last element from currentSnake array
    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction);
    squares[currentSnake[0]].classList.add('snake');
}
move();

let timerId = setInterval(move, 1000);


