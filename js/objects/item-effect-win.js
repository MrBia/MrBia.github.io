class ItemEffectWin extends BaseObject {
    constructor(scene, x, y) {
        super(scene, x, y, 'spritesheet_winitem');
        
        this.setScale(0.85, 0.85);
    }
}