class Laser {

    constructor(x,y,mX,mY) {
        this.position = new p5.Vector(x,y);
        this.lifeSpan = 250;
        //tire dans la diretion de la souries
        //this.angle = atan2(mX - x , mY - y);
        //this.velocity = new p5.Vector(sin(this.angle),cos(this.angle));

        this.velocity = new p5.Vector.fromAngle(player.heading - PI/2);

    }

    update() {
        this.velocity.mult(1.2);
        //this.velocity.normalize();
        this.position.add(this.velocity);
        this.velocity.limit(8);
        this.lifeSpan -= 10;
    }

    hit(asteroid) {
        let d = dist(this.position.x, this.position.y, asteroid.position.x, asteroid.position.y);
        if (d < asteroid.r ) {
            return true;
        }
        else {
            return false;
        }
    }

    draw() {
        push();
        fill(255, 0 ,0);
        stroke(255,0,0);
        strokeWeight(3);
        ellipse(this.position.x, this.position.y,3);
        pop();
    }
}