class IconSelected extends BaseObject {
    constructor(scene, x, y) {
        super(scene, x, y, "spritesheet_iconselected");

        this._scene = scene;
        this._tube = null;

        this.setScale(0.8, 0.8);
    }

    setFor(tube) {
        this._tube = tube;
    }

    update() {
        if(this._tube) {
            this._sprite.x = this._tube._sprite.x;
            this._sprite.y = this._tube._sprite.y;
        }
    }
}