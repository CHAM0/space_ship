class Spaceship {

    constructor() {
        this.position = new p5.Vector(width / 2, height / 2);
        this.velocity = new p5.Vector(0.0, 0.0);
        this.acceleration = new p5.Vector(0.0, 0.0);

        //direction 
        this.heading = 0.0;
        //taille
        this.r = 30;
        //resitance
        this.damping = 0.996;
        //vitesse maximum
        this.topSpeed = 6; 
        // avance ? 
        this.thrusting = false;
        this.left = false;
        this.right = false;

    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.mult(this.damping);
        this.velocity.limit(this.topSpeed);

        this.position.add(this.velocity);
        this.acceleration.mult(0);

        if (rightPressed) player.turn(-0.05);
        if (leftPressed) player.turn(0.05);
        if (upPressed) player.thrust();

        this.edges();
    }

    applyForce(force) {
        let f = force.copy();
        //f.div(mass)
        this.acceleration.add(f);
    }

    thrust() {
        let angle = this.heading - PI/2;
        let force = new p5.Vector(cos(angle), sin(angle));
        force.mult(0.07);
        this.applyForce(force);
        this.thrusting = true;

    }

    
    turn(angle) {
        this.heading += angle;
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
        //this.heading += 0.01;
        rectMode(CENTER);
        push();
        translate(this.position.x,this.position.y);
        rotate(this.heading);
        //box
        //rect(0,0,30,30)
        
        // Vaisseau
        stroke(0);
        strokeWeight(1.4);
        fill(225)
        // propulseur arrière
        if (this.thrusting) fill(255,153,52)
        rect(-5,5,5,8,1)
        rect(5,5,5,8,1) 
        fill(255)
        // propulseur gauche
        if (leftPressed) fill(255,153,52)
        rect(-12.5,0,8,5,1);
        fill(255)
        // propulseur droit 
        if (rightPressed) fill(255,153,52)
        rect(12.5,0,8,5,1);
        // jetpack
        fill(255)
        // bras
        rect(-10.5,-9,3,19.5,100)
        rect(10.5,-9,3,20,100)
        // épaule
        rect(-8.5,-8,6,5,100)
        rect(8.5,-8,6.2,5,100)
        fill(225)
        strokeWeight(2)
        rect(0,0, 28, 12);
        // tête
        fill(255);
        //strokeWeight(1)
        ellipse(0,-10,10,10)
        fill(0);
        fill(255)
        ellipse(0,-12.5,7,1.5)
        //centre
        ellipse(0,0,3,3)
        pop();

        this.thrusting = false;
        this.left = false;
        this.tright = false;
    }

    


}
