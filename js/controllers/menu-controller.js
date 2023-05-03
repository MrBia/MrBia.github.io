// MANAGER THE MAIN MENU
class MenuController extends Phaser.Scene {
    handlerScene = null
    sceneStopped = false

    constructor() {
        super("MainMenu");

        this._listButtons = [];
    }

    preload() {
        this.canvasWidth = this.sys.game.canvas.width;
        this.canvasHeight = this.sys.game.canvas.height;

        this.width = this.game.screenBaseSize.width;
        this.height = this.game.screenBaseSize.height;

        // FOR DETECT CHANGE SCREEN SIZE
        this.currentScreenRatio = this.canvasWidth / this.canvasHeight;
    }

    create() {
        this.background = new Background(this, this.width / 2, this.height / 2);
        this.createTitle();
        this.createButtons();
    }

    update(time, delta) {
        this.detectChangeScreenSize();
    }

    createTitle() {
        this._title = this.add.sprite(this.width / 2, this.height / 2 - 100, 'spritesheet_title');
        this._title.setScale(1.2, 1.2);
    }

    initSnowEffect() {
        this._snowEffect = new SnowEffect(this, 0, 0);
    }

    createButtons() {
        this.play = new PlayButton(this, this.width / 2, this.height / 2 + 170);
        this.soundBtn = new SoundButton(this, 1210, 60);

        this._listButtons.push(this.play);
        this._listButtons.push(this.sound);
    }

    startGamePlay() {
        this.startGame(1);
    }

    startGame(level) {
        this.sceneStopped = true;
        this.scene.start('GamePlay');
    }

    detectChangeScreenSize() {
        var newScreenRatio = this.sys.game.canvas.width / this.sys.game.canvas.height;
        if(newScreenRatio != this.currentScreenRatio) {
            this.currentScreenRatio = newScreenRatio;
            this.handleChangeScreenSize();
        }
    }

    handleChangeScreenSize() {
        console.log('Screen Change');
    }

    enableMenu() {
        for( var i = 0; i < this._listButtons.length; i++) {
            this._listButtons[i].enable();
        }
    }

    disableMenu() {
        for( var i = 0; i < this._listButtons.length; i++) {
            this._listButtons[i].disable();
        }
    }
}