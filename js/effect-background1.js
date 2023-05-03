class EffectBackground1 extends BaseObject {
    constructor( scene, x, y ){
        super(scene, x, y, "spritesheet_effect1");
        scene.add.existing(this);
    }
}