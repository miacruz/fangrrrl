let player;
let playerPosition;
let targets = []; 
let targetSize = 145; 
let popUpSize = 200;
let popUpImages = []; 
let showPopUp = false; 
let popUpIndex; 
let popUpTimer = 0; 
var bg;

function preload() {
  player = loadImage('star.png');
  popUpImages.push(loadImage('popup1.png'));
  popUpImages.push(loadImage('popup2.png'));
  popUpImages.push(loadImage('popup3.png'));
  bg = loadImage("cafe.jpg");
}

function setup() {
  createCanvas(700, 600);

  playerPosition = createVector(width / 2, height / 2); // Player starting position

  // Create random target positions within canvas boundaries
  for (let i = 0; i < 3; i++) {
    let targetX = random(targetSize / 2, width - targetSize / 2); // Ensure target is fully visible within canvas
    let targetY = random(targetSize / 2, height - targetSize / 2); // Ensure target is fully visible within canvas
    let popUpImage = popUpImages[i % popUpImages.length]; // Select pop-up image
    targets.push(new Target(targetX, targetY, loadImage('target' + i + '.png'), popUpImage));
  }
}


function draw() {
  background(bg);
  filter(BLUR);

  for (let target of targets) {
    if (target instanceof Target) {
      target.display();
    }
  }

  playerPosition.x = mouseX;
  playerPosition.y = mouseY;

  //star player y/n
  image(player, playerPosition.x, playerPosition.y);

  // collisions with targets
  for (let i = 0; i < targets.length; i++) {
    if (targets[i] instanceof Target && !targets[i].found && targets[i].checkCollision(playerPosition.x, playerPosition.y, player.width / 2)) {
      // Set target as found
      targets[i].found = true;
      // Set pop-up index
      popUpIndex = i % 3;
      showPopUp = true;
      popUpTimer = millis() + 10000; // 10 seconds
    }
  }

  // Display pop-up message
  if (showPopUp && millis() < popUpTimer) {
    targets[popUpIndex].displayPopup();
  } else {
    showPopUp = false;
  }
}

function mouseClicked() {
  if (showPopUp) {
    showPopUp = false;
  }
}

class Target {
  constructor(x, y, image, popUpImage) {
    this.position = createVector(x, y);
    this.sprite = image;
    this.found = false;
    this.popUpImage = popUpImage;
  }

  display() {
    let scaleFactor = targetSize / max(this.sprite.width, this.sprite.height);
    let targetWidth = this.sprite.width * scaleFactor;
    let targetHeight = this.sprite.height * scaleFactor;
    image(this.sprite, this.position.x - targetWidth / 2, this.position.y - targetHeight / 2, targetWidth, targetHeight);
  }

  displayPopup() {
    // Calculate pop-up position to the right of the target
    let popupX = this.position.x + targetSize / 2; // Position to the right of the target
    let popupY = this.position.y - this.popUpImage.height / 2; // Center vertically
    let popupWidth = this.popUpImage.width;
    let popupHeight = this.popUpImage.height;
    
    //pop-up message stays in boundaries
    popupX = constrain(popupX, 0, width - popupWidth);
    popupY = constrain(popupY, 0, height - popupHeight);
    
    // Draw the pop-up message
    image(this.popUpImage, popupX, popupY, popupWidth, popupHeight);
  }

  checkCollision(px, py, playerRadius) {
    return dist(px, py, this.position.x, this.position.y) < (targetSize / 2 + playerRadius);
  }
}
