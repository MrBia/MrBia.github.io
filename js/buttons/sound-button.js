class SoundButton extends BaseButton {
    constructor(scene, x, y) {
        super(scene, x, y, "spritesheet_soundbutton");

        this._isOn = !SoundHandler.getInstance().isMute();
        this.toggleSprite();

        this.setScale(0.5, 0.5);
    }

    handleClick() {
        this.toggleButton();
        this.toggleSprite();
        
        if(this._isOn) {
            SoundHandler.getInstance().storageSoundState('on');
        }
        else {
            SoundHandler.getInstance().storageSoundState('off');
        }
    }

    toggleButton() {
        this._isOn = !this._isOn;
    }

    toggleSprite() {
        if(this._isOn) {
            this._sprite.setFrame(0);
        }
        else {
            this._sprite.setFrame(1);
        }
    }
}