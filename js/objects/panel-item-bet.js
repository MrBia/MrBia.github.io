class PanelItemBet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
     
        this._x = x;
        this._y = y;
        this._scene = scene;
        this._indexItemSelect = null;
        this._listItemBet = [];
        this._listItemSelect = [];
        this._enableSet = true;

        this.initItems();
    }

    initItems() {
        var indexItem = 0;
        for(var i = 0; i < 3; i++) {
            for(var j = 0; j < 3; j++) {
                var x = this._x + (j * 125);
                var y = this._y + (i * 80);
                var itemBet = new ItemBet(this._scene, x, y, this, indexItem);
                indexItem += 1;
                this._listItemBet.push(itemBet);
            }
        }
    }

    getItemSelect() {
        var listName = [];
        for(var i = 0; i < this._listItemSelect.length; i++) {
            listName.push(this._listItemBet[this._listItemSelect[i]].getNameItem());
        }
        return listName;
    }

    isInList(indexItem) {
        for(var i = 0; i < this._listItemSelect.length; i++) {
            if(this._listItemSelect[i] == indexItem) return true;
        }

        return false;
    }

    listRemoveItem(indexItem) {
        var tempList = [];
        for(var i = 0; i < this._listItemSelect.length; i++) {
            if(this._listItemSelect[i] != indexItem) {
                tempList.push(this._listItemSelect[i]);
            }
        }

        this._listItemSelect = [];
        this._listItemSelect = tempList;
    }

    listAddItem(indexItem) {
        this._listItemSelect.push(indexItem);
    }

    enableSet() {
        this._enableSet = true;
    }

    disableSet() {
        this._enableSet = false;
    }

    onClickItem(indexItem) {
        if(!this._enableSet) return;
        
        if(this.isInList(indexItem)) {
            this.listRemoveItem(indexItem);
        }
        else {
            if(this._listItemSelect.length == 2) return;
            this.listAddItem(indexItem);
        }

        for(var i = 0; i < this._listItemBet.length; i++) {
            this._listItemBet[i].initStartState();
        }

        for(var i = 0; i < this._listItemSelect.length; i++) {
            this._listItemBet[this._listItemSelect[i]].setSelect();
        }

        this.checkCanSpin();
    }

    checkSelected() {
        if(this._listItemSelect.length > 0) return true;
        return false;
    }

    checkCanSpin() {
        if(this._scene) this._scene.checkConditionToSpin();
    }
}