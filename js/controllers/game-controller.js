// MANAGER THE LIFE CYCLE OF THE GAME AND BUTTONS
class GameController extends Phaser.Scene {
    constructor() {
        super("GamePlay");

    }

    preload() {
        this.canvasWidth = this.sys.game.canvas.width;
        this.canvasHeight = this.sys.game.canvas.height;

        this.width = this.game.screenBaseSize.width;
        this.height = this.game.screenBaseSize.height;
    }

    create() {
        this.background = new Background(this, this.width / 2, this.height / 2);
        this.logo = new Logo(this, this.width / 2 + 50, this.height / 5);
        this.logo.setScale(0.15, 0.15);

        this.initButtons();
        this.initSnowEffect();
        this.startGame();
    }

    startGame() {
        // CALLED WHEN START GAME, REPLAY GAME, NEXT GAME
        this.initData();
        this.initLevel();
        this.initCoins();

        if(1 == this._currentLevel)
        {
            this.initTutorial();
        }
    }

    initData() {
        this._enableWorking = true;
        this._currentLevel = this.getLevel();
        // this._currentLevel = 1;             // FOR TEST
        this._data = LEVEL_INFOR[this._currentLevel];
        this._listTubes = [];
        this._listBalls = [];
        this._tubeType = this.getTubeType();
        this._ballFree = null;
        this._tubeGetBallFree = null;
        this._distanceBallUp = 150;          // THE SPACE UP COMPARE WITH TOP OF THE TUBE
        this._totalCoins = this.getCoins();
        this._iconCoin = null;
        this._textTotalCoin = null;

        console.log('Current level: ' + this._currentLevel);
    }

    initButtons() {
        this._buttonPause = new PauseButton(this, this.width / 2 + 280, this.height / 2 - 480);
    }

    initSnowEffect() {
        this._snowEffect = new SnowEffect(this, this.width / 2, this.height / 2, this.canvasWidth + 300, this.canvasHeight + 80);
    }

    initCoins() {
        if(null == this._iconCoin) {
            this._iconCoin = new IconCoins(this, this.width / 2 - 300, this.height / 2 - 480);
            this._iconCoin.setScale(0.8, 0.8);
        }

        if(null == this._textTotalCoin) {
            this._textTotalCoin = this.add.text(this.width / 2 - 240, this.height / 2 - 513, this._totalCoins, { fontFamily: 'molot', fontSize: 50, color: '#ff0000' });
        }
    }

    updateCoins() {
        this._textTotalCoin.setText(this._totalCoins);
    }

    initTubes(tubeType, id) {
        var tube = null;
        // TODO: Convert to switch-case
        if(TUBE_TYPES.TUBE_1 == tubeType) {
            tube = new Tube1(this, 100, 200, id);
        }
        else if(TUBE_TYPES.TUBE_2 == tubeType) {
            tube = new Tube2(this, 100, 200, id);
        }
        else if(TUBE_TYPES.TUBE_3 == tubeType) {
            tube = new Tube3(this, 100, 200, id);
        }
        else if(TUBE_TYPES.TUBE_4 == tubeType) {
            tube = new Tube4(this, 100, 200, id);
        }
        else if(TUBE_TYPES.TUBE_5 == tubeType) {
            tube = new Tube5(this, 100, 200, id);
        }
        else if(TUBE_TYPES.TUBE_6 == tubeType) {
            tube = new Tube6(this, 100, 200, id);
        }

        return tube;
    }

    initBalls(ballType) {
        var ball = null;
        var startPos = {
            x: -9999,
            y: -9999
        }
        switch(ballType) {
            case BALL_TYPES.YELLOW:
            {
                ball = new BallYellow(this, startPos.x, startPos.y);
                break;
            }
            case BALL_TYPES.RED:
            {
                ball = new BallRed(this, startPos.x, startPos.y);
                break;
            }
            case BALL_TYPES.GREEN:
            {
                ball = new BallGreen(this, startPos.x, startPos.y);
                break;
            }
            case BALL_TYPES.DARKGREEN:
            {
                ball = new BallDarkgreen(this, startPos.x, startPos.y);
                break;
            }
            case BALL_TYPES.ORANGE:
            {
                ball = new BallOrange(this, startPos.x, startPos.y);
                break;
            }
            case BALL_TYPES.PINK:
            {
                ball = new BallPink(this, startPos.x, startPos.y);
                break;
            }
            case BALL_TYPES.SEABLUE:
            {
                ball = new BallSeablue(this, startPos.x, startPos.y);
                break;
            }
            case BALL_TYPES.SKYBLUE:
            {
                ball = new BallSkyblue(this, startPos.x, startPos.y);
                break;
            }
            case BALL_TYPES.PURPLE:
            {
                ball = new BallPurple(this, startPos.x, startPos.y);
                break;
            }
            case BALL_TYPES.GRAY:
            {
                ball = new BallGray(this, startPos.x, startPos.y);
                break;
            }
        }

        return ball;
    }

    initLevel() {
        var idTube = 0;
        var numberTubes = this._data.numberTube;

        // CREATE TUBES
        for(var i = 0; i < numberTubes; i++) {
            var tube = this.initTubes(this._tubeType, (idTube + i));

            this._listTubes.push(tube);
        }

        // CREATE BALLS
        for(var i = 0; i < numberTubes; i++) {
            var balls = [];
            if(this._data.sort[i]) {        // IF THIS TUBE IS NOT CONTAIN THE BALL (TUBE NULL)
                for(var j = 0; j < this._data.sort[i].length; j++) {
                    var ballType = this._data.sort[i][j];
                    
                    var ball = this.initBalls(ballType);
    
                    balls.push(ball);
                    this._listBalls.push(ball);
                }
            }

            // SET BALLS TO THE TUBE
            this._listTubes[i].setup(balls);
        }

        // SORT THE TUBES ON THE SCREEN
        this.sortTheTubes();
    }

    clearLevel() {
        while(this._listTubes.length > 0)
        {
            var tube = this._listTubes.pop();
            tube.kill();
        }

        while(this._listBalls.length > 0)
        {
            var ball = this._listBalls.pop();
            ball.kill();
        }

        this._iconCoin._sprite.destroy(true);

        this._textTotalCoin.destroy(true);
    }

    update(time, delta) {
        if(this._enableWorking) {
            for(var i = 0; i < this._listTubes.length; i++) {
                this._listTubes[i].update(delta);
            }
        }

        if(this._snowEffect) {
            this._snowEffect.update();
            this._snowEffect.draw();
        }

        if(this._conffetiEffect) {
            this._conffetiEffect.update();
        }
    }

    // =============== END GAME ===============
    checkEndGame() {
        if(this.isEndGame()) {
            this.initConffeti();
            this.initWinPopup();
            this.unlockNextLevel();
        }
    }

    isEndGame() {
        for(var i = 0; i < this._data.numberTube; i++)
        {
            if((this._listTubes[i].isFull() && this._listTubes[i].isCorrect()) ||
                this._listTubes[i].isEmpty()){
                    continue;
            }
            else {
                return false;
            }
        }

        return true;
    }

    // =========================================

    initTutorial() {
        this.disableGame();
        var x = this.width / 2;
        var y = this.height / 2 - 1000;
        this._tutorialPopup = new TutorialPopup(this, x, y);
        this._tutorialPopup.show(400);
    }

    initPausePopup() {
        this.disableGame();
        var x = this.width / 2;
        var y = this.height / 2 - 1000;
        this._pausePopup = new PausePopup(this, x, y);
        this._pausePopup.show();
    }

    initConffeti() {
        this._conffetiEffect = new ConffetiEffect(this, this.width / 2, this.height / 2);

        setTimeout(function() {
            this._conffetiEffect.clear();
            this._conffetiEffect.destroy(true);
            this._conffetiEffect = null;
        }.bind(this), 2500);
    }

    initWinPopup() {
        this.disableGame();
        var delay = 700;
        var x = this.width / 2;
        var y = this.height / 2 - 1000;
        this._winPopup = new WinPopup(this, x, y);
        this._winPopup.show(delay);

        this._totalCoins = this._totalCoins * 1 + (SCORE_WIN_GAME * 1);
        this.updateCoins();
        this.saveCoins(this._totalCoins);
    }

    unlockNextLevel() {
        var lastestLevelUnlock = getLevelWasUnlock() || 1;
        var cLevel = this._currentLevel;

        if(cLevel < lastestLevelUnlock) return;
        
        cLevel = cLevel * 1 + 1 * 1;

        storeLevelWasUnlock(cLevel);
    }

    hideTutorial() {
        this.enableGame();
        this._tutorialPopup.hide();
    }

    hidePausePopup() {
        this.enableGame();
    }

    hideWinPopup() {
        this._winPopup.hide();
    }

    enableGame() {
        this._enableWorking = true;
        this._buttonPause.enable();
        for(var i = 0; i < this._data.numberTube; i++)
        {
            this._listTubes[i].enable();
        }
    }

    disableGame() {
        this._enableWorking = false;
        this._buttonPause.disable();
        for(var i = 0; i < this._data.numberTube; i++)
        {
            this._listTubes[i].disable();
        }
    }

    nextLevel() {
        this.enableGame();
        this.hideWinPopup();
        var nextLevel = (this._currentLevel * 1) + (1 * 1);
        this.saveLevel(nextLevel);
        this.clearLevel();
        this.startGame();
    }

    replayLevel() {
        this.enableGame();
        this.hideWinPopup();
        this.clearLevel();
        this.startGame();
    }

    pauseAndReplayLevel() {
        this.sceneStopped = true;
        this.scene.start('GamePlay');
    }

    sortTheTubes() {
        var paddingLeft         = 50;
        var paddingRight        = 50;
        var spaceVer            = 40;
        var spaceHor            = 40;
        var numberTubes         = this._listTubes.length;
        var maxSizeScreenWid    = this.width;                          // canvas width
        var maxSizeScreenHei    = this.height;           // canvas height
        var tubeWid             = this._listTubes[0].size().x;
        var tubeHei             = this._listTubes[0].size().y;
        var numberLine          = 1;                            // default
        var line                = [];
        var arrLine             = [];
        var maxTubeOnWid        = 0;
        
        var tempTotalSizeWid    = paddingLeft + tubeWid * numberTubes + spaceHor * (numberTubes - 1) + paddingRight;

        if((tempTotalSizeWid % maxSizeScreenWid) != 0) {
            numberLine = Math.floor(tempTotalSizeWid / maxSizeScreenWid) + 1;
        }
        else {
            numberLine = Math.floor(tempTotalSizeWid / maxSizeScreenWid);
        }

        // tubeWid * x + spaceHor * (x - 1) = maxSizeScreenWid - paddingLeft - paddingRight;
        // => x (x: number tube)
        maxTubeOnWid = Math.floor((maxSizeScreenWid - paddingLeft - paddingRight + spaceHor) / (tubeWid+spaceHor));
        for(var iTube = 0; iTube < this._listTubes.length; iTube++) {
            line.push(this._listTubes[iTube]);
            if(line.length == maxTubeOnWid) {
                arrLine.push(line);
                line = [];
            }
        }
        arrLine.push(line);

        var lineHeight          = numberLine * tubeHei + (numberLine - 1) * spaceVer;

        for(var iLine = 0; iLine < arrLine.length; iLine++) {
            var numberTubes     = arrLine[iLine].length;
            var lineWidth       = numberTubes * tubeWid + (numberTubes - 1) * spaceHor;

            for(var iTube = 0; iTube < numberTubes; iTube++) {
                var tube        = arrLine[iLine][iTube];
                var posX        = maxSizeScreenWid / 2 - lineWidth / 2 + iTube * (tubeWid + spaceHor) + tubeWid / 2;
                var posY        = maxSizeScreenHei / 2 - lineHeight / 2 + iLine * (tubeHei + spaceVer) + tubeHei / 2;
                
                tube.setPosition(posX, posY);
            }
        }

        // use window.innerwidth: 0 start at the left screen
        // use maxSizeScreenWid: 0 start at the canvas pos
    }

    setBallFree(ball, tube) {
        if(this._ballFree == null && ball != null) {
            this._ballFree = ball;
            this._tubeGetBallFree = tube;

            this.moveBallFreeUp();
        }
    }

    getBallFree() {
        if( null != this._ballFree ) {
            var ball = _this.ballFree;
            this._ballFree = null;
            return ball;
        }

        return null;
    }

    setBallFreeTo(tube) {
        this.moveBallFreeTo(tube);
    }

    getCloneBallFree() {
        if( null != this._ballFree ) {
            return this._ballFree;
        }

        return null;
    }

    isHaveBallFree() {
        if(this._ballFree != null) return true;

        return false;
    }

    returnBallToTube(tube) {
        var yes_return_it = false;
        // CHECK FOR CASE: CLICK TUBE TO GET THE BALL AND RECLICK TUBE FOR RETURN THE BALL
        if(tube.isSameId(this._tubeGetBallFree)) {
            yes_return_it = true;
        }

        return yes_return_it;
    }

    moveBallFreeUp() {
        var timeMove = 100;
        this.tweens.add({
            targets: this._ballFree.getSprite(),
            y: this._tubeGetBallFree.position().y - this._distanceBallUp,
            duration: timeMove,

            onComplete: function() {
                this.moveBallFreeDone();
            }.bind(this)
        });
    }

    moveBallFreeTo(tube) {
        var time = 5;
        var vector = {
            x: this._ballFree.position().x - tube.position().x,
            y: this._ballFree.position().y - tube.position().y
        }
        var distance = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
        var timeMove = ( distance / time ) * time;
        timeMove = 150;

        // Prevent click tubes
        for(var i = 0; i < this._data.numberTube; i++)
        {
            this._listTubes[i].disable();
        }

        this.moveTo_tween = this.tweens.add({
            targets: this._ballFree.getSprite(),
            x: tube.position().x,
            y: tube.position().y - this._distanceBallUp,
            duration: timeMove,
            onComplete: function() {
                if(!this._ballFree) return;
                this.tweens.add({
                    targets: this._ballFree.getSprite(),
                    x: tube.position().x,
                    y: tube.position().y - tube.size().y / 3,
                    duration: 50,
                    onComplete: function() {
                        tube.setTopBall(this._ballFree);
                        this._ballFree = null;
                        this._tubeGetBallFree = null;
                        // enable click tubes
                        for(var i = 0; i < this._data.numberTube; i++)
                        {
                            this._listTubes[i].enable();
                        }
                    }.bind(this)
                });
            }.bind(this)
        });
    }

    moveBallFreeToOldTube(tube) {
        var timeMove = 200;
        this.moveTo_tween = this.tweens.add({
            targets: this._ballFree.getSprite(),
            x: this._tubeGetBallFree.position().x,
            y: this._tubeGetBallFree.position().y - this._distanceBallUp,
            duration: timeMove,
            onComplete: function() {
                this._tubeGetBallFree.setTopBall(this._ballFree);
                this._ballFree = null;
                this._tubeGetBallFree = null;

                arguments[0].getFreeBall();
            }.bind(this, tube)
        });
    }

    moveBallFreeDone() {
        // ENABLE CLICK THE TUBE
        // to prevent spamming click
        for(var i = 0; i < this._data.numberTube; i++)
        {
            this._listTubes[i].enable();
        }
    }

    saveLevel(level) {
        if(level > 0) {
            storeCurrentLevel(level);
        }
    }

    getLevel() {
        var level = getCurrentLevel();
        if(!level) {
            level = 1;
            storeCurrentLevel(level);
        }

        return level;
    }

    saveTubeType(tubeType) {
        storeCurrentTubeType(tubeType);
    }

    getTubeType() {
        var tubeType = getCurrentTubeType();
        if(!tubeType) {
            tubeType = TUBE_TYPES.TUBE_1;
            storeCurrentTubeType(tubeType);
        }

        return tubeType;
    }

    saveCoins(coins) {
        if(coins >= 0) {
            storeTotalCoins(coins);
        }
    }

    getCoins() {
        var totalCoins = getTotalCoins();
        if(null == totalCoins) {
            totalCoins = 0;
        }
        return totalCoins;
    }
}