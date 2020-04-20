/**
 * This class defines the packet that contains the ActionEvent
 * that is emitted when a button is pressed.
 *
 * An event will contain an encapsulate an action, the key bound to it at the time of pressing, and the time in which it was pressed.
 * The type of press can be either "press" or "release"
 */
class ActionEvent {

    /**
     * Instantiates an action event.
     *
     * Properties may contain:
     *      actions: Array<String> -> actions that are being done
     *      boundKey: String -> key bound to said actions that was pressed
     *      type: String -> either "press" or "release"
     *      timestamp: Date.now() when key was pressed
     *
     * Optional properties may be added using setter functions, with the exception of the timestamp.
     *
     * @param properties object containing event properties (see description).
     */
    constructor (properties = {}) {

        const {
            action,
            boundKey,
            type,
            timestamp
        } = properties;

        // if required props aren't passed, throw error
        if (!action || !type) {
            throw new Error(`No 'action' or 'type' passed to ActionEvent during instantiation! Action: ${action}, Type: ${type}`);
        }

        // set current date if no timestamp is passed
        if (timestamp) {
            this._timestamp = timestamp;
        } else {
            this._timestamp = Date.now();
        }

        // assign to object properties
        this._action = action;
        this._boundKey = boundKey;
        this._type = type;

    }

    /**
     * Returns an array of actions performed.
     * @returns {String} all actions performed
     */
    get action() {
        return this._action;
    }

    /**
     * Returns a String representing the key bound to the actions performed at time of usage
     * @returns {String} a key value
     */
    get boundKey() {
        return this._boundKey;
    }

    /**
     * Returns the type of key press (either 'up' or 'down', or as defined inside Manager.js)
     * @returns {String} a type
     */
    get type() {
        return this._type;
    }

    /**
     * Returns a Date object. Represents the time and date the action was performed.
     * @returns {Number}
     */
    get timestamp() {
        return this._timestamp;
    }

    /**
     * Sets timestamp to new value
     * @param newTime
     */
    set timestamp(newTime) {
        this._timestamp = newTime;
    }

    /**
     * Converts to an easily readable string
     * @returns {String}
     */
    toString() {
        return `ActionEvent: {
    'type': ${this._type}
    'actions': ${this._action}
    'timestamp': ${this._timestamp}
}`
    }

}

module.exports = ActionEvent;
