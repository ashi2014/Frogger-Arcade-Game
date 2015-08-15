/*GLOBAL CONSTANTS*/
//Define boundaries of the game board
var blockWidth = 101;
var blockHeight = 83;
var leftBound = 0;
var rightBound = 4 * blockWidth;
var upperBound = 0;
var lowerBound = 6 * blockWidth;
//Player start position
var playerStartRow = 6;
var playerStartCol = 3;
var playerStartX = blockWidth * (playerStartCol - 1);
var playerStartY = blockHeight * (playerStartRow - 1);
//Enemy constants
var numEnemies = 3;
var enemySpeeds = [150, 300];
var enemyStartX = 0;
var enemyStartY = [blockHeight, blockHeight * 2, blockHeight * 3];


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = x;
	this.y = y;
	this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += (this.speed * dt);
	//If enemy has reached the far right, remove from AllEnemies and add a new enemy
	if (this.x > rightBound) {
		this.x = 0;
		this.y = enemyStartY[randNum([0, 2])];
		this.speed = randNum(enemySpeeds);
		//var yPos = this.y;
		//var theEnemy = allEnemies.indexOf(this);
		//allEnemies.splice(theEnemy, 1);
		//allEnemies.push(new Enemy(enemyStartX, enemyStartY[yPos], Math.random() * maxSpeed));
	}
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
	this.sprite = 'images/char-boy.png';
	this.x = x;
	this.y = y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function() {
	
}

Player.prototype.resetPlayer = function() {
	this.x = playerStartX;
	this.y = playerStartY;
}

Player.prototype.handleInput = function(theKey) {
	if(theKey == 'left') {
		if((this.x - blockWidth) >= leftBound) this.x-= blockWidth;
	}
	else if(theKey == 'right') {
		if((this.x + blockWidth) <= rightBound) this.x+=blockWidth;
	}
	else if(theKey == 'up') {
		if((this.y - blockHeight) >= upperBound) this.y-=blockHeight;
	}
	else if(theKey == 'down') {
		if((this.y + blockHeight) <= lowerBound) this.y+=blockHeight;
	}
	//console.log(this.x, this.y);
	//If player has reached the water, then reset to start position
	if (this.y == upperBound) {
		var obj = this;
		setTimeout(function(){
			obj.resetPlayer()}, 500);
	}
	
	/*//If player has collides with enemy, reset to start position
	for (i = 0; i < numEnemies; i++) {
		if (this.x == allEnemies[i].x && this.y == allEnemies[i].y ) {
			this.resetPlayer();
			break;		
		}
	}*/
	
}
//Generates a random number within a given range. Input is an array in the form [min, max]
function randNum(arr) {
 return Math.floor(Math.random()*(arr[1] - arr[0] + 1)) + arr[0];
}
 

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for (i = 0; i < numEnemies; i++) {
	allEnemies.push(new Enemy (enemyStartX, enemyStartY[randNum([0,2])], randNum(enemySpeeds)));
}
player = new Player(playerStartX,playerStartY);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
