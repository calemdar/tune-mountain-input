<a name="ActionHistoryUtil"></a>

## ActionHistoryUtil
Utility that keeps track of all actions recorded and saves them
with timestamp relative to start of session, allowing for ease of
synchronization with song.

**Kind**: global class  

* [ActionHistoryUtil](#ActionHistoryUtil)
    * [.history](#ActionHistoryUtil+history) ⇒ <code>Array.&lt;ActionEvent&gt;</code>
    * [.startSession()](#ActionHistoryUtil+startSession)
    * [.terminateSession()](#ActionHistoryUtil+terminateSession) ⇒ <code>Array</code>
    * [.onNewActionEvent(actionEvent)](#ActionHistoryUtil+onNewActionEvent)
    * [.pauseSession()](#ActionHistoryUtil+pauseSession)
    * [.resumeSession()](#ActionHistoryUtil+resumeSession)

<a name="ActionHistoryUtil+history"></a>

### actionHistoryUtil.history ⇒ <code>Array.&lt;ActionEvent&gt;</code>
Getter for history of actions.

**Kind**: instance property of [<code>ActionHistoryUtil</code>](#ActionHistoryUtil)  
**Returns**: <code>Array.&lt;ActionEvent&gt;</code> - array containing all action event objects collected so far  
<a name="ActionHistoryUtil+startSession"></a>

### actionHistoryUtil.startSession()
Initializes timer, and allows for recording of sessions.
Can only be performed if session has not started.

Warning: previous history is reset with this action.

**Kind**: instance method of [<code>ActionHistoryUtil</code>](#ActionHistoryUtil)  
<a name="ActionHistoryUtil+terminateSession"></a>

### actionHistoryUtil.terminateSession() ⇒ <code>Array</code>
Terminates session, resets timer and stops recording actions.

**Kind**: instance method of [<code>ActionHistoryUtil</code>](#ActionHistoryUtil)  
**Returns**: <code>Array</code> - session history or null if session has not started  
<a name="ActionHistoryUtil+onNewActionEvent"></a>

### actionHistoryUtil.onNewActionEvent(actionEvent)
Function for handling the subscription to the stream of actions.

**Kind**: instance method of [<code>ActionHistoryUtil</code>](#ActionHistoryUtil)  

| Param | Type | Description |
| --- | --- | --- |
| actionEvent | <code>ActionEvent</code> | action event coming from stream |

<a name="ActionHistoryUtil+pauseSession"></a>

### actionHistoryUtil.pauseSession()
Pauses recording of actions. Relative time is preserved.

**Kind**: instance method of [<code>ActionHistoryUtil</code>](#ActionHistoryUtil)  
<a name="ActionHistoryUtil+resumeSession"></a>

### actionHistoryUtil.resumeSession()
Adapts timer and resumes session.

**Kind**: instance method of [<code>ActionHistoryUtil</code>](#ActionHistoryUtil)  
