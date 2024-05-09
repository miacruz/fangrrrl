let player;
let playerPosition;
let targets = [];
let targetSize = 145;
let popUpImages = [];
let showPopUp = false;
let popUpIndex;
let popUpTimer = 0;
let fadeInSpeed = 5; // Speed of fade-in effect
let fadeInOpacity = 0; // Opacity for fade-in effect
var bg;

function preload() {
  player = loadImage('.././icons/cursor-click.png');
  popUpImages.push(loadImage('popup-test1.png'));
  popUpImages.push(loadImage('popup-test2.png'));
  popUpImages.push(loadImage('popup-test3.png'));
  bg = loadImage("cafe.jpg");
}

function setup() {
  createCanvas(700, 600);

  playerPosition = createVector(width / 2, height / 2); // Player starting position

  // Create random target positions within canvas boundaries
  for (let i = 0; i < 3; i++) {
    let validPosition = false;
    let targetX, targetY;

    // Keep generating random positions until a valid one is found
    while (!validPosition) {
      targetX = random(targetSize / 2, width - targetSize / 2); // Ensure target is fully visible within canvas
      targetY = random(targetSize / 2, height - targetSize / 2); // Ensure target is fully visible within canvas

      // Check if the new position is at least 250 pixels away from existing targets
      validPosition = targets.every(target => dist(targetX, targetY, target.position.x, target.position.y) >= 250);
    }

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

  // Draw player
  image(player, playerPosition.x, playerPosition.y);

  // Collisions with targets
  for (let i = 0; i < targets.length; i++) {
    if (targets[i] instanceof Target && !targets[i].found && targets[i].checkCollision(playerPosition.x, playerPosition.y, player.width / 2)) {
      // Set target as found
      targets[i].found = true;
      // Set pop-up index
      popUpIndex = i % 3;
      fadeInOpacity = 0; // Reset opacity for fade-in effect
      showPopUp = true;
      popUpTimer = millis() + 10000; // 10 seconds
    }
  }

  // Display pop-up message with fade-in effect
  if (showPopUp && millis() < popUpTimer) {
    fadeInOpacity = min(fadeInOpacity + fadeInSpeed, 255); // Increase opacity
    tint(255, fadeInOpacity); // Apply fade-in effect
    targets[popUpIndex].displayPopup();
    noTint(); // Reset tint
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
    // Calculate pop-up position to the right of the target, with some padding
    let popupX = this.position.x + targetSize / 2 + 5; // Position to the right of the target with padding
    let popupY = this.position.y - this.popUpImage.height / 2; // Center vertically
    let popupWidth = this.popUpImage.width;
    let popupHeight = this.popUpImage.height;

    // Check if there's enough room to display the pop-up image on the right
    if (popupX + popupWidth > width) {
      // Not enough room on the right, display on the left instead
      popupX = this.position.x - targetSize / 2 - popupWidth - 15; // Position to the left of the target with padding
    }

    // Pop-up message stays in boundaries
    popupX = constrain(popupX, 0, width - popupWidth);
    popupY = constrain(popupY, 0, height - popupHeight);

    // Draw the pop-up message
    image(this.popUpImage, popupX, popupY, popupWidth, popupHeight);
  }

  checkCollision(px, py, playerRadius) {
    return dist(px, py, this.position.x, this.position.y) < (targetSize / 2 + playerRadius);
  }
}
