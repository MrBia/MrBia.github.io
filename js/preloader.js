class PreLoader extends Phaser.Scene{
    constructor() {
        super("preloader_image");
    }

    preload() {
        // this.load.image
        this.load.spritesheet('spritesheet_background', 'assets/images/background.png', {frameWidth: 1280, frameHeight: 720});
        
        // ========= LOADING AUDIO =========
        this.load.audio('bgm', ['assets/audio/bgm.mp3']);
        this.load.audio('button', ['assets/audio/button.mp3']);
        this.load.audio('itemEffect', ['assets/audio/item-effect.mp3']);
        this.load.audio('tick', ['assets/audio/tick.mp3']);
        this.load.audio('spinningreel', ['assets/audio/spinning-reel.mp3']);
        this.load.audio('donespin', ['assets/audio/done-spin.mp3']);

        // ========= LOADING BAR   =========
        this.load.spritesheet('spritesheet_loading_frame', 'assets/loading-bar.png', {frameWidth: 200, frameHeight: 5});

        // ========= LOADING TITLE =========
        this.load.spritesheet('spritesheet_title', 'assets/title.png', {frameWidth: 585, frameHeight: 400});

        // ========= LOADING BUTTONS =========
        this.load.spritesheet('spritesheet_basebutton', 'assets/buttons/base-button.png', {frameWidth: 116, frameHeight: 116});
        this.load.spritesheet('spritesheet_playbutton', 'assets/buttons/play-button.png', {frameWidth: 527, frameHeight: 199});
        this.load.spritesheet('spritesheet_homebutton', 'assets/buttons/home-button.png', {frameWidth: 239, frameHeight: 234});
        this.load.spritesheet('spritesheet_replaybutton', 'assets/buttons/replay-button.png', {frameWidth: 199, frameHeight: 136});
        //this.load.spritesheet('spritesheet_settingsbutton', 'assets/buttons/setting-button.png', {frameWidth: 125, frameHeight: 133});
        this.load.spritesheet('spritesheet_pausebutton', 'assets/buttons/pause-button.png', {frameWidth: 239, frameHeight: 234});
        this.load.spritesheet('spritesheet_nextlevelbutton', 'assets/buttons/nextlevel-button.png', {frameWidth: 199, frameHeight: 136});
        this.load.spritesheet('spritesheet_soundbutton', 'assets/buttons/sound-button.png', {frameWidth: 478 / 2, frameHeight: 234});
        this.load.spritesheet('spritesheet_continuebutton', 'assets/buttons/continue-button.png', {frameWidth: 199, frameHeight: 136});
        this.load.spritesheet('spritesheet_shopbutton', 'assets/buttons/shop-button.png', {frameWidth: 182, frameHeight: 120});

        // ========= LOADING PANEL =========
        this.load.spritesheet('spritesheet_panel', 'assets/popup-panel.png', {frameWidth: 335, frameHeight: 387});
    
        this.loadImage();
    }

    loadImage() {
        this.load.spritesheet('spritesheet_wheel_panel', 'assets/images/spins/wheel.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_item1', 'assets/images/spins/item1.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_item2', 'assets/images/spins/item2.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_item3', 'assets/images/spins/item3.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_item4', 'assets/images/spins/item4.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_item5', 'assets/images/spins/item5.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_item6', 'assets/images/spins/item6.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_item7', 'assets/images/spins/item7.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_item8', 'assets/images/spins/item8.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_item9', 'assets/images/spins/item9.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_item10', 'assets/images/spins/item10.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_item11', 'assets/images/spins/item11.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_item12', 'assets/images/spins/item12.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_winitem', 'assets/images/spins/win-item.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_spin_button', 'assets/images/spins/spin.png', {frameWidth: 149, frameHeight: 219});
        this.load.spritesheet('spritesheet_plus_button', 'assets/buttons/plus-button.png', {frameWidth: 239, frameHeight: 234});
        this.load.spritesheet('spritesheet_sub_button', 'assets/buttons/sub-button.png', {frameWidth: 239, frameHeight: 234});
        this.load.spritesheet('spritesheet_frame_price', 'assets/images/frame-price.png', {frameWidth: 185, frameHeight: 128});
        this.load.spritesheet('spritesheet_item_bet', 'assets/images/item-bet.png', {frameWidth: 185, frameHeight: 128});
        this.load.spritesheet('spritesheet_point_check', 'assets/images/point-check.png', {frameWidth: 2, frameHeight: 2});
        this.load.spritesheet('spritesheet_effect1', 'assets/images/effect1.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_effect2', 'assets/images/effect2.png', {frameWidth: 900, frameHeight: 900});
        this.load.spritesheet('spritesheet_effect3', 'assets/images/effect3.png', {frameWidth: 415, frameHeight: 420});

        this.load.spritesheet('spritesheet_image_item1', 'assets/images/spins/fish.png', {frameWidth: 50, frameHeight: 53});
        this.load.spritesheet('spritesheet_image_item2', 'assets/images/spins/chicken.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('spritesheet_image_item3', 'assets/images/spins/crab.png', {frameWidth: 60, frameHeight: 43});
        this.load.spritesheet('spritesheet_image_item4', 'assets/images/spins/deer.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('spritesheet_image_item5', 'assets/images/spins/crawfish.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('spritesheet_image_item6', 'assets/images/spins/gourd.png', {frameWidth: 43, frameHeight: 44});
        this.load.spritesheet('spritesheet_image_item7', 'assets/images/spins/1x2.png', {frameWidth: 60, frameHeight: 43});
        this.load.spritesheet('spritesheet_image_item8', 'assets/images/spins/1x5.png', {frameWidth: 60, frameHeight: 43});
        this.load.spritesheet('spritesheet_image_item9', 'assets/images/spins/1x10.png', {frameWidth: 60, frameHeight: 43});

        this.load.spritesheet('spritesheet_panel_coin', 'assets/images/panel-coin.png', {frameWidth: 264, frameHeight: 58});
        this.load.spritesheet('image_countdownframe', 'assets/images/loading/loading-bar0.png', {frameWidth: 642, frameHeight: 59});
        this.load.spritesheet('image_countdownbar', 'assets/images/loading/loading-bar1.png', {frameWidth: 626, frameHeight: 43});
    }

    create() {
        SoundHandler.setScene(this);
        SoundHandler.getInstance().playBgm();

        // this.setupLocalStore();

        this.scene.start('LoadingScreen');
    }

    setupLocalStore() {
        var data = {
            'current-level': 1,
            'high-score': 0,
            'current-tube': 1,
            'tube-type-was-bought': [1],
            'level-unlock': [1],
            'total-coins': 0
        }
    }
}