import { getInputDirection } from "./input.js";
import { outsideGrid } from "./grid.js";
const snakeBody = [
    { x: 11, y: 11}    
]



let l = snakeBody.length;
let newSegments = 0;
export let SNAKE_SPEED = 1;

export function update() {
    addSegments();
    const inputDirection = getInputDirection()
     for(let i = snakeBody.length -2;i >= 0;i--) {
         snakeBody[i + 1] = {...snakeBody[i]};
     }
     snakeBody[0].x += inputDirection.x;
     snakeBody[0].y += inputDirection.y;
     SNAKE_SPEED = 1 + snakeBody.length;

};

export function draw(gameBoard) {
  snakeBody.forEach(segment => {
      const snakeBorderElement = document.createElement('div');
      snakeBorderElement.style.gridRowStart = segment.y;
      snakeBorderElement.style.gridColumnStart = segment.x;
      snakeBorderElement.classList.add('snakeBorder');
      gameBoard.appendChild(snakeBorderElement);

  })

  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);

  })
}

export function ExpandSnake(amount) {
 newSegments += amount;
}

export function onSnake(position, { ignoreHead = false} = {}) {
    
    return snakeBody.some((segment,index) => {
        if(ignoreHead && index === 0) {
            return false
        }
       return equalPosition(segment, position)
    })
}

function equalPosition(pos1, pos2) {
    return (pos1.x === pos2.x && pos1.y === pos2.y);
}

function addSegments() {
    for(let i=0; i < newSegments;i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }

    newSegments = 0
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true})
}

export function DisplayScore(Scoreboard) {
    Scoreboard.innerHTML = "";
    var Score = document.createElement("p");
    Score.innerHTML = snakeBody.length - 1;
    Scoreboard.appendChild(Score);
}

export function CheckHighScore(HighScore) {
    HighScore.innerHTML = "";
    var highscore = localStorage.getItem("HIGHSCORE") ? localStorage.getItem("HIGHSCORE"):0 ;
    let death =  outsideGrid(getSnakeHead()) || snakeIntersection();
    if(death) {
        let Temphighscore = snakeBody.length - 1;
        if(Temphighscore >= highscore) {
            localStorage.setItem("HIGHSCORE",Temphighscore);
        }
        
    }
    let highscorevalue = document.createElement("p");
    highscorevalue.innerHTML = localStorage.getItem("HIGHSCORE");
    HighScore.appendChild(highscorevalue);
}