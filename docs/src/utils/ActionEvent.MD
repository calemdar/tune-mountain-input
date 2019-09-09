<a name="ActionEvent"></a>

## ActionEvent
This class defines the packet that contains the ActionEvent
that is emitted when a button is pressed.

An event will contain an array of actions (Strings) and a key that was bound to it at
the time the action was performed. The event also contains the timestamp of when said action was performed.

This class has the following fields that can be publicly accessed:
     actions: Array<String>  -> actions that are being done
     boundKey: String        -> key bound to said actions that was pressed
     type: String            -> either "up" or "down"
     timestamp: Date         -> when key was pressed (optional)
     sessionID: String       -> Identifier for the current play session (optional)
     userID: String          -> Identifier for use (Spotify in Tune Mountain) (optional)

**Kind**: global class  

* [ActionEvent](#ActionEvent)
    * [new ActionEvent(properties)](#new_ActionEvent_new)
    * [.actions](#ActionEvent+actions)
    * [.boundKey](#ActionEvent+boundKey)
    * [.type](#ActionEvent+type)
    * [.timestamp](#ActionEvent+timestamp)
    * [.sessionID](#ActionEvent+sessionID)
    * [.sessionID](#ActionEvent+sessionID)
    * [.userID](#ActionEvent+userID)
    * [.userID](#ActionEvent+userID)
    * [.toString()](#ActionEvent+toString) ⇒ <code>string</code>

<a name="new_ActionEvent_new"></a>

### new ActionEvent(properties)
Instantiates an action event.

Properties may contain:
     actions: Array<String> -> actions that are being done
     boundKey: String -> key bound to said actions that was pressed
     type: String -> either "up" or "down"
     timestamp: Date -> when key was pressed (optional)
     sessionID: String -> Identifier for the current play session (optional)
     userID: String -> Identifier for use (Spotify in Tune Mountain) (optional)

Optional properties may be added using setter functions, with the exception of the timestamp.


| Param | Description |
| --- | --- |
| properties | object containing event properties (see description). |

<a name="ActionEvent+actions"></a>

### actionEvent.actions
Returns an array of actions performed.

**Kind**: instance property of [<code>ActionEvent</code>](#ActionEvent)  
<a name="ActionEvent+boundKey"></a>

### actionEvent.boundKey
Returns a String representing the key bound to the actions performed at time of usage

**Kind**: instance property of [<code>ActionEvent</code>](#ActionEvent)  
<a name="ActionEvent+type"></a>

### actionEvent.type
Returns the type of key press (either 'up' or 'down', or as defined inside Manager.js)

**Kind**: instance property of [<code>ActionEvent</code>](#ActionEvent)  
<a name="ActionEvent+timestamp"></a>

### actionEvent.timestamp
Returns a Date object. Represents the time and date the action was performed.

**Kind**: instance property of [<code>ActionEvent</code>](#ActionEvent)  
<a name="ActionEvent+sessionID"></a>

### actionEvent.sessionID
Returns the session ID where this action was performed.

**Kind**: instance property of [<code>ActionEvent</code>](#ActionEvent)  
<a name="ActionEvent+sessionID"></a>

### actionEvent.sessionID
Defines the session ID for the current action.

**Kind**: instance property of [<code>ActionEvent</code>](#ActionEvent)  

| Param | Description |
| --- | --- |
| id | the ID of the sessions |

<a name="ActionEvent+userID"></a>

### actionEvent.userID
Returns the user ID of the user that performed the action.

**Kind**: instance property of [<code>ActionEvent</code>](#ActionEvent)  
<a name="ActionEvent+userID"></a>

### actionEvent.userID
Sets an ID for the user that performed the action.

**Kind**: instance property of [<code>ActionEvent</code>](#ActionEvent)  

| Param |
| --- |
| value | 

<a name="ActionEvent+toString"></a>

### actionEvent.toString() ⇒ <code>string</code>
Converts to an easily readable string

**Kind**: instance method of [<code>ActionEvent</code>](#ActionEvent)  
