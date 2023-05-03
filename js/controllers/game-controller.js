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
        this.effectBg1 = new EffectBackground1(this, this.width / 2, this.height / 2);
        this.effectBg2 = new EffectBackground2(this, this.width / 2, this.height / 2);
        this.effectBg3 = new EffectBackground3(this, this.width / 2, this.height / 2);
        this.effectBg3.setScale(3, 3);

        this.startGame();
    }

    startGame() {
        // // CALLED WHEN START GAME, REPLAY GAME, NEXT GAME
        this._startCoin = 30000;
        this.createGame();
        this.initTutorial();
    }

    createGame() {
        this.homeBtn = new HomeButton(this, 1210, 60, this);
        this.soundBtn = new SoundButton(this, 1210, 160);
        this.panelCoin = new PanelCoin(this, this.width / 2, 60);
        this._totalCoinText = this.add.text(this.width / 2, 60, '$' + this._startCoin, { fontFamily: 'molot', fontSize: 60, color: 'yellow' });
        this._totalCoinText.setOrigin(0.5, 0.5);
        this._wheel = new Wheel(this, this.width / 4, this.height / 2);
        this._panelPriceBet = new PanelPriceBet(this, 930, 600, this._startCoin);
        this._panelSelectItemBet = new PanelItemBet(this, 800, 250);
    }

    isWin(nameResult, listItemBet) {
        for(var i = 0; i < listItemBet.length; i++) {
            if(nameResult == listItemBet[i]) return true;
        }

        return false;
    }

    updateStartCoinForBet() {
        var priceBet = this._panelPriceBet.getPriceBet();
        this.updateStartCoin(-priceBet);
    }

    updateTotalCoinText() {
        this._totalCoinText.setText('$' + this._startCoin);
    }

    updateStartCoin(coin) {
        this._startCoin += coin;
        this.updateTotalCoinText();
    }

    checkConditionToSpin() {
        var betItemCheck = false;
        var priceCheck = false;

        betItemCheck = this._panelSelectItemBet.checkSelected();
        priceCheck = this._panelPriceBet.checkSelected();
        
        if(betItemCheck && priceCheck) {
            this._wheel.enableSpin();
        }
        else {
            this._wheel.disableSpin();
        }
    }

    enableAllPanels() {
        this._panelPriceBet.enableSet();
        this._panelSelectItemBet.enableSet();
    }

    disableAllPanels() {
        this._panelPriceBet.disableSet();
        this._panelSelectItemBet.disableSet();
    }

    isX5(nameResult) {
        if(nameResult == TYPE_ITEM.ITEM_1X5) return true;
        return false;
    }

    isX10(nameResult) {
        if(nameResult == TYPE_ITEM.ITEM_1X10) return true;
        return false;
    }

    onDoneSpin(nameResult) {
        this.enableAllPanels();console.log(nameResult)
        var priceBet = this._panelPriceBet.getPriceBet();
        var listItemBet = this._panelSelectItemBet.getItemSelect();

        if(this.isWin(nameResult, listItemBet)) {
            if(this.isX5(nameResult)) {
                this.updateStartCoin((priceBet * 5));
            }
            else if(this.isX10(nameResult)) {
                this.updateStartCoin((priceBet * 10));
            }
            else {
                this.updateStartCoin((priceBet * 2));
            }
        }
    }

    onClickHomeButton() {
        this.scene.start('MainMenu');
    }

    initButtons() {
        this._buttonPause = new PauseButton(this, this.width / 2 + 280, this.height / 2 - 480);
    }

    update(time, delta) {
        
    }

    initTutorial() {
        this.disableGame();
        var x = this.width / 2;
        var y = this.height / 2 - 1000;
        this._tutorialPopup = new TutorialPopup(this, x, y, this, 50);
        this._tutorialPopup.show(400);
    }

    hideTutorial() {
        this.enableGame();
        this._tutorialPopup.hide();
    }

    disableGame() {
        this.disableAllPanels();
        this.homeBtn.disable();
        this.soundBtn.disable();
        this._wheel.disableSpin();
    }

    enableGame() {
        // enable wheel, prite, bet,...
        this.enableAllPanels();
        this.homeBtn.enable();
        this.soundBtn.enable();
        this.checkConditionToSpin();
    }

    hidePausePopup() {
        this.enableGame();
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