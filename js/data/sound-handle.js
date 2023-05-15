var SoundHandler = (function() {
    var instance = null;
    var _scene = null;
    var _bgm = null;
    var _btn = null;
    var _cat1 = null;
    var _cat2 = null;
    var _cat3 = null;
    var _shuffling = null;
    var _clickBox = null;
    var _isMute = false;

    function init() {
        _bgm = _scene.sound.add('bgm', { loop: true });
        _btn = _scene.sound.add('button', { loop: false });
        _cat1 = _scene.sound.add('cat1', { loop: false });
        _cat2 = _scene.sound.add('cat2', { loop: false });
        _cat3 = _scene.sound.add('cat3', { loop: false });
        _shuffling = _scene.sound.add('shuffling', { loop: false });
        _clickBox = _scene.sound.add('clickBox', { loop: false });
        
        return {
            playBgm: function() {
                _bgm.play();
            },

            playButton: function() {
                _btn.play();
            },

            playCat1: function() {
                _cat1.play();
            },

            playCat2: function() {
                _cat2.play();
            },

            playCat3: function() {
                _cat3.play();
            },

            playShuffling: function() {
                _shuffling.play();
            },

            playClickBox: function() {
                _clickBox.play();
            },

            muteAll: function() {
                _scene.sound.mute = true;
                _isMute = true;
            },

            unmuteAll: function() {
                _scene.sound.mute = false;
                _isMute = false;
            },

            isMute: function() {
                return _isMute;
            },

            storageSoundState: function(state) {
                if('on' == state) {
                    this.unmuteAll();
                }
                else {
                    this.muteAll();
                }

                storeSound(state);
            },

            getSoundState: function() {
                var sound = getSound();
                if(!sound) {
                    sound = 'on';
                    storeSound(sound);
                }

                return sound;
            },

            setStartState: function() {
                var sound = getSound();
                if(!sound) {
                    sound = 'on';
                    storeSound(sound);
                }
                
                if('on' == sound) {
                    this.unmuteAll();
                }
                else {
                    this.muteAll();
                }
            }
        };
    }

    return {
        setScene: function(scene) {
            _scene = scene;
            instance = init();
            instance.setStartState();
        },

        getInstance: function() {
            if(!instance) {
                instance = init();
            }

            return instance;
        }
    };
})();