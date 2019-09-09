# Tune Mountain Input Manager
Input Manager for Tune Mountain game. Packages and emits input actions through an observable.

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
import InputManager from "tune-mountain-input-manager";
```

or

```javascript
const InputManager = require("tune-mountain-input-manager");
```

---

### Usage

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

Please see [ActionEvent.js](./src/utils/ActionEvent.js) for reference of how to access the fields inside the
 `ActionEvent` object that is emitted by the observable.
 
**Note**: You may also initialize the input manager with a series of bindings and 
a `userID` and `sessionID` values for identification. See [Manager.js](./src/Manager.js) for details on the
 documentation.
 
_Written by [Léo Gonsalves](https://github.com/lcgonsalves)_
