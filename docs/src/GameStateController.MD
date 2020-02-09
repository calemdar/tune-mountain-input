<a name="GameStateController"></a>

## GameStateController
Utilizes an RX subject to emit and handle transitions to different states and to initiate transitions to
different states.

**Kind**: global class  

* [GameStateController](#GameStateController)
    * [.request(newGameState, body)](#GameStateController+request) ⇒ <code>void</code>
    * [.notify(updatedGameState, body)](#GameStateController+notify) ⇒ <code>void</code>
    * [.onRequestTo(state, handler)](#GameStateController+onRequestTo) ⇒ [<code>GameStateController</code>](#GameStateController)
    * [.onNotificationOf(state, handler)](#GameStateController+onNotificationOf) ⇒ [<code>GameStateController</code>](#GameStateController)
    * [.clearControllerHandlers()](#GameStateController+clearControllerHandlers) ⇒ <code>void</code>
    * [.clearNotifierHandlers()](#GameStateController+clearNotifierHandlers) ⇒ <code>void</code>

<a name="GameStateController+request"></a>

### gameStateController.request(newGameState, body) ⇒ <code>void</code>
Requests game to transition to a given state. Can be handled by binding
handlers using the function onRequestTo(state);

**Kind**: instance method of [<code>GameStateController</code>](#GameStateController)  

| Param | Type | Description |
| --- | --- | --- |
| newGameState | <code>GAME\_STATES</code> | one of the handled game states |
| body | <code>Object</code> | contents of state notification. |

<a name="GameStateController+notify"></a>

### gameStateController.notify(updatedGameState, body) ⇒ <code>void</code>
Notifies a successful transition to a given state, or error. Can be handled by binding
handlers using the function onNotificationOf(state);

**Kind**: instance method of [<code>GameStateController</code>](#GameStateController)  

| Param | Type | Description |
| --- | --- | --- |
| updatedGameState | <code>GAME\_STATES</code> | the state the game just finished transitioning to |
| body | <code>Object</code> | contents of state notification. |

<a name="GameStateController+onRequestTo"></a>

### gameStateController.onRequestTo(state, handler) ⇒ [<code>GameStateController</code>](#GameStateController)
Creates a subscription to handle a given state request. Should be called on the game-side.
Will pass entire message to handler as the only parameter.

**Kind**: instance method of [<code>GameStateController</code>](#GameStateController)  
**Returns**: [<code>GameStateController</code>](#GameStateController) - the object. Allows chaining of handlers.  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>GAME\_STATES</code> | the state change request that will be handled |
| handler | <code>function</code> | function that will handle change. Only parameter passed is the emitted message, that contains 'state' and 'body' fields. |

<a name="GameStateController+onNotificationOf"></a>

### gameStateController.onNotificationOf(state, handler) ⇒ [<code>GameStateController</code>](#GameStateController)
Creates a subscription to handle a given state request. Should be called on the game-side.
Will pass entire message to handler as the only parameter.

**Kind**: instance method of [<code>GameStateController</code>](#GameStateController)  
**Returns**: [<code>GameStateController</code>](#GameStateController) - the object. Allows chaining of handlers.  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>GAME\_STATES</code> | the state change request that will be handled |
| handler | <code>function</code> | function that will handle change. Only parameter passed is the emitted message, that contains 'state' and 'body' fields. |

<a name="GameStateController+clearControllerHandlers"></a>

### gameStateController.clearControllerHandlers() ⇒ <code>void</code>
Clears out all controller handlers for proper garbage collection.

**Kind**: instance method of [<code>GameStateController</code>](#GameStateController)  
<a name="GameStateController+clearNotifierHandlers"></a>

### gameStateController.clearNotifierHandlers() ⇒ <code>void</code>
Clears out all notifier handlers for proper garbage collection.

**Kind**: instance method of [<code>GameStateController</code>](#GameStateController)  
