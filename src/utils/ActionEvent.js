/**
 * This class defines the packet that contains the ActionEvent
 * that is emitted when a button is pressed.
 *
 * An event will contain an array of actions (Strings) and a key that was bound to it at
 * the time the action was performed. The event also contains the timestamp of when said action was performed.
 *
 * This class has the following fields that can be publicly accessed:
 *      actions: Array<String>  -> actions that are being done
 *      boundKey: String        -> key bound to said actions that was pressed
 *      type: String            -> either "up" or "down"
 *      timestamp: Date         -> when key was pressed (optional)
 *      sessionID: String       -> Identifier for the current play session (optional)
 *      userID: String          -> Identifier for use (Spotify in Tune Mountain) (optional)
 */
class ActionEvent {

    /**
     * Instantiates an action event.
     *
     * Properties may contain:
     *      actions: Array<String> -> actions that are being done
     *      boundKey: String -> key bound to said actions that was pressed
     *      type: String -> either "up" or "down"
     *      timestamp: Date -> when key was pressed (optional)
     *      sessionID: String -> Identifier for the current play session (optional)
     *      userID: String -> Identifier for use (Spotify in Tune Mountain) (optional)
     *
     * Optional properties may be added using setter functions, with the exception of the timestamp.
     *
     * @param properties object containing event properties (see description).
     */
    constructor (properties = {}) {

        const {
            actions,
            boundKey,
            type,
            timestamp,
            sessionID,
            userID
        } = properties;

        // if required props aren't passed, throw error
        if (!actions || !boundKey || !type) {
            throw new Error('No \'actions\', \'boundKey\', or \'type\' passed to ActionEvent during instantiation!');
        }

        // set current date if no timestamp is passed
        if (timestamp) {
            this._timestamp = timestamp;
        } else {
            this._timestamp = Date.now();
        }

        // assign to object properties
        this._actions = actions;
        this._boundKey = boundKey;
        this._type = type;
        this._sessionID = sessionID;
        this._userID = userID;

    }

    /**
     * Returns an array of actions performed.
     * @returns {Array<String>} all actions performed
     */
    get actions() {
        return this._actions;
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
     * @returns {Date}
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
     * Returns the session ID where this action was performed.
     * @returns {*}
     */
    get sessionID() {
        return this._sessionID;
    }

    /**
     * Defines the session ID for the current action.
     * @param id the ID of the sessions
     */
    set sessionID(id) {
        this._sessionID = id;
    }

    /**
     * Returns the user ID of the user that performed the action.
     * @returns {*}
     */
    get userID() {
        return this._userID;
    }

    /**
     * Sets an ID for the user that performed the action.
     * @param value
     */
    set userID(value) {
        this._userID = value;
    }

    /**
     * Converts to an easily readable string
     * @returns {String}
     */
    toString() {
        return `ActionEvent: {
    'type': ${this._type}
    'actions': ${this._actions}
    'timestamp': ${this._timestamp}
    'userID': ${this._userID}
    'sessionID': ${this._sessionID}
}`
    }

}

module.exports = ActionEvent;
