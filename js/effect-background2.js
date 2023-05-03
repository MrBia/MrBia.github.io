class EffectBackground2 extends BaseObject {
    constructor( scene, x, y ){
        super(scene, x, y, "spritesheet_effect2");
        scene.add.existing(this);
    }
}