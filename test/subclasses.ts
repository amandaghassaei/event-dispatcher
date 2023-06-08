import { expect } from 'chai';
import {
	EventDispatcherPrototype,
	EventListener,
} from '../src/index';
import { checkWarnings, popLastWarning } from './utils';

// Define events.
const THING_A_CHANGE_EVENT = 'THING_A_CHANGE_EVENT';
const THING_A_FINISHED_EVENT = 'THING_A_FINISHED_EVENT';
const THING_A_REMOVED_EVENT = 'THING_A_REMOVED_EVENT';
type ThingAEventType =
	typeof THING_A_CHANGE_EVENT |
	typeof THING_A_FINISHED_EVENT |
	typeof THING_A_REMOVED_EVENT;
const THING_B_CHANGE_EVENT = 'THING_B_CHANGE_EVENT';
const THING_B_FINISHED_EVENT = 'THING_B_FINISHED_EVENT';
const THING_B_REMOVED_EVENT = 'THING_B_REMOVED_EVENT';
type ThingBEventType =
	typeof THING_B_CHANGE_EVENT |
	typeof THING_B_FINISHED_EVENT |
	typeof THING_B_REMOVED_EVENT;

// Create a custom EventDispatcher subclass with correct event typing for your application.

class EventDispatcher<T> extends EventDispatcherPrototype<T> {
	addOneTimeEventListener(type: typeof THING_A_REMOVED_EVENT, listener: () => void): void;
	addOneTimeEventListener(type: typeof THING_B_REMOVED_EVENT, listener: () => void): void;
	addOneTimeEventListener(type: any, listener: EventListener) {
		this._addOneTimeEventListener(type, listener);
	}

	addEventListener(type: typeof THING_A_CHANGE_EVENT, listener: (object: ThingA) => void): void;
	addEventListener(type: typeof THING_A_FINISHED_EVENT, listener: (object: ThingA) => void): void;
	addEventListener(type: typeof THING_B_CHANGE_EVENT, listener: (object: ThingB) => void): void;
	addEventListener(type: typeof THING_B_FINISHED_EVENT, listener: (object: ThingB) => void): void;
	addEventListener(type: any, listener: EventListener) {
		this._addEventListener(type, listener);
	}

	removeEventListener(type: typeof THING_A_CHANGE_EVENT, listener: (object: ThingA) => void): void;
	removeEventListener(type: typeof THING_A_FINISHED_EVENT, listener: (object: ThingA) => void): void;
	removeEventListener(type: typeof THING_B_CHANGE_EVENT, listener: (object: ThingB) => void): void;
	removeEventListener(type: typeof THING_B_FINISHED_EVENT, listener: (object: ThingB) => void): void;
	removeEventListener(type: any, listener: EventListener) {
		this._removeEventListener(type, listener);
	}

	dispatchEvent(type: typeof THING_A_CHANGE_EVENT, object: ThingA): void;
	dispatchEvent(type: typeof THING_A_FINISHED_EVENT, object: ThingA): void;
	dispatchEvent(type: typeof THING_B_CHANGE_EVENT, object: ThingB): void;
	dispatchEvent(type: typeof THING_B_FINISHED_EVENT, object: ThingB): void;
	dispatchEvent(type: typeof THING_A_REMOVED_EVENT): void;
	dispatchEvent(type: typeof THING_B_REMOVED_EVENT): void;
	dispatchEvent(type: any, object?: any) {
		this._dispatchEvent(type, object);
	}
}

// Define your classes.

class ThingA extends EventDispatcher<ThingAEventType>{}

class ThingB extends EventDispatcher<ThingBEventType>{}


describe('EventDispatcherPrototype', () => {
	afterEach(() => {
		checkWarnings();
	});
	it('addOneTimeEventListener', () => {
		let value = 0;
		const listener = () => {
			value += 1;
		}
		const thingA = new ThingA();
		thingA.addOneTimeEventListener(THING_A_REMOVED_EVENT, listener);
		expect(thingA.getNumberOfListenersForEvent(THING_A_REMOVED_EVENT)).to.equal(1);
		expect(value).to.equal(0);
		thingA.dispatchEvent(THING_A_CHANGE_EVENT, thingA);
		expect(value).to.equal(0);
		// Calling event should increment value only once.
		thingA.dispatchEvent(THING_A_REMOVED_EVENT);
		expect(value).to.equal(1);
		thingA.dispatchEvent(THING_A_REMOVED_EVENT);
		expect(value).to.equal(1);
		// Check that listener has been removed.
		expect(thingA.getNumberOfListenersForEvent(THING_A_REMOVED_EVENT)).to.equal(0);
	});
	it('addEventListener', () => {
		let value = 0;
		const listener = (thingA: ThingA) => {
			value += 1;
		}
		const thingA = new ThingA();
		thingA.addEventListener(THING_A_CHANGE_EVENT, listener);
		expect(thingA.getNumberOfListenersForEvent(THING_A_CHANGE_EVENT)).to.equal(1);
		expect(value).to.equal(0);
		thingA.dispatchEvent(THING_A_FINISHED_EVENT, thingA);
		expect(value).to.equal(0);
		// Calling event should increment value.
		thingA.dispatchEvent(THING_A_CHANGE_EVENT, thingA);
		expect(value).to.equal(1);
		thingA.dispatchEvent(THING_A_CHANGE_EVENT, thingA);
		expect(value).to.equal(2);
		// Check that listener has not been removed.
		expect(thingA.getNumberOfListenersForEvent(THING_A_CHANGE_EVENT)).to.equal(1);
		// Warn for duplicate event listeners.
		expect(popLastWarning()).to.equal(undefined);
		thingA.addEventListener(THING_A_CHANGE_EVENT, () => {});
		thingA.addEventListener(THING_A_FINISHED_EVENT, listener);
		expect(popLastWarning()).to.equal(undefined);
		thingA.addEventListener(THING_A_CHANGE_EVENT, listener);
		expect(popLastWarning()).to.equal(`Event listener "listener" with value function (thingA) {
            value += 1;
        } has already been added to object ThingA, ignoring call to _addEventListener().`);
		expect(popLastWarning()).to.equal(undefined);
	});
	it('removeEventListener', () => {
		let value1 = 0;
		let value2 = 0;
		const listener1 = (thingA: ThingA) => {
			value1 += 1;
		}
		const listener2 = (thingA: ThingA) => {
			value2 += 1;
		}
		const thingA = new ThingA();
		thingA.addEventListener(THING_A_CHANGE_EVENT, listener1);
		thingA.addEventListener(THING_A_CHANGE_EVENT, listener2);
		expect(thingA.getNumberOfListenersForEvent(THING_A_CHANGE_EVENT)).to.equal(2);
		expect(value1).to.equal(0);
		expect(value2).to.equal(0);
		// Calling event should increment values.
		thingA.dispatchEvent(THING_A_CHANGE_EVENT, thingA);
		expect(value1).to.equal(1);
		expect(value2).to.equal(1);
		thingA.dispatchEvent(THING_A_CHANGE_EVENT, thingA);
		expect(value1).to.equal(2);
		expect(value2).to.equal(2);
		// After removing listener1, only value2 should increment.
		thingA.removeEventListener(THING_A_CHANGE_EVENT, listener1);
		thingA.dispatchEvent(THING_A_CHANGE_EVENT, thingA);
		expect(value1).to.equal(2);
		expect(value2).to.equal(3);
		// Check that listener1 has been removed and listener2 has not been removed.
		expect(thingA.getNumberOfListenersForEvent(THING_A_CHANGE_EVENT)).to.equal(1);
		// Warn for removed event listeners that were never added.
		const unboundFunction = () => {};
		expect(() => {thingA.removeEventListener(THING_A_FINISHED_EVENT, unboundFunction);}).to.throw('Event listener "unboundFunction" with value function () { } is not present on object ThingA, ignoring call to _removeEventListener()');
		expect(() => {thingA.removeEventListener(THING_A_CHANGE_EVENT, unboundFunction);}).to.throw('Event listener "unboundFunction" with value function () { } is not present on object ThingA, ignoring call to _removeEventListener()');
		expect(() => {new ThingA().removeEventListener(THING_A_CHANGE_EVENT, unboundFunction);}).to.throw('Event listener "unboundFunction" with value function () { } is not present on object ThingA, ignoring call to _removeEventListener()');
	});
	it('dispatchEvent', () => {
		// This is mostly tested elsewhere.
		// Check that this works for events with no bound listeners.
		new ThingA().dispatchEvent(THING_A_REMOVED_EVENT);
	});
	it('getNumberOfListenersForEvent', () => {
		const thingA = new ThingA();
		expect(thingA.getNumberOfListenersForEvent(THING_A_CHANGE_EVENT)).to.equal(0);
		thingA.addEventListener(THING_A_CHANGE_EVENT, () => {});
		thingA.addEventListener(THING_A_CHANGE_EVENT, () => {});
		expect(thingA.getNumberOfListenersForEvent(THING_A_CHANGE_EVENT)).to.equal(2);
		expect(thingA.getNumberOfListenersForEvent(THING_A_FINISHED_EVENT)).to.equal(0);
	});
	it('dispose', () => {
		const listener1 = (thingA: ThingA) => {}
		const listener2 = (thingA: ThingA) => {}
		const thingA = new ThingA();
		thingA.addEventListener(THING_A_CHANGE_EVENT, listener1);
		thingA.addEventListener(THING_A_CHANGE_EVENT, listener2);
		expect(thingA.getNumberOfListenersForEvent(THING_A_CHANGE_EVENT)).to.equal(2);
		thingA.dispose();
		expect(thingA.getNumberOfListenersForEvent(THING_A_CHANGE_EVENT)).to.equal(0);
	});
});