class ItemBet extends BaseButton {
    constructor(scene, x, y, parent, numberItem) {
        super(scene, x, y, 'spritesheet_item_bet');
        
        this._numberItem = numberItem;
        this.initNameItem(numberItem);
        this._parent = parent;
        this.setScale(0.6, 0.6);
        this.initImageItem();
        this.initAnimation(0);
        this.initStartState();
    }

    initNameItem(numberItem) {
        this._nameItem = null;
        switch(numberItem) {
            case 0: this._nameItem = TABLE_ITEM.ITEM1; break;
            case 1: this._nameItem = TABLE_ITEM.ITEM2; break;
            case 2: this._nameItem = TABLE_ITEM.ITEM3; break;
            case 3: this._nameItem = TABLE_ITEM.ITEM4; break;
            case 4: this._nameItem = TABLE_ITEM.ITEM5; break;
            case 5: this._nameItem = TABLE_ITEM.ITEM6; break;
            case 6: this._nameItem = TABLE_ITEM.ITEM7; break;
            case 7: this._nameItem = TABLE_ITEM.ITEM8; break;
            case 8: this._nameItem = TABLE_ITEM.ITEM9; break;
            default: this._nameItem = TABLE_ITEM.ITEM9; break;
        }
    }

    getNameItem() {
        return this._nameItem;
    }

    initAnimation(indexBlock) {
        this._scene.anims.create({
            key: 'spritesheet_item_bet_idle',
            frames: this._scene.anims.generateFrameNumbers('spritesheet_item_bet', {start: indexBlock, end: indexBlock}),
            frameRate: 1,
            repeat: -1
        });

        this._scene.anims.create({
            key: 'spritesheet_item_bet_select',
            frames: this._scene.anims.generateFrameNumbers('spritesheet_item_bet', {start: indexBlock + 1, end: indexBlock + 1}),
            frameRate: 1,
            repeat: -1
        });
    }

    initStartState() {
        this._sprite.play({key: 'spritesheet_item_bet_idle' });
    }

    setSelect() {
        this._sprite.play({key: 'spritesheet_item_bet_select' });
    }

    initImageItem() {
        this._imageItem = null;
        switch(this._nameItem) {
            case TABLE_ITEM.ITEM1:
                {
                    this._imageItem = new ImageItemBet(this._scene, this.position().x, this.position().y, 'spritesheet_image_item1');
                    break;
                }
            case TABLE_ITEM.ITEM2:
                {
                    this._imageItem = new ImageItemBet(this._scene, this.position().x, this.position().y, 'spritesheet_image_item2');
                    break;
                }
            case TABLE_ITEM.ITEM3:
                {
                    this._imageItem = new ImageItemBet(this._scene, this.position().x, this.position().y, 'spritesheet_image_item3');
                    break;
                }
            case TABLE_ITEM.ITEM4:
                {
                    this._imageItem = new ImageItemBet(this._scene, this.position().x, this.position().y, 'spritesheet_image_item4');
                    break;
                }
            case TABLE_ITEM.ITEM5:
                {
                    this._imageItem = new ImageItemBet(this._scene, this.position().x, this.position().y, 'spritesheet_image_item5');
                    break;
                }
            case TABLE_ITEM.ITEM6:
                {
                    this._imageItem = new ImageItemBet(this._scene, this.position().x, this.position().y, 'spritesheet_image_item6');
                    break;
                }
            case TABLE_ITEM.ITEM7:
                {
                    this._imageItem = new ImageItemBet(this._scene, this.position().x, this.position().y, 'spritesheet_image_item7');
                    break;
                }
            case TABLE_ITEM.ITEM8:
                {
                    this._imageItem = new ImageItemBet(this._scene, this.position().x, this.position().y, 'spritesheet_image_item8');
                    break;
                }
            case TABLE_ITEM.ITEM9:
                {
                    this._imageItem = new ImageItemBet(this._scene, this.position().x, this.position().y, 'spritesheet_image_item9');
                    break;
                }
        }
    }

    handleClick() {
        if(this._parent) {
            this._parent.onClickItem(this._numberItem);
        }
    }
}