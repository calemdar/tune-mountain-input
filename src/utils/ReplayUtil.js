const ActionEvent = require('./ActionEvent');

/**
 * Wraps code for chaining timeout calls to emit replays.
 */
class ReplayUtil {

    /**
     * Constructor for replay utility. Must be initialized with an emitter function.
     * This function will be called on every action at the time the action should be performed.
     *
     * This is usually passed as some Rx.Subject.next(), but I decided to keep it flexible, because this
     * code seems useful.
     *
     * @param {Function} emitterFunction called with every action event at the time the event is replayed. Only parameter is the `ActionEvent` object itself.
     * @param {Function} onConclusion called when there are no more inputs
     */
    constructor(emitterFunction, onConclusion) {

        // type check
        if (typeof emitterFunction !== 'function') throw new Error(`Emitter function parameter is of wrong type. Type: ${typeof emitterFunction}.`);
        if (typeof onConclusion !== 'function') throw new Error(`End of input stream handler (onConclusion) parameter is of wrong type. Type: ${typeof onConclusion}.`);

        this.actions = [];
        this.emit = emitterFunction;
        this.onEndOfInputs = onConclusion;
        this.currentTimeout = null;

        // bind funcs
        this.emitEventAt = this.emitEventAt.bind(this);
        this.loadActions = this.loadActions.bind(this);
        this.terminateReplay = this.terminateReplay.bind(this);
        this.beginReplay = this.beginReplay.bind(this);

    }

    /**
     * Getter to determine if replay util is currently replaying.
     *
     * @returns {boolean} true if timeout is ongoing, false if timeout has been cleared.
     */
    get isReplaying() {
        return !!this.currentTimeout;
    }

    /**
     * Emits event at index, and if there is a next move, set an appropriate
     * timeout for said move.
     *
     * @param {Number} index index of the move to be emitted.
     */
    emitEventAt(index) {

        // will throw error if indexed out of bounds
        const currentMove = this.actions[index];

        // emit move
        this.emit(currentMove);

        // check for next move
        let nextMove;

        // if index is appropriate
        if (index + 1 < this.actions.length) {

            // set next move
            nextMove = this.actions[index + 1];

        }

        // if we have a next move, chain it
        if (nextMove) {

            this.currentTimeout = setTimeout(
                this.emitEventAt,
                nextMove.timestamp - currentMove.timestamp,
                index + 1
            );

        } else {

            // if not, call the end function
            this.onEndOfInputs();
            this.terminateReplay();

        }

    }

    /**
     * Loads actions into the module.
     * @param {Array<ActionEvent>} actionArray events in list should have a timestamp field
     */
    loadActions(actionArray) {

        // check for presence of timestamp field
        actionArray.forEach((action, index) => {
            if (!action.timestamp) throw new Error(`An action at index ${index} is missing the timestamp field. Aborting.`);
        });

        // set local variable, convert it to a proper ActionEvent
        this.actions = actionArray.map(input => new ActionEvent({
            ...input
        }));

    }

    /**
     * Cancels timeout chain. This type of termination (forced) does not call onEndOfInput();
     */
    terminateReplay() {

        clearTimeout(this.currentTimeout);

        this.currentTimeout = null;

    }

    /**
     * Begins timeout chain with the loaded actions. If replay is not forcibly terminated,
     * the module will call "onEndOfInput" at the end of the stream.
     */
    beginReplay() {

        // possibility for pausing? restarting at a given arbitrary input would require accounting for when the pause happened.
        const beginIndex = 0;

        if (!this.actions || this.actions.length < 1) {

            this.onEndOfInputs();

            return;

        }

        const firstMove = this.actions[beginIndex];

        // begin timeout chain
        setTimeout(
            this.emitEventAt,
            firstMove.timestamp,
            0
        );

    }

}

module.exports = ReplayUtil;
