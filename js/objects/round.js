class Round extends BaseObject {
    constructor(scene, x, y) {
        super(scene, x, y, "spritesheet_round");

        this.text = null;
        this.setScale(0.5, 0.5);
        this.initText();
    }

    initText() {
        this.text = this._scene.add.text(this.position().x, this.position().y, 'Round 1', { fontFamily: 'molot', fontSize: 50, color: 'white' });
        this.text.setOrigin(0.5, 0.5);
        this.text.setDepth(150);
    }

    updateTextPos() {
        this.text.setPosition(this.position().x, this.position().y);
    }

    setRound(round) {
        this.text.setText('Round ' + round);
    }
}