export type Listener = (object?: any) => void;
/**
 * Parent class for typed EventDispatcher subclasses.
 * See https://github.com/amandaghassaei/event-dispatcher#use
 * for an example of how to subclass EventDispatcherPrototype.
 * @param T - The type of events this object should dispatch.
 */
export declare class EventDispatcher<T extends string> {
    /**
     * @private
     */
    private __listeners;
    /**
     * Add one time event listener for a given event type (removeEventListener is called after first dispatch).
     * @param type - The type of the event as a string.
     * @param listener - An event listener function.
     */
    addOneTimeEventListener<S extends T>(type: S, listener: Listener): void;
    /**
     * Add an event listener for a given event type.
     * @param type - The type of the event as a string.
     * @param listener - An event listener function
     */
    addEventListener<S extends T>(type: S, listener: Listener): void;
    /**
     * Remove an event listener for a given event type.
     * @param type - The type of the event as a string.
     * @param listener - The currently bound event listener function.
     */
    removeEventListener<S extends T>(type: S, listener: Listener): void;
    /**
     * Dispatch an event from this object.
     * @param type - The type of the event as a string.
     * @param object - An optional object to pass to event listener function.
     */
    protected _dispatchEvent<S extends T>(type: S, object?: any): void;
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
