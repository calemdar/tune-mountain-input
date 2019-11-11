# Tune Mountain Input Utilities
Input Utilities for Tune Mountain game. Contains the following utilities: an input manager that packages and emits
 input actions
 through an
 observable, and a Game State Controller, that allows for state change requests to be emitted from the website to the
  game, as well as the emission of state change notifications from the game to the website.

If you're looking on modifying / testing the code locally, please see **[Modifying and Running Source Code Locally
](./docs/ModifyingSourceCode.MD)** for details on how to do that.

### Installation
#### Local repository:
Clone repository, then run `npm link` inside repo.
Copy the location, which should look like `/Users/YourUser/LocationToRepo/tune-mountain/tune-mountain-input`.

Navigate to the folder that will use this dependency and run `npm link [locationOfPackage]` that was copied in the
 previous step.
 
#### Github Repository:
Simply run `npm install --save calemdar/tune-mountain-input#master`

---

### Importing

Now you can import the package using either

```javascript
import {
           InputManager,
           GameStateController,
           GameStateEnums
} from "tune-mountain-input-manager";
```

or

```javascript
const {
    InputManager,
    GameStateController,
    GameStateEnums
} = require("tune-mountain-input-manager");
```

You may import each individually as needed.

---

### Usage
#### Input Manager
You may create an input manager instance and bind actions to it using the following code:

```javascript
// instantiate manager and bind it to the DOM
const manager = new InputManager();

// bind one or more actions (appends to existing actions)
manager.bindAction('a', 'Action1');
manager.bindAction('a', 'Action2');
// if the key 'a' is pressed, 'Action1' and 'Action2' will be emitted

// reset bindings to an array of new actions
manager.setBinding('a', ['Action3']);
// if the key 'a' is pressed, only 'Action3' will be emitted

// to unbind an action simply run
manager.setBinding('a', null);
// if the key 'a' is pressed, nothing will be emitted
```

In order to handle an action event you may create an observer by subscribing to the action observable. See example
```javascript
// get observable
const observable = manager.getObservable();

// this handler will simply print to the console the actions being performed
const handler = ( action ) => console.log(action.toString());

// subscribe to handle events
const observer = observable.subscribe(handler);
```

If any of the bound keys are pressed, the action object will be printed to the console like such:
```javascript

ActionEvent: {
    'type': press
    'actions': Jump
    'timestamp': 'Mon Sep 09 2019 01:15:17 GMT-0400 (Eastern Daylight Time)'
    'userID': undefined
    'sessionID': undefined
}

```

Please see [ActionEvent.js](./src/utils/ActionEvent.js) or [ActionEvent.js documentation](./docs/src/ActionEvent.MD) for reference of
 how to
 access the fields inside the
 `ActionEvent` object that is emitted by the observable.
 
**Note**: You may also initialize the input manager with a series of bindings and 
a `userID` and `sessionID` values for identification. See [Manager.js](./src/Manager.js) or [Manager.js documentation](./docs/src/Manager.MD) for details on the
 documentation.
 
#### Game State Controller
The game state controller has two pipelines of data: the notification route, and the request route.

Notification is to be used by the game to **notify** the website of state updates and other messages.

Request is to be used by the website to control the state of the game. see usage below.

```javascript

// instantiating game state controller (done inside the web app)
const gsc = new GameStateController();

```

The game will receive a reference to an instance of the controller and will be able to run its functions through this
 initialization.
 
**GAME SIDE:** Receiving state update requests in the game code, and sending state update notifications to the web-app:
```javascript

// receiving a state "GENERATE" update, and logging that request
gsc.onRequestTo(GameStateEnums.GENERATE, (stateMessage) => console.log(stateMessage));

// emitting a notification with relation to a state
const body = {
    "Message": "We just updated the state! Here's a notification to show it!",
    "Date": "Today!"
};

gsc.notify(GameStateEnums.GENERATE, body);

```

In the above example, every time the web-app emits a GENERATE state request, the game will run the handler passed as
 the second parameter of the _onRequestTo_ member function.

**WEB-APP SIDE:** Receiving state notifications from game and emitting state requests to game.
```javascript

// log that the game switched state to IDLE
gsc.onNotificationOf(GameStateEnums.IDLE, (stateMessage) => console.log(stateMessage));

const body = {
    "ErrorMessage": "Ooops, this is an error!",
    "Code": 42069
};

// request game to switch state to ERROR
gsc.request(GameStateEnums.ERROR, body);

```
In the above example, every time the game emits a IDLE state notification, the web-app will run the handler passed as
 the second parameter of the _onNotificationOf_ member function.

**Game State Enums:** represent the valid game states that will be handled. Currently defined as:
```javascript
const GameStateEnums = {
    'IDLE': 'IDLE',
    'GENERATE': 'GENERATE',
    'PLAY': 'PLAY',
    'PAUSE': 'PAUSE',
    'ERROR': 'ERROR'
};
```

##### [More Documentation Here](./docs/src/)
 
_Written by [Léo Gonsalves](https://github.com/lcgonsalves)_
