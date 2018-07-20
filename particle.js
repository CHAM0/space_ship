class Particle {

    constructor(x,y) {
        this.location = new p5.Vector(x, y);
        this.velocity = new p5.Vector(random(-1,1), random(-2));
        this.acceleration = new p5.Vector(0, 0.08);
        this.lifespan = 150;
        //this.color = color(random(255), random(255), random(255));
        this.R = random(255);
        this.G = random(255);
        this.B = random(255);
    }

    run() {
        this.update();
        this.draw();
    }

    isDead() {
        if (this.lifespan < 50.0){
            return true;
        } else {
            return false;
        }
    }

    update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity)
        this.lifespan -= 2.5;
    }

    draw() {
        //fill(this.R, this.G, this.B, this.lifespan);
        fill(255,0,0, this.lifespan);
        stroke(255,0,0,this.lifespan);
        ellipse(this.location.x, this.location.y, 5);
    }
}

class RectParticle extends Particle {

    constructor(x,y) {
            super(x,y)
            
    }

    draw() {
        //fill(this.R, this.G, this.B, this.lifespan);
        fill(225, this.lifespan);
        stroke(2,this.lifespan);
        rect(this.location.x, this.location.y, 10,10);
    }
    
}