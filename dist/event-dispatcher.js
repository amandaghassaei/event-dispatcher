(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.EVENT_DISPATCHER = {}));
})(this, (function (exports) { 'use strict';

    // export type EventListenerRemover = () => void;
    /**
     * Parent class for typed EventDispatcher subclasses.
     * See https://github.com/amandaghassaei/event-dispatcher#use
     * for an example of how to subclass EventDispatcherPrototype.
     * @param T - The type of events this object should dispatch.
     */
    var EventDispatcherPrototype = /** @class */ (function () {
        function EventDispatcherPrototype() {
        }
        /**
         * Add one time event listener for a given event type (unsubscriber is called after first dispatch).
         * @param type - The type of the event as a string.
         * @param listener - An event listener function.
         */
        EventDispatcherPrototype.prototype._addOneTimeEventListener = function (type, listener) {
            var _this = this;
            var _listener = function (object) {
                listener(object);
                _this._removeEventListener(type, _listener);
            };
            this._addEventListener(type, _listener);
            // return () => {
            // 	this._removeEventListener(type, _listener);
            // };
        };
        /**
         * Add an event listener for a given event type.
         * @param type - The type of the event as a string.
         * @param listener - An event listener function
         */
        EventDispatcherPrototype.prototype._addEventListener = function (type, listener) {
            if (!this.__listeners)
                this.__listeners = {};
            var listeners = this.__listeners;
            if (listeners[type] === undefined) {
                listeners[type] = [];
            }
            // Add listener only if it hasn't been added already.
            if (listeners[type].indexOf(listener) === -1) {
                listeners[type].push(listener);
            }
            else {
                console.warn("Event listener \"".concat(listener.name, "\" with value ").concat(listener.toString(), " has already been added to object ").concat(this.constructor.name, ", ignoring call to _addEventListener()."));
            }
            // return () => {
            // 	this._removeEventListener(type, listener);
            // };
        };
        /**
         * Remove an event listener for a given event type.
         * @param type - The type of the event as a string.
         * @param listener - The currently bound event listener function.
         */
        EventDispatcherPrototype.prototype._removeEventListener = function (type, listener) {
            var listeners = this.__listeners;
            if (listeners) {
                var listenerArray = listeners[type];
                if (listenerArray) {
                    var index = listenerArray.indexOf(listener);
                    if (index !== -1) {
                        listenerArray.splice(index, 1);
                        return;
                    }
                }
            }
            throw new Error("Event listener \"".concat(listener.name, "\" with value ").concat(listener.toString(), " is not present on object ").concat(this.constructor.name, ", ignoring call to _removeEventListener()."));
        };
        /**
         * Dispatch an event from this object.
         * @param type - The type of the event as a string.
         * @param object - An optional object to pass to event listener function.
         */
        EventDispatcherPrototype.prototype._dispatchEvent = function (type, object) {
            if (this.__listeners === undefined)
                return;
            var listeners = this.__listeners;
            var listenerArray = listeners[type];
            if (listenerArray) {
                // Make a copy in case listeners are removed while iterating.
                listenerArray = listenerArray.slice(0);
                for (var i = 0, l = listenerArray.length; i < l; i++) {
                    listenerArray[i](object);
                }
            }
        };
        /**
         * Returns the number of currently bound listeners for a given event.
         * @param type - Event type.
         * @returns - The number of currently bound listeners for this event type.
         */
        EventDispatcherPrototype.prototype.getNumberOfListenersForEvent = function (type) {
            var __listeners = this.__listeners;
            if (!__listeners)
                return 0;
            var typeListeners = __listeners[type];
            if (!typeListeners)
                return 0;
            return typeListeners.length;
        };
        /**
         * Dispose all currently bound listeners from this object.
         */
        EventDispatcherPrototype.prototype.dispose = function () {
            // Remove all event listeners.
            this.__listeners = undefined;
        };
        return EventDispatcherPrototype;
    }());

    exports.EventDispatcherPrototype = EventDispatcherPrototype;

}));
//# sourceMappingURL=event-dispatcher.js.map
