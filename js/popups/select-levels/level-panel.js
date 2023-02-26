class LevelPanel extends BaseObject {
    constructor(scene, x, y, level, parent) {
        super(scene, x, y, "spritesheet_level_panel");

        this._scene = scene;
        this._level = level;
        this._text = null;
        this._enableClick = true;
        this._parent = parent;
        this._isLock = true;

        this.initText();
        this.initInteractive();
        this.setScale(0.35, 0.35);
    }

    initInteractive() {
        this._sprite.setInteractive();
        this._sprite.on('pointerdown', this.onClicked.bind(this));
    }

    onClicked() {
        if(!this._enableClick) return;

        if(this._parent) {
            this._parent.levelSelected(this._level);
        }
    }

    setState(isLock) {
        this._isLock = isLock || true;

        if(isLock) {
            this.setStateLock();
        }
        else {
            this.setStateUnlock();
        }
    }

    setStateLock() {
        this.disable();
        this.setTransparency(0.4);
    }

    setStateUnlock() {
        this.enable();
        this.setTransparency(1);
        // this.initCompleteIcon();
    }

    hide() {
        this.disable();
        this._sprite.setVisible(false);
        this._text.setVisible(false);
        if(this._completeIcon) this._completeIcon._sprite.setVisible(false);
    }

    show() {
        this.enable();
        this._sprite.setVisible(true);
        this._text.setVisible(true);
        if(this._completeIcon) this._completeIcon._sprite.setVisible(true);
    }

    enable() {
        this._enableClick = true;
    }

    disable() {
        this._enableClick = false;
    }

    initText() {
        this._text = this._scene.add.text(140, 40, this._level, { fontFamily: 'molot', fontSize: 30, color: '#61c200' });
    }

    initCompleteIcon() {
        this._completeIcon = new IconSelected(this._scene, this._sprite.x, this._sprite.y);
    }

    setTransparency(alpha) {
        this._sprite.alpha = alpha;
    }

    getLevel() {
        return this._level;
    }

    updatePositionElements() {
        if(this._text) {
            this._text.x = this._sprite.x - 8;
            this._text.y = this._sprite.y - 20;
        }

        if(this._completeIcon) {
            this._completeIcon._sprite.x = this._sprite.x;
            this._completeIcon._sprite.y = this._sprite.y - 5;
        }
    }

    destroy() {
        if(this._text) this._text.destroy();
        if(this._completeIcon) this._completeIcon._sprite.destroy();

        this._text = null;
        this._completeIcon = null;
    }
}