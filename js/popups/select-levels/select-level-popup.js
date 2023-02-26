class SelectLevelPopup extends Popup {
    constructor(scene, x, y, parent) {
        super(scene, x, y, parent);

        this._scene = scene;
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
        this._timeEffect = 150;
        this._timeMovePage = 200;
        this._x = x;
        this._y = y;
    }

    initElements() {
        this._panel = new Panel(this._scene, this._x, this._y);
        this._title = this._scene.add.text(this._panel._sprite.x - 45 * 2, this._panel.position().y - this._panel.size().y * 0.38, 'CHOISIR LE NIVEAU', { fontFamily: 'molot', fontSize: 35, color: '#ff0000' });
        this._elements.push(this._panel);
        this._elements.push(this._title);

        var page = [];
        var lenPage = this._numCols * this._numRows;
        for( var i = 0; i < TOTAL_LEVEL; i++ ) {
            var level = new LevelPanel(this._scene, this._x, this._y, (i + 1), this);
            this._elements.push(level);

            page.push(level);
            if(page.length >= lenPage) {
                this._pages.push(page);
                page = [];
            }
        }
        this._pages.push(page);
        this.sortPage();
        this.hidePage();

        var sizePanelX = this._panel.size().x;
        this._btnReturn = new ReturnButton(this._scene, this._panel.position().x, this._panel.position().y + this._panel.size().y * 0.35, this);
        this._btnNext = new NextButton(this._scene, this._x + sizePanelX * 0.5, this._y, this);
        this._btnPre = new PreviousButton(this._scene, this._x - sizePanelX * 0.5, this._y, this);

        this._elements.push(this._btnReturn);
        this._elements.push(this._btnPre);
        this._elements.push(this._btnNext);

        this.setScaleElements(0.1);
        this.setStartState();
    }

    setStartState() {
        var lvUnlocked = getLevelWasUnlock() || 1;

        for(var iPage = 0; iPage < this._pages.length; iPage++) {
            for(var i = 0; i < this._pages[iPage].length; i++) {
                var level = this._pages[iPage][i];
                if(level.getLevel() <= lvUnlocked) {
                    level.setState(false);
                }
                else {
                    level.setState(true);
                }
            }
        }
    }

    sortPage() {
        var sizeX = 100;
        var sizeY = 100;
        var space = 20;
        var eachBlockX = sizeX + space;
        var totalSizeX = sizeX * this._numCols + space * (this._numCols - 1);

        for(var iPage = 0; iPage < this._pages.length; iPage++) {
            for(var i = 0; i < this._pages[iPage].length; i++) {
                var addX = (-totalSizeX / 2) + (i % this._numCols) * eachBlockX + sizeX / 2;
                var addY = (Math.floor(i / this._numCols + 1) - this._numRows / 2) * sizeY;
    
                var panelLevel = this._pages[iPage][i];

                if(0 == iPage) {
                    panelLevel.setPosition(this._panel.position().x + addX, this._panel.position().y + addY - 55);
                }
                else {
                    panelLevel.setPosition(this._panel.position().x + addX + this._spacePageX, this._panel.position().y + addY - 55);
                }
            }
        }
    }

    hidePage() {
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
            page[i].hide();
        }
    }

    showAndEnablePage(page) {
        for( var i = 0; i < page.length; i++) {
            page[i].show();
        }
    }

    onClickReturnButton() {
        for(var i = 0; i < this._pages.length; i++) {
            for(var j = 0; j < this._pages[i].length; j++) {
                this._pages[i][j].destroy();
            }
        }

        this._scene.hideSelectLevelPopup();
    }

    update() {
        for(var i = 0; i < this._pages.length; i++) {
            for(var j = 0; j < this._pages[i].length; j++) {
                this._pages[i][j].updatePositionElements();
            }
        }
    }

    levelSelected(level) {
        this._scene.startGame(level);
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