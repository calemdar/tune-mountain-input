<a name="ActionRegistry"></a>

## ActionRegistry
This class is responsible for keeping track of all buttons and what actions are tied to them.

It can be initialized either with a map of key bindings to actions, or empty. Actions can be added or
switched on the fly.

Bindings should be in the form

```js
const actions = {
    "A": ["Jump", "Crouch"],
    " ": ["TrickOne"],
    ...
}
```

Actions can have any name as long as they're CONSISTENT, since multiple
buttons can have the same action. Button bindings **must** match the
available keys in the DOM Key Values documentation.

https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values

**Kind**: global class  

* [ActionRegistry](#ActionRegistry)
    * [.bindActionToKey(keyValue, actionOrActionArray)](#ActionRegistry+bindActionToKey)
    * [.setBindingTo(keyValue, actionArray)](#ActionRegistry+setBindingTo)
    * [.getActionsForKey(keyValue)](#ActionRegistry+getActionsForKey)
    * [.isBound(keyValue)](#ActionRegistry+isBound) ⇒ <code>boolean</code>

<a name="ActionRegistry+bindActionToKey"></a>

### actionRegistry.bindActionToKey(keyValue, actionOrActionArray)
Adds a action to a key binding. If the key is not bound yet, then it
adds key to register and binds action to it.

**Kind**: instance method of [<code>ActionRegistry</code>](#ActionRegistry)  
**See**

- setBindingTo()
- checkBindingOf()


| Param | Type | Description |
| --- | --- | --- |
| keyValue | <code>String</code> | value of key, described in https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values |
| actionOrActionArray | <code>Array.&lt;String&gt;</code> | a string or an array of strings describing the action |

<a name="ActionRegistry+setBindingTo"></a>

### actionRegistry.setBindingTo(keyValue, actionArray)
Replaces current binding with the action array

**Kind**: instance method of [<code>ActionRegistry</code>](#ActionRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| keyValue | <code>String</code> | value of key, described in https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values |
| actionArray | <code>Array</code> | an array of actions (Strings) |

<a name="ActionRegistry+getActionsForKey"></a>

### actionRegistry.getActionsForKey(keyValue)
Returns an array of values for a given key, or null if no actions are bound to it.

**Kind**: instance method of [<code>ActionRegistry</code>](#ActionRegistry)  

| Param |
| --- |
| keyValue | 

<a name="ActionRegistry+isBound"></a>

### actionRegistry.isBound(keyValue) ⇒ <code>boolean</code>
returns true if key value is bound to anything.

**Kind**: instance method of [<code>ActionRegistry</code>](#ActionRegistry)  

| Param |
| --- |
| keyValue | 

