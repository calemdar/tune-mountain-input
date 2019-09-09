<a name="Manager"></a>

## Manager
Class that tracks user input for a given DOM element and outputs an object
of type Input to the InputObservable, that can be acquired through
the function
InputManager.getInputObservable();

The input manager will automatically attach itself to the 'document' and listen
for any and all key presses, but one may set it to listen for key presses on a specific
DOM element.

**Kind**: global class  

* [Manager](#Manager)
    * [new Manager(DOMElement, bindings, identifiers)](#new_Manager_new)
    * [.getObservable()](#Manager+getObservable)
    * [.clear()](#Manager+clear)
    * [.bindAction(key, action)](#Manager+bindAction)
    * [.setBinding(key, actions)](#Manager+setBinding)

<a name="new_Manager_new"></a>

### new Manager(DOMElement, bindings, identifiers)
Attaches InputManager to a given DOMElement, or if none is passed,
attaches it to entire document.


| Param | Type | Description |
| --- | --- | --- |
| DOMElement | <code>Node</code> | the desired element |
| bindings | <code>Object</code> | map of key values to an array of actions |
| identifiers | <code>Object</code> | object containing the ids that will be used for this manager (i.e. userID, sessionID, etc) |

<a name="Manager+getObservable"></a>

### manager.getObservable()
Returns the action observable.
Subscribe to this observable to handle actions.

**Kind**: instance method of [<code>Manager</code>](#Manager)  
<a name="Manager+clear"></a>

### manager.clear()
Clears subscriptions to clear memory.

**Kind**: instance method of [<code>Manager</code>](#Manager)  
<a name="Manager+bindAction"></a>

### manager.bindAction(key, action)
Binds one or more actions to a given key. If key already has one or more actions bound
to it, it appends the action to the existing actions.

**Kind**: instance method of [<code>Manager</code>](#Manager)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | the value of a key as defined in https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values |
| action | <code>Array.&lt;String&gt;</code> | one (String) or more (Array<String>) actions to be bound to the key |

<a name="Manager+setBinding"></a>

### manager.setBinding(key, actions)
Binds an array of actions to a given key.
WARNING: this will erase all previous bindings.

**Kind**: instance method of [<code>Manager</code>](#Manager)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | the value of a key as defined in https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values |
| actions | <code>Array.&lt;String&gt;</code> | an array of actions to be bound |

