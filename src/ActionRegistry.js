/**
 * This class is responsible for keeping track of all buttons and what actions are tied to them.
 *
 * It can be initialized either with a map of key bindings to actions, or empty. Actions can be added or
 * switched on the fly.
 *
 * Bindings should be in the form
 *
 * const actions = {
 *     "A": ["Jump", "Crouch"],
 *     " ": ["TrickOne"],
 *     ...
 * }
 *
 * Actions can have any name as long as they're CONSISTENT, since multiple
 * buttons can have the same action. Button bindings **must** match the
 * available keys in the DOM Key Values documentation.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 */
class ActionRegistry {

    constructor (bindings = {}) {

        // init button binding registry
        this.bindings = bindings;

    }

    /**
     * Adds a action to a key binding. If the key is not bound yet, then it
     * adds key to register and binds action to it.
     *
     * @see setBindingTo()
     * @see checkBindingOf()
     * @param {String} keyValue value of key, described in
     * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
     * @param {Array<String>} actionOrActionArray a string or an array of strings describing the action
     */
    bindActionToKey(keyValue, actionOrActionArray) {

        const binding = this.bindings[keyValue];

        // if doesn't exist, initialize
        if (!binding && !Array.isArray(binding)) {

            this.bindings[keyValue] = [];

        } else if (binding && !Array.isArray(binding)) {

            // if binding exists and it't not an array, throw error
            throw new Error(`Binding ${binding} is not an array. All bindings must be an array of action!`);

        }

        if (Array.isArray(actionOrActionArray)) this.bindings[keyValue].push(...actionOrActionArray);
        else this.bindings[keyValue].push(actionOrActionArray);

    }

    /**
     * Replaces current binding with the action array
     * @param keyValue {String} value of key, described in
     * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
     * @param actionArray {Array} an array of actions (Strings)
     */
    setBindingTo(keyValue, actionArray) {

        this.bindings[keyValue] = actionArray;

    }

    /**
     * Returns an array of values for a given key, or null if no actions are bound to it.
     * @param keyValue
     */
    getActionsForKey(keyValue) {

        return this.bindings[keyValue] || null;

    }

    /**
     * returns true if key value is bound to anything.
     * @param keyValue
     * @returns {boolean}
     */
    isBound(keyValue) {

        return !!this.getActionsForKey(keyValue);

    }

}

module.exports = ActionRegistry;
