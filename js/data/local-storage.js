var KEY = {
    CURRENT_LEVEL: 'current-level',
    HIGH_SCORE: 'high-score',
    CURRENT_TUBE_TYPE: 'current-tube',
    TUBE_TYPE_WAS_BOUGHT: 'tube-type-was-bought',
    TOTAL_COINS: 'total-coins',
    LEVEL_WAS_UNLOCKED: 'level-was-unlocked',
    SOUND: 'sound'
}

/*
var localStore = {
    storeCurrentLevel: function(currentLevel) {
        localStorage.setItem(KEY.CURRENT_LEVEL, currentLevel);
    }
} 
*/
storeCurrentLevel = function(currentLevel) {
    localStorage.setItem(KEY.CURRENT_LEVEL, currentLevel);
}

getCurrentLevel = function() {
    var currentLV = localStorage.getItem(KEY.CURRENT_LEVEL);

    return currentLV;
}

storeHighScore = function(highScore) {
    localStorage.setItem(KEY.HIGH_SCORE, highScore);
}

getHighScore = function() {
    var highScore = localStorage.getItem(KEY.HIGH_SCORE);

    return highScore;
}

storeCurrentTubeType = function(typeTube) {
    localStorage.setItem(KEY.CURRENT_TUBE_TYPE, typeTube);
}

getCurrentTubeType = function() {
    var typeTube = localStorage.getItem(KEY.CURRENT_TUBE_TYPE);

    return typeTube;
}

storeTubeTypeWasBought = function(list) {
    localStorage.setItem(KEY.TUBE_TYPE_WAS_BOUGHT, list);
}

getTubeTypeWasBought = function() {
    var list = localStorage.getItem(KEY.TUBE_TYPE_WAS_BOUGHT);

    return list;
}

storeSound = function(state) {
    localStorage.setItem(KEY.SOUND, state);
}

getSound = function() {
    var sound = localStorage.getItem(KEY.SOUND);
    return sound;
}

storeLevelWasUnlock = function(lastestLevelUnclock) {
    localStorage.setItem(KEY.LEVEL_WAS_UNLOCKED, lastestLevelUnclock);
}

getLevelWasUnlock = function() {
    var lastestLevelUnclock = localStorage.getItem(KEY.LEVEL_WAS_UNLOCKED);

    return lastestLevelUnclock;
}

storeTotalCoins = function(coins) {
    localStorage.setItem(KEY.TOTAL_COINS, coins);
}

getTotalCoins = function() {
    var coins = localStorage.getItem(KEY.TOTAL_COINS);

    return coins;
}