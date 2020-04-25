// simply exports input manager as the main package content.
const InputManager = require('./src/Manager');
const GameStateEnums = require('./src/utils/GameStateEnums');
const GameStateController = require('./src/GameStateController');
const ActionEvent = require('./src/utils/ActionEvent');

module.exports = {
    InputManager,
    GameStateEnums,
    GameStateController,
    ActionEvent
};
