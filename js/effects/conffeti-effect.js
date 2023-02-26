class ConffetiEffect extends Phaser.GameObjects.Graphics {
    constructor(scene, x, y) {
        super(scene, x, y);

        this._scene = scene;

        this.initData();
        this.initEffect();

        this.graphics = scene.add.graphics({x: 0, y: 0});
    }

    update() {
        this.anglex += 0.01;
        for (var i = 0; i < this.maxParticles; i++)
        {
            var p = this.particles[i];
            p.tiltAngle += p.tiltAngleIncremental;
            
            p.y += (Math.cos(this.anglex + p.d) + 1 + p.r / 2) / 2;
            p.x += Math.sin(this.anglex);
            p.tilt = (Math.sin(p.tiltAngle - (i / 3))) * 15;

            
            if (p.x > this.W + 5 || p.x < -5 || p.y > this.H)
            {
                if (i % 5 > 0 || i % 2 == 0) //66.67% of the flakes
                {
                    this.particles[i] = { x: Math.random() * this.W, y: -10, r: p.r, d: p.d, color: p.color, tilt: Math.floor(Math.random() * 10) - 10, tiltAngle: p.tiltAngle, tiltAngleIncremental: p.tiltAngleIncremental };
                }
                else {
                    if (Math.sin(this.anglex) > 0) {
                        this.particles[i] = { x: -5, y: Math.random() * this.H, r: p.r, d: p.d, color: p.color, tilt: Math.floor(Math.random() * 10) - 10, tiltAngleIncremental: p.tiltAngleIncremental };
                    }
                    else {
                        this.particles[i] = { x: this.W + 5, y: Math.random() * this.H, r: p.r, d: p.d, color: p.color, tilt: Math.floor(Math.random() * 10) - 10, tiltAngleIncremental: p.tiltAngleIncremental };
                    }
                }
            }
        }

        this.draw();
    }

    draw() {
        this.graphics.clear();
        
        for (var i = 0; i < this.maxParticles; i++)
        {
            var p = this.particles[i];
            
            this.graphics.fillStyle(p.color, 0.7);
            this.graphics.fillRect(p.x + p.tilt + (p.r / 4), p.y, 20, 20);
        }
    }
    
    initEffect () 
    {
        this.maxParticles = this.valMax(50 * 1 + 3, this.particleLimit);

        var colorPool = ["0x1e90ff", "0x6b8e23", "0xffd700", "0xffc0cb", "0x6a5acd", "0xadd8e6", "0xee82ee", "0x98fb98", "0x4682b4", "0xf4a460", "0xd2691e", "0xff0000"];

        for (var i = 0; i < this.maxParticles; i++)
        {
            this.particles.push({
                x: Math.random() * this.W, //x-coordinate
                y: Math.random() * this.H, //y-coordinate
                r: this.randomInt(5, 30), //radius
                d: (Math.random() * this.maxParticles) + 10, //density
                color: colorPool[this.randomInt(0, colorPool.length-1)],
                tilt: Math.floor(Math.random() * 10) - 10,
                tiltAngleIncremental: (Math.random() * 0.07) + .05,
                tiltAngle: 0
            });
        }
    }

    initData() {
        this.size = { x: 0, y: 0 };
        this.confettiArea = {x:720,y:1280};
        this.particles =  [];
        this.maxParticles = 0;
        this.particleLimit = 70;
        this.H = 1280;
        this.W = 720;
        this.anglex = 0;
    }

    valMax(a, b) {
        if(a > b) return a;

        return b;
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    clear() {
        this.graphics.clear();
    }
}