class SnowEffect extends Phaser.GameObjects.Graphics {
    constructor(scene, x, y, width, height) {
        super(scene, x, y);

        this._scene = scene;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this.initData();
        this.initEffect();

        this.graphics = scene.add.graphics({x: 0, y: 0});
    }

    initData() {
		this._gravityFactor = 0;
        this._size = { x: 20, y: 23 };
		this._colour1 = {r:240,g:240,b:240, a: 1};
		this._colour2 = {r:240,g:240,b:240, a: 0.8};
		this._colour3 = {r:240,g:240,b:240, a: 0.6};
        this._colour = this._colour1;
		this._snowArea = {x:1000,y:1000};
		this._particles = [];
		this._MAXPARTICLES = 60;
		
		this._tilt = Math.floor(Math.random() * 10) - 10;
		this._tiltAngleIncremental =  (Math.random() * 0.07) + .05;
        this._tiltAngle =  0;
		this._angle = 0;
		this._TiltChangeCountdown = 5;
		this._ignorePause =  true;
    }

    initEffect() {
        this._snowArea.x = this._width;
        this._snowArea.y = this._height;
        
        for (var i = 0; i < this._MAXPARTICLES; i++) 
        {
            this._randomColour = Math.floor((Math.random()*3)+1); // 1-3
            
            switch(this._randomColour)
            {
                case 1:
                    this._colour = this._colour1;
                break;

                case 2:
                    this._colour = this._colour2;
                break;

                case 3:
                    this._colour = this._colour3;
                break;
            }
            
            this._particles.push
            ({
                x: Math.random() * this._snowArea.x, //x-coordinate
                y: Math.random() * this._snowArea.y, //y-coordinate
                r: this.randomFromTo(1, 5), //radius
                d: (Math.random() * this._MAXPARTICLES) + 5, //density
                _color: "rgba("+ this._colour.r+","+this._colour.g+","+this._colour.b+","+this._colour.a+")",
                _tilt: Math.floor(Math.random() * 10) - 10,
                _tiltAngleIncremental: (Math.random() * 0.07) + .05,
                _tiltAngle: 0
            });
        }
    }

    update() {
        this._snowArea.x = this._width;
        this._snowArea.y = this._height;
        this._angle += 0.01;
        this._tiltAngle += 0.1;
        this._TiltChangeCountdown--;
        for (var i = 0; i < this._MAXPARTICLES; i++) 
        {
            var p = this._particles[i];
            p._tiltAngle += p._tiltAngleIncremental;
            
            p.y += (Math.cos(this._angle + p.d) + 1 + p.r / 2) / 2;
            p.x += Math.sin(this._angle);
            
            p._tilt = (Math.sin(p._tiltAngle - (i / 3))) * 15;

           
            if (p.x > this._snowArea.x + 5 || p.x < -5 || p.y > this._snowArea.y) 
            {
                if (i % 5 > 0 || i % 2 == 0)
                {
                    this._particles[i] = { x: Math.random() * this._snowArea.x, y: -10, r: p.r, d: p.d, _color: p._color, _tilt: Math.floor(Math.random() * 10) - 10, _tiltAngle: p._tiltAngle, _tiltAngleIncremental: p._tiltAngleIncremental };
                }
                else 
                {
                    if (Math.sin(this.angle) > 0) 
                    {
                        this._particles[i] = { x: -5, y: Math.random() * this._snowArea.y, r: p.r, d: p.d, _color: p._color, _tilt: Math.floor(Math.random() * 10) - 10, _tiltAngleIncremental: p._tiltAngleIncremental };
                    }
                    else 
                    {
                        this._particles[i] = { x: this._snowArea.x + 5, y: Math.random() * this._snowArea.y, r: p.r, d: p.d, _color: p._color, _tilt: Math.floor(Math.random() * 10) - 10, _tiltAngleIncremental: p._tiltAngleIncremental };
                    }
                }
            }
        }
    }

    draw () {
        this.graphics.clear();
        this.graphics.fillStyle(0xf0f0f0, 0.7);

        for (var i = 0; i < this._MAXPARTICLES; i++)
        {
            var p = this._particles[i];
            
            this.graphics.beginPath();
            this.graphics.arc(p.x, p.y, p.r, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), false, 0.01);
            this.graphics.fillPath();
            this.graphics.closePath();
        }
    }

    clear() {
        this._texture.clear();
    }

    randomFromTo (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }
}