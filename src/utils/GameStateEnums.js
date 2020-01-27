// define possible states
const GameStateEnums = Object.freeze({
    'IDLE': 'IDLE',
    'GENERATE': 'GENERATE',
    'PLAY': 'PLAY',
    'PAUSE': 'PAUSE',
    'ERROR': 'ERROR',
    'SCORE_CHANGED': 'SCORE_CHANGED'
});

module.exports = GameStateEnums;
