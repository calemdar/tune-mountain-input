// runs input manager on current browser window
// this is the highest level script, and is equivalent to importing the whole module to a source file!
const InputManager = require('../index');

// instantiate
const inputManager = new InputManager();

// bind actions
inputManager.bindAction('a', ['Walk', 'Bust A Nut']);
inputManager.setBinding(' ', ['Jump']);

console.log(inputManager);

inputManager.getObservable().subscribe(actionEvent => console.log(actionEvent.toString()));
