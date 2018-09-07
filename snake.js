var snake;

function setup() {
  createCanvas(600, 600);
  frameRate(10);
  
  snake = new Snake();
  snake.addFood();
}

function draw() {
  background(100, 100, 100);
  
  if(snake.eatFood()) {
    console.log('foi');
    snake.addFood();
    snake.addTail();
  }
  
  snake.update();
  snake.show();
  snake.death();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && snake.xSpeed === 0) {
    snake.dir(-1,0);
  } else if (keyCode === RIGHT_ARROW && snake.xSpeed === 0) {
    snake.dir(1,0);
  } else if (keyCode === UP_ARROW && snake.ySpeed === 0) {
    snake.dir(0,-1);
  } else if (keyCode === DOWN_ARROW && snake.ySpeed === 0) {
    snake.dir(0,1);
  }
  
  if(keyCode === BACKSPACE) {
    snake.addTail();
  }
}

function Snake() {
  this.x = 300;
  this.y = 300;
  this.xSpeed = 20;
  this.ySpeed = 0;
  this.tail = [createVector(this.x, this.y)];
  //this.food = createVector(random(0, 600), random(0, 600));
  
  this.death = function() {
    for(let i=0; i<this.tail.length;i++) {
      let d = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
      if(d < 10 || this.x < 1 || this.x > 580 || this.y < 1 || this.y > 580) {
        this.x = 300;
        this.y = 300;
        this.xSpeed = 20;
        this.ySpeed = 0;
        this.tail = [createVector(this.x, this.y)];
        this.addFood();
      }
    }
  }
  
  this.eatFood = function() {
    let d = dist(this.x, this.y, this.food.x, this.food.y);
    if(d < 10) {
      return true;
    } else {
      return false;
    }
  }
  
  this.addFood = function() {
    let cols = floor(600/20);
    let rows = floor(600/20);
    this.food = createVector(floor(random(cols)), floor(random(rows)));
    this.food.mult(20);
  }
  
  this.addTail = function() {
    this.tail.push(createVector(this.x, this.y));
  }
  
  this.dir = function(x, y) {
    this.xSpeed = 20*x;
    this.ySpeed = 20*y;
  }
  
  this.update = function() {
    for(let i=0; i<this.tail.length-1;i++) {
      this.tail[i] = this.tail[i+1]; 
    }
    this.tail[this.tail.length-1] = createVector(this.x, this.y);
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  
  this.show = function() {
    fill(255, 0, 255);
    rect(this.food.x, this.food.y, 20, 20);
    for(let i=0; i<this.tail.length; i++) {
      fill(255, 255, 255);
      rect(this.tail[i].x, this.tail[i].y, 20, 20);
    }
    fill(255, 255, 255);
    rect(this.x, this.y, 20, 20);
  }
}