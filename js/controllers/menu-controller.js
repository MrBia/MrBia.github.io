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
        this.updateSelectLevelPopup();
        this.updateSelectTubePopup();
        this.detectChangeScreenSize();
    }

    createTitle() {
        this._title = this.add.sprite(this.width / 2, this.height / 2 - 100, 'spritesheet_title');
    }

    initSnowEffect() {
        this._snowEffect = new SnowEffect(this, 0, 0);
    }

    createButtons() {
        this.play = new PlayButton(this, this.width / 2, this.height / 2 + 120);
        this.sound = new SoundButton(this, this.width / 2 + 280, this.height / 2 - 480);
        this.shop = new ShopButton(this, this.width / 2, this.height / 2 + 250, this );

        this._listButtons.push(this.play);
        this._listButtons.push(this.sound);
        this._listButtons.push(this.shop);
    }

    startGamePlay() {
        this.initSelectLevelPopup();
    }

    startGame(level) {
        if(level > 0) {
            storeCurrentLevel(level);
        }

        this.sceneStopped = true;
        this.scene.start('GamePlay');
    }

    initSettingsPopup() {
        this.disableMenu();
        var x = this.width / 2;
        var y = this.height / 2 - 1000;
        this._settingsPopup = new SettingsPopup(this, x, y);
        this._settingsPopup.show();
    }

    hideSettingsPopup() {
        this.enableMenu();
    }

    initSelectLevelPopup() {
        this.disableMenu();
        var x = this.width / 2;
        var y = this.height / 2 - 1000;
        this._selectLevelPopup = new SelectLevelPopup(this, x, y);
        this._selectLevelPopup.show();
    }

    hideSelectLevelPopup() {
        this.enableMenu();
        this._selectLevelPopup.hide();
        
        this._selectLevelPopup = null;
    }

    updateSelectLevelPopup() {
        if(this._selectLevelPopup) {
            this._selectLevelPopup.update();
        }
    }

    updateSelectTubePopup() {
        if(this._shopPopup) {
            this._shopPopup.update();
        }
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

    onClickShopButton() {
        this.disableMenu();
        var x = this.width / 2;
        var y = this.height / 2 - 1000;
        var totalCoins = getTotalCoins() || 0; // TODO: set total coins here
        this._shopPopup = new SelectTubePopup(this, x, y, this, totalCoins);
        this._shopPopup.show();
    }

    hideShopPopup() {
        this.enableMenu();
        this._shopPopup.hide();
        
        this._shopPopup = null;
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