class PreLoader extends Phaser.Scene{
    constructor() {
        super("preloader_image");
    }

    preload() {
        // this.load.image
        this.load.spritesheet('spritesheet_background', 'assets/images/background.png', {frameWidth: 720, frameHeight: 1080});
        
        // ========= LOADING AUDIO =========
        this.load.audio('bgm', ['assets/audio/bgm.mp3']);
        this.load.audio('button', ['assets/audio/button.mp3']);
        this.load.audio('clickTube', ['assets/audio/click-tube.mp3']);

        // ========= LOADING BAR   =========
        this.load.spritesheet('spritesheet_loading_frame', 'assets/loading-bar.png', {frameWidth: 200, frameHeight: 5});

        // ========= LOADING TITLE =========
        this.load.spritesheet('spritesheet_title', 'assets/title.png', {frameWidth: 619, frameHeight: 457});

        // ========= LOADING LOGO =========
        this.load.spritesheet('spritesheet_white_bg', 'assets/white-background.png', {frameWidth: 720, frameHeight: 1080});
        this.load.spritesheet('spritesheet_logo', 'assets/seeva-logo.png', {frameWidth: 3576, frameHeight: 2520});

        // ========= LOADING COINS =========
        this.load.spritesheet('spritesheet_iconcoins', 'assets/icon-coin.png', {frameWidth: 94, frameHeight: 94});
        this.load.spritesheet('spritesheet_iconselected', 'assets/selected-icon.png', {frameWidth: 49, frameHeight: 48});

        // ========= LOADING BUTTONS =========
        this.load.spritesheet('spritesheet_basebutton', 'assets/buttons/base-button.png', {frameWidth: 116, frameHeight: 116});
        this.load.spritesheet('spritesheet_playbutton', 'assets/buttons/play-button.png', {frameWidth: 199, frameHeight: 136});
        this.load.spritesheet('spritesheet_homebutton', 'assets/buttons/home-button.png', {frameWidth: 182, frameHeight: 120});
        this.load.spritesheet('spritesheet_replaybutton', 'assets/buttons/replay-button.png', {frameWidth: 199, frameHeight: 136});
        this.load.spritesheet('spritesheet_pausebutton', 'assets/buttons/pause-button.png', {frameWidth: 199, frameHeight: 136});
        this.load.spritesheet('spritesheet_nextlevelbutton', 'assets/buttons/nextlevel-button.png', {frameWidth: 199, frameHeight: 136});
        this.load.spritesheet('spritesheet_soundbutton', 'assets/buttons/sound-button.png', {frameWidth: 480 / 2, frameHeight: 120});
        this.load.spritesheet('spritesheet_continuebutton', 'assets/buttons/continue-button.png', {frameWidth: 199, frameHeight: 136});
        this.load.spritesheet('spritesheet_shopbutton', 'assets/buttons/shop-button.png', {frameWidth: 182, frameHeight: 120});
        
        // ========= LOADING TUBES =========
        this.load.spritesheet('spritesheet_tube1', 'assets/tubes/tube-1.png', {frameWidth: 54, frameHeight: 164});
        this.load.spritesheet('spritesheet_tube2', 'assets/tubes/tube-2.png', {frameWidth: 54, frameHeight: 164});
        this.load.spritesheet('spritesheet_tube3', 'assets/tubes/tube-3.png', {frameWidth: 54, frameHeight: 164});
        this.load.spritesheet('spritesheet_tube4', 'assets/tubes/tube-4.png', {frameWidth: 54, frameHeight: 164});
        this.load.spritesheet('spritesheet_tube5', 'assets/tubes/tube-5.png', {frameWidth: 54, frameHeight: 164});
        this.load.spritesheet('spritesheet_tube6', 'assets/tubes/tube-6.png', {frameWidth: 54, frameHeight: 164});
    
        // ========= LOADING BALLS =========
        this.load.spritesheet('spritesheet_darkgreen', 'assets/balls/dark-green.png', {frameWidth: 150, frameHeight: 150});
        this.load.spritesheet('spritesheet_gray', 'assets/balls/gray.png', {frameWidth: 150, frameHeight: 150});
        this.load.spritesheet('spritesheet_green', 'assets/balls/green.png', {frameWidth: 150, frameHeight: 150});
        this.load.spritesheet('spritesheet_orange', 'assets/balls/orange.png', {frameWidth: 150, frameHeight: 150});
        this.load.spritesheet('spritesheet_pink', 'assets/balls/pink.png', {frameWidth: 150, frameHeight: 150});
        this.load.spritesheet('spritesheet_purple', 'assets/balls/purple.png', {frameWidth: 150, frameHeight: 150});
        this.load.spritesheet('spritesheet_red', 'assets/balls/red.png', {frameWidth: 150, frameHeight: 150});
        this.load.spritesheet('spritesheet_seablue', 'assets/balls/sea-blue.png', {frameWidth: 150, frameHeight: 150});
        this.load.spritesheet('spritesheet_skyblue', 'assets/balls/sky-blue.png', {frameWidth: 150, frameHeight: 150});
        this.load.spritesheet('spritesheet_yellow', 'assets/balls/yellow.png', {frameWidth: 150, frameHeight: 150});
    
        // ========= LOADING PANEL =========
        this.load.spritesheet('spritesheet_panel', 'assets/popup-panel.png', {frameWidth: 500, frameHeight: 610});


        // ========= SELECT LEVEL  =========
        this.load.spritesheet('spritesheet_complete_icon', 'assets/select-levels/completed-icon.png', {frameWidth: 49, frameHeight: 48});
        this.load.spritesheet('spritesheet_level_panel', 'assets/select-levels/level-panel.png', {frameWidth: 270, frameHeight: 188});
        this.load.spritesheet('spritesheet_return_button', 'assets/select-levels/return-button.png', {frameWidth: 90, frameHeight: 90});
        this.load.spritesheet('spritesheet_previous_button', 'assets/select-levels/previous-button.png', {frameWidth: 135, frameHeight: 175});
        this.load.spritesheet('spritesheet_next_button', 'assets/select-levels/next-button.png', {frameWidth: 135, frameHeight: 175});
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