const ActionRegistry = require('./ActionRegistry');
const ActionEvent = require('./utils/ActionEvent');
const Rx = require('rxjs/Rx');

// defines supported key press types
const keyPressTypes = Object.freeze({
    'DOWN': 'press',
    'UP': 'release'
});

/**
 * Class that tracks user input for a given DOM element and outputs an object
 * of type Input to the InputObservable, that can be acquired through
 * the function
 * InputManager.getInputObservable();
 *
 * The input manager will automatically attach itself to the 'document' and listen
 * for any and all key presses, but one may set it to listen for key presses on a specific
 * DOM element.
 */
class Manager {

    /**
     * Attaches InputManager to a given DOMElement, or if none is passed,
     * attaches it to entire document.
     * @param {Node} DOMElement the desired element
     * @param {Object} bindings map of key values to an array of actions
     * @param {Object} identifiers object containing the ids that will be used for this manager (i.e. userID, sessionID,
     * etc)
     */
    constructor(DOMElement = document, bindings = {}, identifiers = {}) {

        // define which identifiers will be used
        const {
            userID,
            sessionID
        } = identifiers;

        // init action registry
        this.actionRegistry = new ActionRegistry(bindings);

        // init observables for internal tracking of presses. only pipe the ones that are bound.
        const keyDown$ = Rx.Observable.fromEvent(DOMElement, 'keydown')
            .filter( event => this.actionRegistry.isBound(event.key) )
            .map( event => ({
                key: event.key,
                type: keyPressTypes.DOWN
            }));

        const keyUp$ = Rx.Observable.fromEvent(DOMElement, 'keyup')
            .filter( event => this.actionRegistry.isBound(event.key) ).map( event => ({
                key: event.key,
                type: keyPressTypes.UP
            }));

        // filter out holding key
        const keyPresses$ = keyDown$
            .merge(keyUp$)
            .groupBy(e => e.key)
            .map(group => group.distinctUntilChanged(null, e => e.type))
            .mergeAll();

        // creates an observable that emits ActionEvents when a button is pressed
        this._actionObservable = new Rx.Subject(); // TODO: subject to change if we need different observable functionality

        // makes Subject emit a new ActionEvent when button is pressed.
        this._keyPressSubscription = keyPresses$.subscribe(
            buttonEvent => {

                // create action event
                const evt = new ActionEvent({
                    actions: this.actionRegistry.getActionsForKey(buttonEvent.key),
                    boundKey: buttonEvent.key,
                    type: buttonEvent.type,
                    userID,
                    sessionID
                });

                // emit action event
                this._actionObservable.next(evt);
            }
        );
    }

    /**
     * Returns the action observable.
     * Subscribe to this observable to handle actions.
     */
    getObservable() {
        return this._actionObservable;
    }

    /**
     * Clears subscriptions to clear memory.
     */
    clear() {
        this._keyPressSubscription.unsubscribe();
    }

    /**
     * Binds one or more actions to a given key. If key already has one or more actions bound
     * to it, it appends the action to the existing actions.
     *
     * @param {String} key the value of a key as defined in https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
     * @param {String || Array<String>} action one or more actions to be bound
     */
    bindAction(key, action) {

        this.actionRegistry.bindActionToKey(key, action);

    }

    /**
     * Binds an array of actions to a given key.
     * WARNING: this will erase all previous bindings.
     *
     * @param {String} key the value of a key as defined in https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
     * @param {Array<String>} actions an array of actions to be bound
     */
    setBinding(key, actions) {

        this.actionRegistry.setBindingTo(key, actions)

    }

}

module.exports = Manager;
