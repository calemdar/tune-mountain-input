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
    * [new Manager(DOMElement, bindings)](#new_Manager_new)
    * [.toggleEmissions()](#Manager+toggleEmissions)
    * [.startSession()](#Manager+startSession)
    * [.terminateSession()](#Manager+terminateSession) ⇒ <code>Array.&lt;ActionEvent&gt;</code>
    * [.pauseSession()](#Manager+pauseSession)
    * [.resumeSession()](#Manager+resumeSession)
    * [.getObservable()](#Manager+getObservable)
    * [.clear()](#Manager+clear)
    * ~~[.bindAction(key, action)](#Manager+bindAction)~~
    * [.setBinding(key, action)](#Manager+setBinding)

<a name="new_Manager_new"></a>

### new Manager(DOMElement, bindings)
Attaches InputManager to a given DOMElement, or if none is passed,
attaches it to entire document.


| Param | Type | Description |
| --- | --- | --- |
| DOMElement | <code>Node</code> | the desired element |
| bindings | <code>Object</code> | map of key values to an array of actions etc) |

<a name="Manager+toggleEmissions"></a>

### manager.toggleEmissions()
Toggles whether inputs are emitted;

**Kind**: instance method of [<code>Manager</code>](#Manager)  
<a name="Manager+startSession"></a>

### manager.startSession()
Starts session and timer. Turns on both emissions and recording, if not already on.
Assumes song timer is at zero.

**Kind**: instance method of [<code>Manager</code>](#Manager)  
<a name="Manager+terminateSession"></a>

### manager.terminateSession() ⇒ <code>Array.&lt;ActionEvent&gt;</code>
Terminates session and returns array of action events recorded.

**Kind**: instance method of [<code>Manager</code>](#Manager)  
**Returns**: <code>Array.&lt;ActionEvent&gt;</code> - all action events recorded.  
<a name="Manager+pauseSession"></a>

### manager.pauseSession()
Pauses recording and timer, if session is ongoing.

**Kind**: instance method of [<code>Manager</code>](#Manager)  
<a name="Manager+resumeSession"></a>

### manager.resumeSession()
Resumes recording and timer, if session is ongoing.

**Kind**: instance method of [<code>Manager</code>](#Manager)  
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

### ~~manager.bindAction(key, action)~~
***Deprecated***

**Kind**: instance method of [<code>Manager</code>](#Manager)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | the value of a key as defined in https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values |
| action | <code>String</code> | to be bound to key |

<a name="Manager+setBinding"></a>

### manager.setBinding(key, action)
Binds an array of actions to a given key.
WARNING: this will erase all previous bindings.

**Kind**: instance method of [<code>Manager</code>](#Manager)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | the value of a key as defined in https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values |
| action | <code>String</code> | an array of actions to be bound |

