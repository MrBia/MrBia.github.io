var SoundHandler = (function() {
    var instance = null;
    var _scene = null;
    var _bgm = null;
    var _btn = null;
    var _clickTube = null;
    var _isMute = false;

    function init() {
        _bgm = _scene.sound.add('bgm', { loop: true });
        _btn = _scene.sound.add('button', { loop: false });
        _clickTube = _scene.sound.add('clickTube', { loop: false });
        
        return {
            playBgm: function() {
                _bgm.play();
            },

            playButton: function() {
                _btn.play();
            },

            playClickTube: function() {
                _clickTube.play();
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