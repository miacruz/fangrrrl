let player; // Player sprite
let playerImage; // Image for player sprite
let spriteImages = []; // Array to hold different images for sprites
let sprites = []; // Array to hold multiple sprites
let score = 0; // Initialize score
let dropTimer = 60; // Timer for sprite dropping
let maxSprites = 20; // Maximum number of sprites
var bg;

function preload() {
  playerImage = loadImage('brown-bag.png'); // Load image for player sprite
   spriteImages.push(loadImage('item1.png'));   spriteImages.push(loadImage('item2.png'));
  spriteImages.push(loadImage('item3.png'));
  spriteImages.push(loadImage('item4.png'));
  spriteImages.push(loadImage('item5.png'));
  spriteImages.push(loadImage('item6.png'));
  spriteImages.push(loadImage('item7.png'));
  spriteImages.push(loadImage('item8.png'));
  spriteImages.push(loadImage('item9.png'));
  spriteImages.push(loadImage('item10.png'));
  spriteImages.push(loadImage('item11.png'));
  spriteImages.push(loadImage('item12.png'));
  spriteImages.push(loadImage('item13.png'));
  
  
  font = loadFont("Minecraft.ttf");
  bg = loadImage('store.jpg');
}

function setup() {
  createCanvas(700, 600);
  player = createSprite(width / 2, height - 70);
  player.addImage(playerImage);

  textSize(24);
  textFont(font);
  fill("#22031F");
  stroke("#CC76A1");
  strokeWeight(3.5);
}

function draw() {
  background(bg);
  filter(BLUR);

  // Move player based on mouse position
  player.position.x = mouseX;

  // Check for collision between player and sprites
  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].overlap(player)) {
      score += 1;
      sprites[i].remove(); // Remove sprite on collision
    }
  }

  // Reset sprites when they go off the bottom
  for (let i = 0; i < sprites.length; i++) {
    if (sprites[i].position.y > height + 25) {
      score --; // Subtract 2 from score when sprite reaches bottom without collision
      sprites[i].remove(); // Remove sprite
    }
  }

  // Drop a new sprite after timer expires and there are fewer than 20 sprites
  if (dropTimer <= 0 && sprites.length < maxSprites) {
    createNewSprite(); // Create new sprite
    dropTimer = 60; // Reset drop timer
  } else {
    dropTimer--; // Decrease drop timer
  }

  // Draw sprites
  drawSprites();

  // Display score
  text("Score: " + score, 10, 30);

  // Check win condition
  if (score >= 15) {
    endGame("You Did It!");
  }

  // Check lose condition
  if (score <= -6) {
    endGame("Try Again!");
  }
}

function createNewSprite() {
  let sprite = createSprite(random(width), -25); // No size specified
  let randomIndex = floor(random(spriteImages.length)); // Get a random index for selecting image
  sprite.addImage(spriteImages[randomIndex]); // Add random image to sprite
  sprite.setSpeed(random(1, 3), 90); // Set initial speed and direction
  sprites.push(sprite); // Add sprite to array
}

function endGame(message) {
  clear();
  background("#F2B7C6");
  textAlign(CENTER);
  textSize(32);
  text(message, width / 2, height / 2);
  noLoop(); // Stop draw loop
}