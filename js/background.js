class Background extends Phaser.GameObjects.Sprite {
    constructor( scene, x, y ){
        super(scene, x, y, "spritesheet_background");
        scene.add.existing(this);
    }
}