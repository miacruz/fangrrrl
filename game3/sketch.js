 let birdSprite;
    let birdAnimation;
    let pipes = [];
    let score = 0;
let jumpSound;

var bg;

    function preload() {
      birdSprite = loadImage('anastasia-copy.png');
      font = loadFont("Minecraft.ttf");
      
      bg = loadImage("fangirl-landia.jpg");

      soundFormats('mp3', 'ogg');
  jumpSound = loadSound('jump.mp3');
    }   

    function setup() {
      createCanvas(700, 600);
      bird = new Bird(); 
      pipes.push(new Pipe());
      
      textSize(24); 
  textFont(font);
  fill("#22031F");
  stroke("#CC76A1");

  // jumpSound.volume(5);
    }


    // let gamePaused = false;

function draw() {
  background(bg);
  filter(BLUR);

  // && !gamePaused

  if (score >= 5) {
    textSize(32);
    fill(255);
    background("#F2B7C6");
    text('You Win!', width/2-55, height/2);
    // noLoop(); // Stop the game temporarily
    // gamePaused = true;
    // return;
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      background("#F2B7C6");
      text('Game over!', width/2-70, height/2);
      noLoop();
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      score++;
    }
  }

  bird.update();
  bird.show();

  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }

  fill(255);
  textSize(32);
  text(score, 10, 30);
  strokeWeight(3.5);
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
    jumpSound.play();
  }
  
  // if (gamePaused) {
  //   if (key === 'Y' || key === 'y') {
  //     score = 0;
  //     loop(); // Continue the game
  //     gamePaused = false;
  //   } else if (key === 'N' || key === 'n') {
  //     noLoop(); // Stop the game
  //   }
  // }
}



    // function draw() {
    //   background(bg);
    //   filter(BLUR);
    
    //   if (score >= 3) {
    //     textSize(32);
    //     fill(255);
    //     text('You win! Continue? (Y/N)', width/2-230, height/2);
    //     noLoop(); // Stop the game temporarily
    //     return;
    //   }
    
    //   for (let i = pipes.length - 1; i >= 0; i--) {
    //     pipes[i].show();
    //     pipes[i].update();
    
    //     if (pipes[i].hits(bird)) {
    //       background("#F2B7C6");
    //       text('Game over!', width/2-50, height/2);
    //       noLoop();
    //     }
    
    //     if (pipes[i].offscreen()) {
    //       pipes.splice(i, 1);
    //       score++;
    //     }
    //   }
    
    //   bird.update();
    //   bird.show();
    
    //   if (frameCount % 100 == 0) {
    //     pipes.push(new Pipe());
    //   }
    
    //   fill(255);
    //   textSize(32);
    //   text(score, 10, 30);
    //   strokeWeight(3.5);
    // }
    
    // function keyPressed() {
    //   if (key == ' ') {
    //     bird.up();
    //   }
      
    //   if (score >= 3) {
    //     if (key === 'Y' || key === 'y') {
    //       score = 0;
    //       loop(); // Continue the game
    //     } else if (key === 'N' || key === 'n') {
    //       noLoop(); // Stop the game
    //     }
    //   }
    // }
    

    // function draw() {
    //   background(bg);
    //   filter(BLUR); 

    //   for (let i = pipes.length - 1; i >= 0; i--) {
    //     pipes[i].show();
    //     pipes[i].update();

    //     if (pipes[i].hits(bird)) {
    //       background("#F2B7C6");
    //       text('Game over!', width/2-50, height/2);
    //       noLoop();
    //     }

    //     if (pipes[i].offscreen()) {
    //       pipes.splice(i, 1);
    //       score++;
    //     }
    //   }

    //   bird.update();
    //   bird.show();

    //   if (frameCount % 100 == 0) {
    //     pipes.push(new Pipe());
    //   }

    //   fill(255);
    //   textSize(32);
    //   text(score, 10, 30);
    //   strokeWeight(3.5);
    // }

    function keyPressed() {
      if (key == ' ') {
        bird.up();
      }
    }

    class Bird {
      constructor() {
        this.y = height / 2;
        this.x = 64;
        this.gravity = 0.6;
        this.lift = -15;
        this.velocity = 0;
      }

      show() {
        image(birdSprite , this.x, this.y, 60, 80); // Adjust width and height here
      }

      up() {
        this.velocity += this.lift;
      }

      update() {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;

        if (this.y > height) {
          this.y = height;
          this.velocity = 0;
        }

        if (this.y < 0) {
          this.y = 0;
          this.velocity = 0;
        }
      }
    }

    class Pipe {
        constructor() {
    this.spacing = 175;
    this.top = random(height / 6, (3 / 4) * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 2;
    
    // Load pipe image
    this.pipeImageTop = loadImage('pipe-top.png');
    this.pipeImageBottom = loadImage('pipe-bottom.png');
  }

  show() {
    // Draw top pipe
    image(this.pipeImageTop, this.x, 0, this.w, this.top);
    
    // Draw bottom pipe
    image(this.pipeImageBottom, this.x, height - this.bottom, this.w, this.bottom);
  }

      update() {
        this.x -= this.speed;
      }

      offscreen() {
        return this.x < -this.w;
      }

      hits(bird) {
        if (bird.y < this.top || bird.y > height - this.bottom) {
          if (bird.x > this.x && bird.x < this.x + this.w) {
            return true;
          }
        }
        return false;
      }
    }