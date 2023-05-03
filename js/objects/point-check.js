class PointCheck extends BaseObject {
    constructor(scene, x, y, index) {
        super(scene, x, y, 'spritesheet_point_check');
     
        this._x = x;
        this._y = y;
        this._scene = scene;
        this._index = index;
        this.zIndex(12);
        this.setAlpha(0);
    }
}