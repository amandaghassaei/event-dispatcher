type EventListener = (object?: any) => void;
/**
 * Parent class for typed EventDispatcher subclasses.
 * See https://github.com/amandaghassaei/event-dispatcher#use
 * for an example of how to subclass EventDispatcherPrototype.
 * @param T - The type of events this object should dispatch.
 */
declare class EventDispatcherPrototype<T> {
    /**
     * @private
     */
    private __listeners;
    /**
     * Add one time event listener for a given event type (unsubscriber is called after first dispatch).
     * @param type - The type of the event as a string.
     * @param listener - An event listener function.
     */
    protected _addOneTimeEventListener(type: T, listener: EventListener): void;
    /**
     * Add an event listener for a given event type.
     * @param type - The type of the event as a string.
     * @param listener - An event listener function
     */
    protected _addEventListener(type: T, listener: EventListener): void;
    /**
     * Remove an event listener for a given event type.
     * @param type - The type of the event as a string.
     * @param listener - The currently bound event listener function.
     */
    protected _removeEventListener(type: T, listener: EventListener): void;
    /**
     * Dispatch an event from this object.
     * @param type - The type of the event as a string.
     * @param object - An optional object to pass to event listener function.
     */
    protected _dispatchEvent(type: T, object?: any): void;
    /**
     * Returns the number of currently bound listeners for a given event.
     * @param type - Event type.
     * @returns - The number of currently bound listeners for this event type.
     */
    getNumberOfListenersForEvent(type: T): number;
    /**
     * Dispose all currently bound listeners from this object.
     */
    dispose(): void;
}

export { EventDispatcherPrototype, EventListener };
