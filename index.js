// simply exports input manager as the main package content.
const InputManager = require('./src/Manager');
const GameStateEnums = require('./src/utils/GameStateEnums');
const GameStateController = require('./src/GameStateController');

module.exports = {
    InputManager,
    GameStateEnums,
    GameStateController
};
