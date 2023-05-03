class Wheel extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
     
        this._x = x;
        this._y = y;
        this._scene = scene;
        this._indexItem = -1;
        this._enableSpin = true;
        this.initItems();
        this.initPointCheck();
    }

    initItems() {
        this.listItems = [];
        var startPosition = -1000;
        var item1 = new Item(this._scene, this._x, startPosition, 'spritesheet_item1');
        var item2 = new Item(this._scene, this._x, startPosition, 'spritesheet_item2');
        var item3 = new Item(this._scene, this._x, startPosition, 'spritesheet_item3');
        var item4 = new Item(this._scene, this._x, startPosition, 'spritesheet_item4');
        var item5 = new Item(this._scene, this._x, startPosition, 'spritesheet_item5');
        var item6 = new Item(this._scene, this._x, startPosition, 'spritesheet_item6');
        var item7 = new Item(this._scene, this._x, startPosition, 'spritesheet_item7');
        var item8 = new Item(this._scene, this._x, startPosition, 'spritesheet_item8');
        var item9 = new Item(this._scene, this._x, startPosition, 'spritesheet_item9');
        var item10 = new Item(this._scene, this._x, startPosition, 'spritesheet_item10');
        var item11 = new Item(this._scene, this._x, startPosition, 'spritesheet_item11');
        var item12 = new Item(this._scene, this._x, startPosition, 'spritesheet_item12');
        this.spinBtn = new SpinButton(this._scene, this._x, startPosition, this);
        var wheelPanel = new WheelPanel(this._scene, this._x, this._y + 22);

        this.listItems.push(item1);
        this.listItems.push(item2);
        this.listItems.push(item3);
        this.listItems.push(item4);
        this.listItems.push(item5);
        this.listItems.push(item6);
        this.listItems.push(item7);
        this.listItems.push(item8);
        this.listItems.push(item9);
        this.listItems.push(item10);
        this.listItems.push(item11);
        this.listItems.push(item12);
        this.listItems.push(this.spinBtn);

        wheelPanel.zIndex(9);
        wheelPanel.setScale(0.85, 0.85);
        for(var i = 0; i < this.listItems.length - 1; i++) {
            this.listItems[i].zIndex(10);
            this.listItems[i].setScale(0.85, 0.85);
        }
        this.spinBtn.zIndex(15);

        for(var i = 0; i < this.listItems.length; i++) {
            var pos = this._y;
            if(i == this.listItems.length - 1) pos = this._y - 16;
            this._scene.tweens.add({
                targets: this.listItems[i]._sprite,
                y: pos,
                yoyo: false,
                duration: 100,
                delay: 130 * i,

                onComplete: function() {
                    this.showEffect();
                }.bind(this)
            });
        }
    }

    initPointCheck() {
        this._listPointCheck = [];
        this._pointCheckOnSpinBtn = new PointCheck(this._scene, this._x, this._y, 0);
        for(var i = 0; i < 12; i++) {
            var pointCheck = new PointCheck(this._scene, this._x, this._y, i + 1);
            pointCheck.setScale(3, 3);
            this._listPointCheck.push(pointCheck);
        }

        // The pointCheck must be sorted by clockwise

        this._pointCheckOnSpinBtn.setPosition(this._x, this._y - 57);
        this._listPointCheck[0].setPosition(this._x - 47, this._y - 172);
        this._listPointCheck[1].setPosition(this._x + 46, this._y - 172);
        this._listPointCheck[2].setPosition(this._x + 126, this._y - 126);
        this._listPointCheck[3].setPosition(this._x + 172, this._y - 46);
        this._listPointCheck[4].setPosition(this._x + 172, this._y + 46);
        this._listPointCheck[5].setPosition(this._x + 126, this._y + 126);
        this._listPointCheck[6].setPosition(this._x + 47, this._y + 172);
        this._listPointCheck[7].setPosition(this._x - 47, this._y + 172);
        this._listPointCheck[8].setPosition(this._x - 126, this._y + 126);
        this._listPointCheck[9].setPosition(this._x - 172, this._y + 46);
        this._listPointCheck[10].setPosition(this._x - 172, this._y - 46);
        this._listPointCheck[11].setPosition(this._x - 126, this._y - 126);
    }

    showEffect() {
        console.log('show effect');
        SoundHandler.getInstance().playItemEffect();
    }

    getRandom(min, max) {
        var random = ( Math.random() * (max - min) ) + min;
        return random;
    }

    enableSpin() {
        this._enableSpin = true;
        this.spinBtn.enableSpin();
    }

    disableSpin() {
        this._enableSpin = false;
        this.spinBtn.disableSpin();
    }

    onClickSpin() {
        console.log('on click spin');

        if(!this._enableSpin) return;
        this.disableSpin();

        if(this._scene) {
            this._scene.updateStartCoinForBet();
            this._scene.disableAllPanels();
        }
        
        var time = this.getRandom(5000, 10000);
        var angle = this.getRandom(500, 1500);
        this._indexItem = -1;

        this._oldAngle = this.listItems[0]._sprite.angle;
        
        SoundHandler.getInstance().playSpinningReel();
        for(var i = 0; i < this.listItems.length - 1; i++) {
            var tweenConfig = {
                targets: this.listItems[i]._sprite,
                angle: angle,
                ease: Phaser.Math.Easing.Cubic.Out,
                duration: time,
                repeat: 0,
                yoyo: false,

                onComplete: function() {
                    if(5 != arguments[0]) return;
                    SoundHandler.getInstance().stopSpinningReel();
                    SoundHandler.getInstance().playDoneSpin();
                    var degreeAngle = (-(this.listItems[0]._sprite.angle - this._oldAngle));
                    degreeAngle = degreeAngle * (Math.PI / 180);
                    
                    var center = {
                        x: this.listItems[0].position().x,
                        y: this.listItems[0].position().y
                    };

                    for(var i = 0; i < this._listPointCheck.length; i++) {
                        var point = this._listPointCheck[i];
                        var oldPos = point.position();

                        point.setPosition(
                            center.x + ((oldPos.x - center.x) * Math.cos(degreeAngle) + (oldPos.y - center.y) * Math.sin(degreeAngle)),
                            center.y - ((oldPos.x - center.x) * Math.sin(degreeAngle) - (oldPos.y - center.y) * Math.cos(degreeAngle))
                        );
                    }

                    this._oldAngle = this.listItems[0]._sprite.angle;
                    this.getIndexItemResult();
                    this.showItemEffectWin();
                }.bind(this, i)
            }

            this._scene.tweens.add(tweenConfig);
        }
    }

    getDist(point1, point2) {
        var tempDist = Math.pow((point1.x - point2.x), 2) + Math.pow((point1.y - point2.y), 2);
        return Math.sqrt(tempDist);
    }

    getIndexResult(index1, index2) {
        var maxIndex = this._listPointCheck.length - 1;
        if((maxIndex == index1 && 0 == index2) || (maxIndex == index2 && 0 == index1)) return maxIndex;

        return ((index1 < index2) ? index1 : index2);
    }

    indexToName(index) {
        var result;
        switch(index) {
            case 0: result = TABLE_ITEM_WHEEL.ITEM1; break;
            case 1: result = TABLE_ITEM_WHEEL.ITEM2; break;
            case 2: result = TABLE_ITEM_WHEEL.ITEM3; break;
            case 3: result = TABLE_ITEM_WHEEL.ITEM4; break;
            case 4: result = TABLE_ITEM_WHEEL.ITEM5; break;
            case 5: result = TABLE_ITEM_WHEEL.ITEM6; break;
            case 6: result = TABLE_ITEM_WHEEL.ITEM7; break;
            case 7: result = TABLE_ITEM_WHEEL.ITEM8; break;
            case 8: result = TABLE_ITEM_WHEEL.ITEM9; break;
            case 9: result = TABLE_ITEM_WHEEL.ITEM10; break;
            case 10: result = TABLE_ITEM_WHEEL.ITEM11; break;
            case 11: result = TABLE_ITEM_WHEEL.ITEM12; break;
            default: result = TABLE_ITEM_WHEEL.ITEM12;
        }

        return result;
    }

    showItemEffectWin() {
        var angle = this.listItems[this._indexItem].angle();
        this.effect = new ItemEffectWin(this._scene, this._x, this._y);
        this.effect.setAngle(angle + (30 * this._indexItem));
        this.effect.zIndex(12);


        var tweenConfig = {
            targets: this.effect._sprite,
            alpha: 0,
            ease: Phaser.Math.Easing.Cubic.Out,
            duration: 90,
            repeat: 20,
            yoyo: true,

            onComplete: function() {
                this.effect.kill();
                this._scene.checkConditionToSpin();
            }.bind(this)
        }
        this._scene.tweens.add(tweenConfig);
    }

    getIndexItemResult() {
        var listDist = [];
        var posPointCheckOnSpinBtn = this._pointCheckOnSpinBtn.position();

        for(var i = 0; i < this._listPointCheck.length; i++) {
            var posPointCheck = this._listPointCheck[i].position();
            var dist = this.getDist(posPointCheckOnSpinBtn, posPointCheck);
            listDist.push(dist);
        }

        var indexMinDist1 = 0;
        var minDist = listDist[indexMinDist1];
        for(var i = 0; i < listDist.length; i++) {
            var tempDist = listDist[i];
            if(tempDist < minDist) {
                minDist = tempDist;
                indexMinDist1 = i;
            }
        }

        var indexMinDist2 = indexMinDist1 + 1;
        if(indexMinDist2 >= listDist.length - 1) indexMinDist2 = indexMinDist1 - 1;
        minDist = listDist[indexMinDist2];
        for(var i = 0; i < listDist.length; i++) {
            var tempDist = listDist[i];
            if(tempDist < minDist && i != indexMinDist1) {
                minDist = tempDist;
                indexMinDist2 = i;
            }
        }

        var result = this.getIndexResult(indexMinDist1, indexMinDist2);
        this._indexItem = result;
        var name = this.indexToName(result);
        this._scene.onDoneSpin(name);
    }

    getResultSpin() {
        return this._indexItem;
    }
}