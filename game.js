let lastRendertime = 0;
import { SNAKE_SPEED, update as SnakeUpdate, draw as SnakeDraw, getSnakeHead,
 snakeIntersection, DisplayScore,CheckHighScore} from './snake.js';
import { update as FoodUpdate, draw as FoodDraw} from './food.js';
import { outsideGrid } from './grid.js';
const GameBoard = document.getElementById('gameboard');
const ScoreBoard = document.getElementById('Score');
const HighScoreBoard = document.getElementById('High-score');
let gameOver = false;

function main(currentTime) {
  if(gameOver) {
    if(confirm('Press ok to restart')) {
      window.location = 'https://ted-force.github.io/SnakeGame/';
    }
    return 
  }


    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRendertime)/ 1000;
    if(secondsSinceLastRender < 1/SNAKE_SPEED) return

    console.log('Render');
    lastRendertime = currentTime;

    Update();
    Draw();
}


window.requestAnimationFrame(main)

function Update() {
  SnakeUpdate();
  FoodUpdate();
  checkDeath();
  DisplayScore(ScoreBoard);
  CheckHighScore(HighScoreBoard);

}

function Draw() {
  GameBoard.innerHTML = '';
  SnakeDraw(GameBoard);
  FoodDraw(GameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
