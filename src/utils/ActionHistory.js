const DEFAULT_DELAY_MS = 350;

/**
 * Utility that keeps track of all actions recorded and saves them
 * with timestamp relative to start of session, allowing for ease of
 * synchronization with song.
 */
class ActionHistoryUtil {

    constructor(actionObservable, delayMs = DEFAULT_DELAY_MS) {

        if (!actionObservable) throw new Error('No action stream. Must pass a reference to action observable.');

        this._actionHistory = [];
        this._recordActions = false;
        this._sessionStarted = false;
        this._initialTime = -1;
        this._pauseOffset = 0; // should be zero until there's a pause event
        this._actionStream = actionObservable;
        this._delayMs = delayMs;

        this.onNewActionEvent = this.onNewActionEvent.bind(this);

        // subscribe to update values
        this._actionStream
            .filter(() => this._recordActions)
            .subscribe(actionEvent => this.onNewActionEvent(actionEvent));

    }

    /**
     * Initializes timer, and allows for recording of sessions.
     * Can only be performed if session has not started.
     *
     * Warning: previous history is reset with this action.
     */
    startSession() {
        if (this._sessionStarted) {
            console.error('Session currently running. Must terminate before starting.');
        } else {
            this._recordActions = true;
            this._sessionStarted = true;
            this._initialTime = Date.now();
            this._actionHistory = [];
        }
    }

    /**
     * Terminates session, resets timer and stops recording actions.
     *
     * @returns {Array} session history or null if session has not started
     */
    terminateSession() {
        if (this._sessionStarted) {
            this._recordActions = false;
            this._sessionStarted = false;
            this._initialTime = -1;

            return this._actionHistory;
        }
        console.error('Cannot terminate session that has not started.');

        return null;
    }

    /**
     * Function for handling the subscription to the stream of actions.
     *
     * @param {ActionEvent} actionEvent action event coming from stream
     */
    onNewActionEvent(actionEvent) {


        // set action event time to relative time
        actionEvent.timestamp = actionEvent.timestamp - this._initialTime + this._pauseOffset - this._delayMs;
        console.log('Recorded timestamp', actionEvent.timestamp);

        // save in history
        this._actionHistory.push(actionEvent);

    }

    /**
     *  Pauses recording of actions. Relative time is preserved.
     */
    pauseSession() {

        if (this._recordActions) {

            // always accumulate pause offset
            // const lastTimestamp = this._actionHistory[this._actionHistory.length];

            this._pauseOffset += Date.now() - this._initialTime;
            this._recordActions = false;

        } else console.error('Session already paused.');

    }

    /**
     *  Adapts timer and resumes session.
     */
    resumeSession() {

        if (this._recordActions) {
            console.error('Cannot resume an unpaused session.');
        } else {

            this._recordActions = true;
            this._initialTime = Date.now();

        }

    }

    /**
     * Getter for history of actions.
     * @returns {[]|Array} array containing all action event objects collected so far
     */
    get history() {
        return this._actionHistory;
    }

}

module.exports = ActionHistoryUtil;
