class Tube extends BaseObject {
    constructor(scene, x, y, spriteSheet, idTube) {
        super(scene, x, y, spriteSheet);
        this.scene = scene;

        this._idTube = idTube;

        this.initData();
        this.initInteractive();
    }

    initInteractive() {
        this._sprite.setInteractive();
        this._sprite.on('pointerdown', this.onClicked.bind(this));
    }

    initData() {
        this._maxBalls = 4;
        this._arrayBalls = [];
        this._enableClick = true;
        // this.sprite.setOrigin(0.5, 1);
        // this.sprite.originX = 0.5;   // maybe anchored
    }

    setup(arrBalls) {
        if(null != arrBalls[0]) {
            this._arrayBalls.push(arrBalls[0]);
        }
        if(null != arrBalls[1]) {
            this._arrayBalls.push(arrBalls[1]);
        }
        if(null != arrBalls[2]) {
            this._arrayBalls.push(arrBalls[2]);
        }
        if(null != arrBalls[3]) {
            this._arrayBalls.push(arrBalls[3]);
        }
    }

    onClicked(pointer, gameObject) {
        if(!this._enableClick) return;
        if(!this.scene.isHaveBallFree()) {
            this.getFreeBall();
        }
        else {
            if(this.allowSetBallToThis() || this.scene.returnBallToTube(this)) {
                this.scene.setBallFreeTo(this);
            }
            else {
                // RETURN THE FREE BALL TO THE TUBE
                this.scene.moveBallFreeToOldTube(this);
            }
        }

        SoundHandler.getInstance().playClickTube();
        this.disable();
    }

    enable() {
        this._enableClick = true;
    }

    disable() {
        this._enableClick = false;
    }

    getFreeBall() {
        // GET FREE BALL FROM THIS TUBE
        var topBall = null;
        topBall = this.getTopBall();

        if( null != topBall ) {
            this.scene.setBallFree(topBall, this);
        }
    }

    allowSetBallToThis() {
        var isAllow = false;

        // CHECK FREE BALL AND TOP BALL
        var checkTopAndFree = true;
        var freeBall = this.scene.getCloneBallFree();
        var topBall = this.getCloneTopBall();
        if(freeBall && topBall) {
            if(!freeBall.isSameType(topBall)) {
                checkTopAndFree = false;
            }
        }


        if(!this.isFull() && checkTopAndFree == true) {
            isAllow = true;
        }

        return isAllow;
    }

    getTopBall() {
        var topBall = null;
        if(this._arrayBalls.length > 0 ) {
            topBall = this._arrayBalls.pop();
        }

        return topBall;
    }

    getCloneTopBall() {
        var topBallClone = null;
        if(this._arrayBalls.length > 0 ) {
            topBallClone = this._arrayBalls[this._arrayBalls.length - 1];
        }

        return topBallClone;
    }

    setTopBall(ball) {
        if(this._arrayBalls.length < this._maxBalls) {
            this._arrayBalls.push(ball);
            this.updatePosBall();
            ball.effect();

            if(this.isFull() && this.isCorrect()) {
                this.showWinEffect();
                
                this.scene.checkEndGame();
            }
        }
    }

    update(deltaTime) {
        this.updatePosBall();
    }

    updatePosBall() {
        var posTubeAtBottom = this.position().y + this.size().y / 2;
        for( var i = 0; i < this._arrayBalls.length; i++ ) {
            if(this._arrayBalls[i].isCanUpdatePosition()) {
                var ballSizeHeight = this._arrayBalls[i].size().y;

                var x = this.position().x;
                var y = posTubeAtBottom - ballSizeHeight / 2 - i * ballSizeHeight;
                this._arrayBalls[i].setPosition(x, y);
            }
        }
    }

    isEmpty() {
        var retVal = true;
        if(0 != this._arrayBalls.length) retVal = false;

        return retVal;
    }

    isFull() {
        var retVal = true;

        if(this._arrayBalls.length != this._maxBalls) retVal = false;

        return retVal;
    }

    isCorrect() {
        var correct = true;

        for( var i = 0; i < this._arrayBalls.length - 1; i++ ) {
            if(!this._arrayBalls[i].isSameType(this._arrayBalls[i + 1])) {
                return false;
            }
        }

        if(this.isEmpty()) correct = true;

        return correct;
    }

    showWinEffect() {
        console.log('congratulation, you Win !');
    }

    isSameId(tube) {
        if(this._idTube == tube.getIdTube()) {
            return true;
        }

        return false;
    }

    getIdTube() {
        return this._idTube;
    }
}