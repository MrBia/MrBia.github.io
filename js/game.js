var gameSettings = {
    playerSpeed: 60,
}

const SIZE_WIDTH_SCREEN = 1280
const SIZE_HEIGHT_SCREEN = 720

window.onload = function() {
    var config = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.ScaleModes.FIT,
            autoCenter: Phaser.Scale.ScaleModes.CENTER_BOTH,
            parent: 'game',
            width: SIZE_WIDTH_SCREEN,
            height: SIZE_HEIGHT_SCREEN,
        },
        backgroundColor: '#000',
        scene: [PreLoader, LoadingScreenController, MenuController, GameController],
        
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
    }
    this.game = new Phaser.Game(config);

    this.game.screenBaseSize = {
        width: SIZE_WIDTH_SCREEN,
        height: SIZE_HEIGHT_SCREEN
    }
}
