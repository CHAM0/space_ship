class ParticleSystem {

    constructor(x, y,nb = 500) {
        this.position = new p5.Vector(x,y);
        this.particles = [];
        this.nbParticles = nb;
    }

    addParticle() {
        for (let i=0; i<this.nbParticles; i++) {
            if (this.particles.length < 70 ) {
                let p = new Particle(this.position.x, this.position.y);
                //let p2 = new RectParticle(this.position.x, this.position.y);
                this.particles.push(p);
                //this.particles.push(p2);
            }
        }
    }


    update() {
        //let size = Object.keys(this.particles).length
        for (let i= (this.particles.length - 1); i>=0; i--) {
                let p = this.particles[i];
                p.run();
                if (p.isDead()) {
                    this.particles.splice(i, 1);
                }
        }
    }
}