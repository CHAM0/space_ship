class Asteroid {

    constructor(x = 0.0, y = 0.0, r,vx, vy) {
        if (x && y) {
            this.position = new p5.Vector(x, y);
        } else {
            this.position = new p5.Vector(random(width), random(height));
            this.velocity = new p5.Vector(random(-1,1), random(0.5,2));
            this.r = floor(random(25,55)); // radius = r*2 
        }
        if (r) {
            this.r = r;
        }
        if (vx) {
            this.velocity = new p5.Vector(vx, vy)
        }
    }

    update() {
        this.position.add(this.velocity);
    }

    breakup(asteroid) {
        let tmp = [];
        let a = new Asteroid(asteroid.position.x + asteroid.r/2 - 5, asteroid.position.y + asteroid.r/2, asteroid.r/2,asteroid.velocity.x * random(-1.5,1.5),asteroid.velocity.y * random(-2,2));
        //a.velocity = asteroid.velocity;
        print(a)
        let b = new Asteroid(asteroid.position.x - asteroid.r/2 + 5, asteroid.position.y - asteroid.r/2, asteroid.r/2,asteroid.velocity.x * random(-1.5,1.5),asteroid.velocity.y * random(-2,2));
        b.velocity = asteroid.velocity
        print(b)
        tmp.push(a);
        tmp.push(b);
        return tmp
    }

    edges() {
        if (this.position.x > width + this.r) {
            this.position.x = -this.r/2;
        } else if (this.position.x < -this.r/2) {
            this.position.x = width + this.r;
        }
        if (this.position.y > height + this.r) {
            this.position.y = -this.r/2;
        } else if (this.position.y < -this.r/2) {
            this.position.y = height + this.r;
        }
    }

    draw() {
        fill(180);
        //noFill();
        stroke(1);
        strokeWeight(2);
        push();
        translate(this.position.x, this.position.y);
        beginShape()

        for(let i=0; i<this.r; i++){
            let n = noise(i);
            n = map(n,0,1,-3,3);
            let angle = map(i, 0, this.r, 0, TWO_PI);
            let x = this.r * cos(angle) + n;
            let y = this.r * sin(angle) + n;
            vertex(x,y);
        }
        endShape(CLOSE);
        fill(255,alpha)
        pop();
    }

}