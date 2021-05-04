import { ExpandSnake, onSnake} from './snake.js';
import { RandomGridPosition } from './grid.js';

let food = RandomFood();
let EXPANSION_RATE = 1;

export function update() {
    if(onSnake(food)) {
        ExpandSnake(EXPANSION_RATE)
        food = RandomFood()
    }

};

export function draw(gameBoard) {
  
      const FoodElement = document.createElement('div');
      FoodElement.style.gridRowStart = food.y;
      FoodElement.style.gridColumnStart = food.x;
      FoodElement.classList.add('food');
      gameBoard.appendChild(FoodElement);


}

function RandomFood() {
    let FoodPosition
    while(FoodPosition == null || onSnake(FoodPosition)) {
        FoodPosition = RandomGridPosition()
    }
    return FoodPosition
}