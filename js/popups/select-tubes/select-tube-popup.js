class SelectTubePopup extends Popup {
    constructor(scene, x, y, parent, totalCoins) {        
        super(scene, x, y, parent);

        this._scene = scene;
        this._totalCoins = totalCoins;
        this.setStartState();
    }

    initData(x, y) {
        // INIT DATA HERE
        this._elements = [];
        this._panel = null;
        this._numCols = 3;
        this._numRows = 3;
        this._pages = [];
        this._currentPage = 0;
        this._spacePageX = 600;
        this._listLevel = [];
        this._timeEffect = 250;
        this._timeMovePage = 200;
        this._x = x;
        this._y = y;
        this._totalTubes = 17;
        this._iconSelected = null;
    }

    initElements() {
        this._panel = new Panel(this._scene, this._x, this._y);
        this._title = this._scene.add.text(this._panel.position().x - 60 * 2, this._panel.position().y - this._panel.size().y * 0.4, 'SÉLECTIONNER UN TUBE', { fontFamily: 'molot', fontSize: 35, color: '#ff0000' });
        this._elements.push(this._panel);
        this._elements.push(this._title);

        var page = [];
        var tube1 = new TubeSelect1(this._scene, this._x, this._y, this, 30, TUBE_TYPES.TUBE_1);
        var tube2 = new TubeSelect2(this._scene, this._x, this._y, this, 40, TUBE_TYPES.TUBE_2);
        var tube3 = new TubeSelect3(this._scene, this._x, this._y, this, 140, TUBE_TYPES.TUBE_3);
        var tube4 = new TubeSelect4(this._scene, this._x, this._y, this, 120, TUBE_TYPES.TUBE_4);
        var tube5 = new TubeSelect5(this._scene, this._x, this._y, this, 100, TUBE_TYPES.TUBE_5);
        var tube6 = new TubeSelect6(this._scene, this._x, this._y, this, 150, TUBE_TYPES.TUBE_6);
        this._elements.push(tube1);
        this._elements.push(tube2);
        this._elements.push(tube3);
        this._elements.push(tube4);
        this._elements.push(tube5);
        this._elements.push(tube6);
        page.push(tube1);
        page.push(tube2);
        page.push(tube3);
        page.push(tube4);
        page.push(tube5);
        page.push(tube6);

        this._pages.push(page);

        this.sortPage();
        this.hidePage();

        var sizePanelX = this._panel.size().x;
        this._btnReturn = new ReturnButton(this._scene, this._panel.position().x, this._y + 185, this);
        
        this._elements.push(this._btnReturn);
        
        this._textTotalCoins = this._scene.add.text(this._x + sizePanelX * 0.25, this._y - 175, this._totalCoins, { fontFamily: 'molot', fontSize: 40, color: 'red'});
        this._iconCoins = new IconCoins(this._scene, this._x + sizePanelX * 0.2, this._y - 150);
        this._iconCoins.setScale(0.4, 0.4);
        this._elements.push(this._iconCoins);

        this._iconSelected = new IconSelected(this._scene, this._x, this._y);
        this._iconSelected._sprite.setDepth(4);

        this._elements.push(this._iconSelected);
        this._elements.push(this._textTotalCoins);

        this.setScaleElements(0.1);
    }

    setStartState() {
        var tubeSelected = this.getCurrentTubeSelected();
        this._iconSelected.setFor(tubeSelected);

        this.setStartStateForTube();
    }

    getTubeTypeWasBoughtForHandle() {
        var list = getTubeTypeWasBought();
        list = JSON.parse(list);
        if(!list) {
            list = []
            list.push(1);
            storeTubeTypeWasBought(JSON.stringify(list));
        }

        return list;
    }

    getTubeType() {
        var tubeType = getCurrentTubeType();
        if(!tubeType) {
            tubeType = TUBE_TYPES.TUBE_1;
            storeCurrentTubeType(tubeType);
        }

        return tubeType;
    }

    setStartStateForTube() {
        var listTypeWasBought = this.getTubeTypeWasBoughtForHandle();
        for(var iPage = 0; iPage < this._pages.length; iPage++) {
            for(var j = 0; j < this._pages[iPage].length; j++) {
                var isWasBought = false;

                for(var i = 0; i < listTypeWasBought.length; i++) {
                    if(this._pages[iPage][j].getType() == listTypeWasBought[i]) {
                        isWasBought = true;
                        break;
                    }
                }

                this._pages[iPage][j].setState(isWasBought);
            }
        }
    }

    getCurrentTubeSelected() {
        var currentId = this.getTubeType();

        for(var iPage = 0; iPage < this._pages.length; iPage++) {
            for(var i = 0; i < this._pages[iPage].length; i++) {
                if(this._pages[iPage][i].getType() == currentId) {
                    return this._pages[iPage][i];
                }
            }
        }

        return null;
    }

    sortPage() {
        var sizeX = 100;
        var sizeY = 140;
        var space = 20;
        var eachBlockX = sizeX + space;
        var totalSizeX = sizeX * this._numCols + space * (this._numCols - 1);

        for(var iPage = 0; iPage < this._pages.length; iPage++) {
            for(var i = 0; i < this._pages[iPage].length; i++) {
                var addX = (-totalSizeX / 2) + (i % this._numCols) * eachBlockX + sizeX / 2;
                var addY = (Math.floor(i / this._numCols + 1) - this._numRows / 2) * sizeY;
    
                var tube = this._pages[iPage][i];
                if(0 == iPage) {
                    tube.setPosition(this._panel.position().x + addX, this._panel.position().y + addY + 10);
                }
                else {
                    tube.setPosition(this._panel.position().x + addX + this._spacePageX, this._panel.position().y + addY + 10);
                }
            }
        }
    }

    hidePage() {
        // ex have only 1 page -> ??? what's happen
        for(var iPage = 1; iPage < this._pages.length; iPage++) {
            this.hideAndDisablePage(this._pages[iPage]);
        }
    }

    showPrePage() {
        if(this._currentPage > 0) {
            this.movePageRight(this._pages[this._currentPage]);
            
            this.hideAndDisablePage(this._pages[this._currentPage])

            this._currentPage--;

            this.movePageRight(this._pages[this._currentPage]);
            this.showAndEnablePage(this._pages[this._currentPage]);
        }
    }

    showNextPage() {
        if(this._currentPage < this._pages.length - 1) {
            this.movePageLeft(this._pages[this._currentPage]);
            this.hideAndDisablePage(this._pages[this._currentPage]);

            this._currentPage++;

            this.movePageLeft(this._pages[this._currentPage]);
            this.showAndEnablePage(this._pages[this._currentPage]);
        }
    }

    movePageRight(page) {
        for( var i = 0; i < page.length; i++) {
            this._scene.tweens.add({
                targets: page[i]._sprite,
                x: page[i]._sprite.x + this._spacePageX,
                y: page[i]._sprite.y,
                duration: this._timeMovePage
            });
        }
    }

    movePageLeft(page) {
        for( var i = 0; i < page.length; i++) {
            this._scene.tweens.add({
                targets: page[i]._sprite,
                x: page[i]._sprite.x - this._spacePageX,
                y: page[i]._sprite.y,
                duration: this._timeMovePage,
            });
        }
    }

    hideAndDisablePage(page) {
        // hide and disable click
        for( var i = 0; i < page.length; i++) {
            page[i].disable();
            page[i]._sprite.setVisible(false);
            // page[i]._text.setVisible(false);
        }
    }

    showAndEnablePage(page) {
        for( var i = 0; i < page.length; i++) {
            page[i].enable();
            page[i]._sprite.setVisible(true);
            // page[i]._text.setVisible(true);
        }
    }

    onClickReturnButton() {
        for(var i = 0; i < this._pages.length; i++) {
            for(var j = 0; j < this._pages[i].length; j++) {
                var price = this._pages[i][j];
                if(price._text) price._text.destroy();
                if(price._iconCoins) price._iconCoins._sprite.destroy();
            }
        }

        this._textTotalCoins.destroy();
        this._scene.hideShopPopup();
    }

    update() {
        this.updateTotalScoreText();

        for(var i = 0; i < this._pages.length; i++) {
            for(var j = 0; j < this._pages[i].length; j++) {
                this._pages[i][j].updatePositionPrice();
            }
        }

        this.updateSelectedIcon();
    }

    updateTotalScoreText() {
        if(this._textTotalCoins) {
            this._textTotalCoins.text = this._totalCoins;
        }
    }

    selectTube(tube) {
        // if tube is unlocked and not unlock
        if(tube.isUnlock()) {
            this.setCurrentSelect(tube.getType());
            this.setSelectedIcon(tube);
        }
        else {
            if(this.isEnoughtCoins(tube.getPrice()))
            {
                this.updateTotalCoins(tube.getPrice());
                this.setCurrentSelect(tube.getType());
                this.storeTubeWasSelected(tube.getType());
                this.storageTotalCoins();
                this.setSelectedIcon(tube);
                tube.setState(true);
            }
        }
    }

    isEnoughtCoins(price) {
        return (this._totalCoins >= price);
    }

    updateTotalCoins(price) {
        this._totalCoins -= price;
    }

    storageTotalCoins() {
        storeTotalCoins(this._totalCoins);
    }

    setCurrentSelect(tubeType) {
        // CURRENT SELECTED
        storeCurrentTubeType(tubeType);
    }

    storeTubeWasSelected(tubeType) {
        // WAS BOUBHT
        var list = this.getTubeTypeWasBoughtForHandle();
        var checkTubeWasSelected = false;
        for(var i = 0; i < list.length; i++) {
            if(tubeType == list[i])
            {
                checkTubeWasSelected = true;
            }
        }
        if(!checkTubeWasSelected) {
            list.push(tubeType);
        }

        storeTubeTypeWasBought(JSON.stringify(list));
    }

    setSelectedIcon(tube) {
        this._iconSelected.setFor(tube);
    }

    updateSelectedIcon() {
        if(this._iconSelected) {
            this._iconSelected.update();
        }
    }

    remove() {
        while(this._elements.length > 0) {
            var elem = this._elements.pop();
            if(elem._sprite) {
                elem._sprite.destroy(true);
            }
            else {
                elem.destroy(true);
            }
        }
    }
}