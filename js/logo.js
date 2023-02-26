class Logo extends BaseObject {
    constructor(scene, x, y) {
        super(scene, x, y, "spritesheet_logo");
        this._scene = scene;
        this.setScale(0.25, 0.25);
    }
}