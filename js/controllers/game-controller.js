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

        this.initSnowEffect();
        this.initButtons();
        this.startGame();
    }

    startGame() {
        this.boxes = [];
        this.cat = null;
        this.round = null;
        this.currentRound = 1;
        this.roundAddMoreBox = 6;
        this.shuffleDuration = 500;

        if(1 == this.currentRound)
        {
            this.initTutorial();
        }

        // this.createGame();
    }

    createGame() {
        var additionalY = 120;
        if(null == this.cat)
        {
            this.cat = new Cat(this, this.width / 2, 185 + additionalY);
        }

        if(this.boxes.length <= 0) {
            var startPos = 200;
            var gap = 450;
            for(var i = 0; i < 3; i++)
            {
                var box = new Box(this, startPos + (i * gap), this.height / 2 + additionalY, i);
                this.boxes.push(box);
            }
        }

        this.showRound();

        this._eventTimeOut = this.time.addEvent({
            delay: 2000,
            callbackScope: this,
            loop: false,

            callback: function() {
                this.cat.moveToPosition(this.boxes[1]);
            }.bind(this)
        });

        this.disableGame();
    }

    showRound() {
        if(null == this.round) {
            this.round = new Round(this, this.width / 2, -1000);
            this.round.zIndex(100);
        }

        this.round.setPosition(this.width / 2, -1000);
        this.round.setRound(this.currentRound);
        this.tweens.add({
            targets: this.round._sprite,
            x: this.width / 2,
            y: 100,
            duration: 1000,

            onUpdate: function() {
                this.round.updateTextPos();
            }.bind(this),
            onComplete: function() {
                // start game
                // this.startGameplay();
            }.bind(this)
        });
    }

    randomInt(min, max) {
        var ran = Math.floor(Math.random() * ( max + 1 - min ) + min);
        return ran;
    }

    onChoseBox(item) {
        if( this.pausedGame ) return;
        // ig.game.inProgress = true;

        this.disableGame();
        this.isCorrect = false;
        if(item.index == 1)
        {
            this.correctAnswer += 1;
            this.isCorrect = true;
        }
        else {
            this.time.addEvent({
                delay: 1200,
                callback: function(){
                    this.showLosePopup();
                }.bind(this),
                callbackScope: this,
                loop: false
            });
        }

        this.cat.forceToPosition(this.boxes[1]);
        this.cat.showCat();
        var ranInt = this.randomInt(1, 3);
        if(1 == ranInt) {
            SoundHandler.getInstance().playCat1();
        }
        else if(2 == ranInt) {
            SoundHandler.getInstance().playCat2();
        }
        else if(3 == ranInt) {
            SoundHandler.getInstance().playCat3();
        }
    }

    nextRound() {
        this.currentRound += 1;
        this.showRound();

        this.time.addEvent({
            delay: 1200,
            callback: function(){
                this.cat.moveToPosition(this.boxes[1]);
            }.bind(this),
            callbackScope: this,
            loop: false
        });
    }

    startGameplay() {
        this.totalShuffle = this.currentRound + 3;
        if( this.totalShuffle > 23 ) {
            this.totalShuffle = 23;
        }
        this.shuffleCount = 0;
        this.shuffleDuration -= 15;
        if( this.shuffleDuration < 250 ) {
            this.shuffleDuration = 250;
        }

        if( this.currentRound > this.roundAddMoreBox && this.boxes.length < 4 ) {
            this.shuffleDuration = 0.5;

            this._eventTimeOut = this.time.addEvent({
                delay: 500,
                // add more box
                callback: this.addMoreBox.bind(this),
                callbackScope: this,
                loop: false
            });

            return;
        }
        
        this.shuffleBoxes();
    }

    addMoreBox() {
        for( var i = 0; i < this.boxes.length; i++ ) {
            this.boxes[i].setScale(0.8, 0.8);
        }
        this.cat.setScale(0.8, 0.8);
        this.cat.showPos = 340;

        var totalWidth = this.boxes[ 0 ].size().x * 4;
        var space = 40;
        totalWidth += (space * 3);
        var startPos = this.width / 2 - totalWidth / 2 + this.boxes[ 0 ].size().x / 2;

        for( var i = 0; i < this.boxes.length; i++ ) {
            this.tweens.add({
                targets: this.boxes[i]._sprite,
                x: startPos + ( i * this.boxes[i].size().x + space * i ),
                y: this.boxes[i].position().y,
                duration: 500
            });
        }

        this.time.addEvent({
            delay: 1000,
            callback: function() {
                var box = new Box(this, startPos + ( 3 * this.boxes[0].size().x + space * 3 ),this.boxes[0].position().y , 3);
                box.setScale(0.8, 0.8);
                this.boxes.push(box);
                this.currentRound -= 1;
                this.showCatAgain();
            }.bind(this),
            callbackScope: this,
            loop: false
        });
    }

    showCatAgain() {
        this.cat.forceToPosition( this.boxes[ 1 ] );
        this.cat._sprite.alpha = 1;
        this.cat.showCat();
    }

    shuffleBoxes() {
        SoundHandler.getInstance().playShuffling();
        this.disableGame();
        var choices = [];
        for(var i = 0; i < this.boxes.length; i++)
        {
            choices.push(this.boxes[i]);
        }

        var index = Math.floor(Math.random() * choices.length);
        var firstBox = choices[index];
        choices.splice(index, 1);
        
        index = Math.floor(Math.random() * choices.length);
        var secondBox = choices[index];
        choices.splice(index,1);

        var firstAnchoredX = firstBox.position().x;
        var secondAnchoredX = secondBox.position().x;

        this.tweens.add({
            targets: firstBox._sprite,
            x: secondAnchoredX,
            y: secondBox.position().y,
            duration: this.shuffleDuration
        });

        this.tweens.add({
            targets: secondBox._sprite,
            x: firstAnchoredX,
            y: secondBox.position().y,
            duration: this.shuffleDuration,
            
            onComplete: function() {
                this.shuffleCount++;
                if(this.shuffleCount<this.totalShuffle)
                {
                    this.shuffleBoxes();
                }
                else
                {
                    this.enableGame();
                }
            }.bind(this)
        });
    }

    enableGame() {
        for(var i = 0; i < this.boxes.length; i++) {
            this.boxes[i].enableBox();
        }
    }

    disableGame() {
        for(var i = 0; i < this.boxes.length; i++) {
            this.boxes[i].disableBox();
        }
    }

    showLosePopup() {
        this.disableGame();
        this.win = new LosePopup(this, this.width / 2, this.height / 2 - 1000, this);
        this.win.show(0);
    }

    initButtons() {
        this.sound = new SoundButton(this, this.width - 60, this.height / 2 - 300);
        this.back = new BackButton(this, this.width - 160, this.height / 2 - 300, this);
        this.sound.setScale(0.3, 0.3);
        this.back.setScale(0.3, 0.3);
    }

    onClickBackButton() {
        this.scene.start('MainMenu');
    }

    initSnowEffect() {
        this._snowEffect = new SnowEffect(this, this.width / 2, this.height / 2, this.canvasWidth + 300, this.canvasHeight + 80);
    }

    update(time, delta) {
        
    }

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
    }

    hideTutorial() {
        this.enableGame();
        this._tutorialPopup.hide();
        this.createGame();
    }

    hidePausePopup() {
        this.enableGame();
    }

    hideWinPopup() {
        this._winPopup.hide();
    }

    pauseAndReplayLevel() {
        this.sceneStopped = true;
        this.scene.start('GamePlay');
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