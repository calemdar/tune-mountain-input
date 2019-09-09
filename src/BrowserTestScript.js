// runs input manager on current browser window
const InputManager = require('../index');

const inputManager = new InputManager(
    document,
    {
        'a': ['Trick', 'DoAThing'],
        ' ': ['Jump']
    },
    {
        'userID': 'APerson1234',
        'sessionID': 'ABC!@#ABC'
    }
);

console.log(inputManager);

inputManager.getObservable().subscribe(actionEvent => console.log(actionEvent.toString()));
