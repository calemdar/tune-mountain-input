/**
 * Definition of Game States used by GameStateController.
 *
 * @see GameStateController
 * @type {Readonly<{PAUSE: string, PLAY: string, IDLE: string, ERROR: string, GENERATE: string, SCORE_CHANGED: string}>}
 */
const GameStateEnums = Object.freeze({
    'IDLE': 'IDLE',
    'GENERATE': 'GENERATE',
    'PLAY': 'PLAY',
    'PAUSE': 'PAUSE',
    'ERROR': 'ERROR',
    'SCORE_CHANGED': 'SCORE_CHANGED'
});

module.exports = GameStateEnums;
