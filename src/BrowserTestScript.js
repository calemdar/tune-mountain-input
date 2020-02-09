/* eslint-disable */
// runs input manager on current browser window
// this is the highest level script, and is equivalent to importing the whole module to a source file!
const {InputManager, GameStateController, GameStateEnums} = require('../index');

// instantiate
const inputManager = new InputManager();
const gameStateController = new GameStateController();

// bind actions
inputManager.bindAction('a', ['Walk', 'Eat']);
inputManager.setBinding(' ', ['Jump']);
inputManager.bindAction('e', 'request');
inputManager.bindAction('f', 'notification');

console.log(inputManager);

// log action event
inputManager.getObservable().subscribe(actionEvent => console.log(actionEvent.toString()));

// when action "request" is performed, emits appropriate state into the game state controller
inputManager.getObservable()
    .filter(actionEvent => actionEvent.actions[0] === 'request' && actionEvent.type === 'press')
    .subscribe(actionEvent => {
        console.log('Request emitted!');
        gameStateController.request(GameStateEnums.GENERATE, {
            'actions performed': actionEvent.actions
        });
    });

// logs request when it is emitted
gameStateController.onRequestTo(GameStateEnums.GENERATE, request => console.log('Request handled: ', request));

// when action "notification" is performed, emits appropriate state into the game state controller
inputManager.getObservable()
    .filter(actionEvent => actionEvent.actions[0] === 'notification' && actionEvent.type === 'press')
    .subscribe(actionEvent => {
        console.log('Notification emitted!');
        gameStateController.notify(GameStateEnums.GENERATE, {
            'actions performed': actionEvent.actions
        });
    });

// test action history
let time = 0;

inputManager.getObservable().subscribe(() => console.log('Real time', time));
let interval = setInterval(() => time += 10, 10);

inputManager.startSession();

console.log(inputManager.actionHistory);


// let it roll for a little bit

// pause
setTimeout(() => {
    clearInterval(interval);
    inputManager.pauseSession();
    console.log('Paused!');
}, 5000);

// resume
setTimeout(() => {
    interval = setInterval(() => time += 10, 10);
    inputManager.resumeSession();
    console.log('Resuming!');
}, 8000);

// terminate
setTimeout(() => {
    console.log("Terminated");
    clearInterval(interval);
    console.log(inputManager.terminateSession());
}, 12000);


// logs request when it is emitted
gameStateController.onNotificationOf(GameStateEnums.GENERATE, request => console.log('Notification handled: ', request));
