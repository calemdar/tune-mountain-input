/* eslint-disable */
// runs input manager on current browser window
// this is the highest level script, and is equivalent to importing the whole module to a source file!
const {InputManager, GameStateController, GameStateEnums, ActionEvent} = require('../index');

// instantiate
const inputManager = new InputManager();
const gameStateController = new GameStateController();

// bind actions
inputManager.bindAction('e', 'request');
inputManager.bindAction('f', 'notification');
inputManager.bindAction(' ', 'jump');
inputManager.bindAction('w', 'trick1');

console.log(inputManager);

// log action event
inputManager.getObservable().subscribe(actionEvent => console.log(actionEvent.toString()));

// when action "request" is performed, emits appropriate state into the game state controller
inputManager.getObservable()
    .filter(actionEvent => actionEvent.action === 'request' && actionEvent.type === 'press')
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
    .filter(actionEvent => actionEvent.action === 'notification' && actionEvent.type === 'press')
    .subscribe(actionEvent => {
        console.log('Notification emitted!');
        gameStateController.notify(GameStateEnums.GENERATE, {
            'actions performed': actionEvent.actions
        });
    });

// subscribe response to update html element
inputManager.getObservable().subscribe(actionEvent => {
    const actionTimeElement = document.getElementById("action-time");
    actionTimeElement.innerHTML = String(actionEvent.timestamp);
});

// action history test
const testActionHistory = () => {

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
};

// test replay
function testReplay () {

    // get real inputs
    fetch(`/demo-session`)
        .then(response => response.json())
        .then(sessionObject => {

            console.log(sessionObject.inputs);

            const timeElement = document.getElementById("real-time");

            // load in inputs
            inputManager.loadInputsForReplay(sessionObject.inputs.slice(0, 5));

            // begin replay and track synchronicity
            inputManager.beginReplaySession();

            console.log("begin replay");

            // update real time timer
            let time = 0;
            setInterval(() => {
                time += 100;
                timeElement.innerHTML = time.toString();
            }, 100);

        });

}

// testReplay();
document.getElementById("test-replay-btn").addEventListener("click", testReplay);

// logs request when it is emitted
gameStateController.onNotificationOf(GameStateEnums.GENERATE, request => console.log('Notification handled: ', request));
