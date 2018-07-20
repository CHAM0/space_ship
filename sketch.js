let player;
let img;
let gravity;
let particles;
let asteroid;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let spacePressed = false;
let asteroids = [];
let tParticles = [];
let lasers = [];
let cadence = 200;

function preload() {
	img = loadImage('spaceship.png');
}
function setup() {
	createCanvas(1260, 720);
	player = new Spaceship();
	gravity = new p5.Vector(0.0, 0.03);
	//particles = new ParticleSystem(width/2, height/2);
	for (let i=0; i<10; i++) {
		asteroid = new Asteroid()
		asteroids.push(asteroid);
	}
}
function draw() {
	//background(50,89,100);
	background(70);
	player.draw();
	player.update();
	cadence -= 7;

	if (mouseIsPressed) {
		particles = new ParticleSystem(mouseX, mouseY);
		tParticles.push(particles);
	}
	if (spacePressed) {
		print (cadence);
		if (cadence < 0) {
			laser = new Laser(player.position.x, player.position.y, mouseX, mouseY);
			lasers.push(laser);
			cadence =200;
		}
	}

	for (a of asteroids) {
		a.update();
		a.edges();
		a.draw();
	}
	for (let i = lasers.length -1; i >= 0; i--) {
		lasers[i].update();
		lasers[i].draw();
		for (let j = asteroids.length -1; j >= 0; j--) {
			if (lasers[i].hit(asteroids[j])) {
				print("hit");
				let par = [];
				par = new ParticleSystem(asteroids[j].position.x, asteroids[j].position.y + 20);
				par.addParticle();
				tParticles.push(par);
				if(asteroids[j].r > player.r/2) {
					let a = asteroids[j].breakup(asteroids[j])
					asteroids = asteroids.concat(a);
				}	
				asteroids.splice(j, 1);
				lasers.splice(i, 1);
				break							
			}
			
		}
	}

	for (p of tParticles) {
		//p.addParticle();
		p.update();
	}

	//player.applyForce(gravity);

}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
		player.rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
		player.leftPressed = true;
	}
	if (e.keyCode == 38) {
		upPressed = true;
	}
	if (e.keyCode == 32) {
		spacePressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
		player.rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
		player.leftPressed = false;
	}
	if (e.keyCode == 38) {
		upPressed = false
	}
	if (e.keyCode == 32) {
		spacePressed = false
	}
}