class Panel extends BaseObject {
    constructor(scene, x, y) {
        super(scene, x, y, "spritesheet_panel");

        this.setScale(0.85, 0.85);
    }
}