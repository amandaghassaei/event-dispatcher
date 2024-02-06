// export type EventListenerRemover = () => void;
/**
 * Parent class for typed EventDispatcher subclasses.
 * See https://github.com/amandaghassaei/event-dispatcher#use
 * for an example of how to subclass EventDispatcherPrototype.
 * @param T - The type of events this object should dispatch.
 */
export class EventDispatcher {
    /**
     * Add one time event listener for a given event type (removeEventListener is called after first dispatch).
     * @param type - The type of the event as a string.
     * @param listener - An event listener function.
     */
    addOneTimeEventListener(type, listener) {
        const _listener = (object) => {
            listener(object);
            this.removeEventListener(type, _listener);
        };
        this.addEventListener(type, _listener);
        // return () => {
        // 	this._removeEventListener(type, _listener);
        // };
    }
    /**
     * Add an event listener for a given event type.
     * @param type - The type of the event as a string.
     * @param listener - An event listener function
     */
    addEventListener(type, listener) {
        if (!this.__listeners)
            this.__listeners = {};
        const listeners = this.__listeners;
        if (listeners[type] === undefined) {
            listeners[type] = [];
        }
        // Add listener only if it hasn't been added already.
        if (listeners[type].indexOf(listener) === -1) {
            listeners[type].push(listener);
        }
        else {
            console.warn(`Event listener "${listener.name}" with value ${listener.toString()} has already been added to object ${this.constructor.name}, ignoring call to _addEventListener().`);
        }
        // return () => {
        // 	this._removeEventListener(type, listener);
        // };
    }
    /**
     * Remove an event listener for a given event type.
     * @param type - The type of the event as a string.
     * @param listener - The currently bound event listener function.
     */
    removeEventListener(type, listener) {
        const listeners = this.__listeners;
        if (listeners) {
            const listenerArray = listeners[type];
            if (listenerArray) {
                const index = listenerArray.indexOf(listener);
                if (index !== -1) {
                    listenerArray.splice(index, 1);
                    return;
                }
            }
        }
        // throw new Error(`Event listener "${listener.name}" with value ${listener.toString()} is not present on object ${this.constructor.name}, ignoring call to _removeEventListener().`);
    }
    /**
     * Dispatch an event from this object.
     * @param type - The type of the event as a string.
     * @param object - An optional object to pass to event listener function.
     */
    _dispatchEvent(type, object) {
        if (this.__listeners === undefined)
            return;
        const listeners = this.__listeners;
        let listenerArray = listeners[type];
        if (listenerArray) {
            // Make a copy in case listeners are removed while iterating.
            listenerArray = listenerArray.slice(0);
            for (let i = 0, l = listenerArray.length; i < l; i++) {
                listenerArray[i](object);
            }
        }
    }
    /**
     * Returns the number of currently bound listeners for a given event.
     * @param type - Event type.
     * @returns - The number of currently bound listeners for this event type.
     */
    getNumberOfListenersForEvent(type) {
        const { __listeners } = this;
        if (!__listeners)
            return 0;
        const typeListeners = __listeners[type];
        if (!typeListeners)
            return 0;
        return typeListeners.length;
    }
    /**
     * Dispose all currently bound listeners from this object.
     */
    dispose() {
        // Remove all event listeners.
        delete this.__listeners;
    }
}
//# sourceMappingURL=index.js.map