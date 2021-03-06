<a name="ActionEvent"></a>

## ActionEvent
This class defines the packet that contains the ActionEvent
that is emitted when a button is pressed.

An event will contain an encapsulate an action, the key bound to it at the time of pressing, and the time in which it was pressed.
The type of press can be either "press" or "release"

**Kind**: global class  

* [ActionEvent](#ActionEvent)
    * [new ActionEvent(properties)](#new_ActionEvent_new)
    * [.action](#ActionEvent+action) ⇒ <code>String</code>
    * [.boundKey](#ActionEvent+boundKey) ⇒ <code>String</code>
    * [.type](#ActionEvent+type) ⇒ <code>String</code>
    * [.timestamp](#ActionEvent+timestamp) ⇒ <code>Date</code>
    * [.timestamp](#ActionEvent+timestamp)
    * [.toString()](#ActionEvent+toString) ⇒ <code>String</code>

<a name="new_ActionEvent_new"></a>

### new ActionEvent(properties)
Instantiates an action event.

Properties may contain:
     actions: Array<String> -> actions that are being done
     boundKey: String -> key bound to said actions that was pressed
     type: String -> either "press" or "release"
     timestamp: Date.now() when key was pressed

Optional properties may be added using setter functions, with the exception of the timestamp.


| Param | Description |
| --- | --- |
| properties | object containing event properties (see description). |

<a name="ActionEvent+action"></a>

### actionEvent.action ⇒ <code>String</code>
Returns an array of actions performed.

**Kind**: instance property of [<code>ActionEvent</code>](#ActionEvent)  
**Returns**: <code>String</code> - all actions performed  
<a name="ActionEvent+boundKey"></a>

### actionEvent.boundKey ⇒ <code>String</code>
Returns a String representing the key bound to the actions performed at time of usage

**Kind**: instance property of [<code>ActionEvent</code>](#ActionEvent)  
**Returns**: <code>String</code> - a key value  
<a name="ActionEvent+type"></a>

### actionEvent.type ⇒ <code>String</code>
Returns the type of key press (either 'up' or 'down', or as defined inside Manager.js)

**Kind**: instance property of [<code>ActionEvent</code>](#ActionEvent)  
**Returns**: <code>String</code> - a type  
<a name="ActionEvent+timestamp"></a>

### actionEvent.timestamp ⇒ <code>Date</code>
Returns a Date object. Represents the time and date the action was performed.

**Kind**: instance property of [<code>ActionEvent</code>](#ActionEvent)  
<a name="ActionEvent+timestamp"></a>

### actionEvent.timestamp
Sets timestamp to new value

**Kind**: instance property of [<code>ActionEvent</code>](#ActionEvent)  

| Param |
| --- |
| newTime | 

<a name="ActionEvent+toString"></a>

### actionEvent.toString() ⇒ <code>String</code>
Converts to an easily readable string

**Kind**: instance method of [<code>ActionEvent</code>](#ActionEvent)  
