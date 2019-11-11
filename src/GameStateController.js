// contains methods for emitting and handling specific states
const {Subject} = require('rxjs');
const GAME_STATES = require('./utils/GameStateEnums');

// packages a state into a message object for emission
const message = (state, body) => ({
    state,
    body
});

/**
 * Utilizes an RX subject to emit and handle transitions to different states and to initiate transitions to
 * different states.
 *
 */
class GameStateController {

    constructor() {
        this.notifier = new Subject();
        this.controller = new Subject();

        // keep track of subscriptions for efficient garbage collec.
        this.subscriptions = {
            'notifier': [],
            'controller': []
        };
    }

    // control methods
    /**
     * Requests game to transition to a given state. Can be handled by binding
     * handlers using the function onRequestTo(state);
     *
     * @param {GAME_STATES} newGameState one of the handled game states
     * @param {Object} body contents of state notification.
     * @returns {void}
     */
    request(newGameState, body) {

        // check if state is valid
        if (!GAME_STATES[newGameState]) throw new Error('Invalid game state!');

        this.controller.next(message(newGameState, body));

    }

    /**
     * Notifies a successful transition to a given state, or error. Can be handled by binding
     * handlers using the function onNotificationOf(state);
     *
     * @param {GAME_STATES} updatedGameState the state the game just finished transitioning to
     * @param {Object} body contents of state notification.
     * @returns {void}
     */
    notify(updatedGameState, body) {

        // check if state is valid
        if (!GAME_STATES[updatedGameState]) throw new Error('Invalid game state!');

        this.notifier.next(message(updatedGameState, body));

    }

    /**
     * Creates a subscription to handle a given state request. Should be called on the game-side.
     * Will pass entire message to handler as the only parameter.
     *
     * @param {GAME_STATES} state the state change request that will be handled
     * @param {Function} handler function that will handle change. Only parameter passed is the emitted message, that
     * contains 'state' and 'body' fields.
     * @returns {GameStateController} the object. Allows chaining of handlers.
     */
    onRequestTo(state, handler) {

        // check if state is valid
        if (!handler) throw new Error('No handler passed');
        if (!GAME_STATES[state]) throw new Error('Invalid game state!');

        // calls handler and passes the body of message
        const sub = this.controller
            .filter(msg => msg.state === state)
            .subscribe(handler);

        this.subscriptions.controller.push(sub);

        return this;

    }

    /**
     * Creates a subscription to handle a given state request. Should be called on the game-side.
     * Will pass entire message to handler as the only parameter.
     *
     * @param {GAME_STATES} state the state change request that will be handled
     * @param {Function} handler function that will handle change. Only parameter passed is the emitted message, that
     * contains 'state' and 'body' fields.
     *
     * @returns {GameStateController} the object. Allows chaining of handlers.
     */
    onNotificationOf(state, handler) {

        // check if state is valid
        if (!handler) throw new Error('No handler passed');
        if (!GAME_STATES[state]) throw new Error('Invalid game state!');

        // calls handler and passes the body of message
        const sub = this.notifier
            .filter(msg => msg.state === state)
            .subscribe(handler);

        this.subscriptions.notifier.push(sub);

        return this;

    }

    /**
     * Clears out all controller handlers for proper garbage collection.
     * @returns {void}
     */
    clearControllerHandlers() {
        this.subscriptions.controller.forEach(subscription => subscription.unsubscribe());
    }

    /**
     * Clears out all notifier handlers for proper garbage collection.
     * @returns {void}
     */
    clearNotifierHandlers() {
        this.subscriptions.notifier.forEach(subscription => subscription.unsubscribe());
    }

}

module.exports = GameStateController;
