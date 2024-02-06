# @amandaghassaei/event-dispatcher

[![NPM Package](https://img.shields.io/npm/v/@amandaghassaei/event-dispatcher)](https://www.npmjs.com/package/@amandaghassaei/event-dispatcher)
[![Build Size](https://img.shields.io/bundlephobia/min/@amandaghassaei/event-dispatcher)](https://bundlephobia.com/result?p=@amandaghassaei/event-dispatcher)
[![NPM Downloads](https://img.shields.io/npm/dw/@amandaghassaei/event-dispatcher)](https://www.npmtrends.com/@amandaghassaei/event-dispatcher)
[![License](https://img.shields.io/npm/l/@amandaghassaei/event-dispatcher)](https://github.com/amandaghassaei/event-dispatcher/blob/main/LICENSE)
![](https://img.shields.io/badge/Coverage-100%25-83A603.svg?prefix=$coverage$)

Parent class to support custom event listeners.

-   Written in TypeScript with exported type declarations.
-   Includes unit tests with 100% coverage.

Table of Contents:

-   [Installation](#installation)
-   [Use](#use)
-   [License](#license)
-   [Acknowledgements](#acknowledgements)
-   [Development](#development)

## Installation

### Install via NPM

```sh
npm install @amandaghassaei/event-dispatcher
```

Then import via:

```js
import { EventDispatcherPrototype } from '@amandaghassaei/event-dispatcher';
```

## Use

See full API documentation in [docs/](https://github.com/amandaghassaei/event-dispatcher/tree/main/docs).

```js
import { EventDispatcher, Listener } from '../src/index';

// Define events and class event types.
const ADDED_EVENT = 'ADDED_EVENT';
const CHANGE_EVENT = 'CHANGE_EVENT';
const FINISHED_EVENT = 'FINISHED_EVENT';
const REMOVED_EVENT = 'REMOVED_EVENT';
type MyClassEventType =
    | typeof ADDED_EVENT
    | typeof CHANGE_EVENT
    | typeof FINISHED_EVENT
    | typeof REMOVED_EVENT;

// Create an EventDispatcher subclass.
// Use function overloads to define correct typing of subclass event/listener pairs.
// Event listeners may accept an optional parameter.
class MyClass extends EventDispatcher<MyClassEventType> {
    addOneTimeEventListener(type: typeof ADDED_EVENT, listener: () => void): void;
    addOneTimeEventListener(type: typeof REMOVED_EVENT, listener: () => void): void;
    addOneTimeEventListener<S extends MyClassEventType>(type: S, listener: () => void) {
        super.addOneTimeEventListener(type, listener);
    }

    addEventListener(type: typeof CHANGE_EVENT, listener: (object: MyClass) => void): void;
    addEventListener(type: typeof FINISHED_EVENT, listener: (object: MyClass) => void): void;
    addEventListener<S extends MyClassEventType>(type: S, listener: Listener) {
        super.addEventListener(type, listener);
    }

    removeEventListener(type: typeof CHANGE_EVENT, listener: (object: MyClass) => void): void;
    removeEventListener(type: typeof FINISHED_EVENT, listener: (object: MyClass) => void): void;
    removeEventListener<S extends MyClassEventType>(type: S, listener: Listener) {
        super.removeEventListener(type, listener);
    }

    // You may decide to make dispatchEvent a protected function,
    // which can only be called from within the subclass.
    protected _dispatchEvent(type: typeof CHANGE_EVENT, object: MyClass): void;
    protected _dispatchEvent(type: typeof FINISHED_EVENT, object: MyClass): void;
    protected _dispatchEvent(type: typeof REMOVED_EVENT): void;
    protected _dispatchEvent<S extends MyClassEventType>(type: S, object?: any) {
        super._dispatchEvent(type, object);
    }
}

const instance = new MyClass();
instance.addEventListener(CHANGE_EVENT, (object) => {
    console.log('instance changed:', object);
});

// The following will throw type errors:

// REMOVED_EVENT is not a valid event type for MyClass.addEventListener().
// instance.addEventListener(REMOVED_EVENT, (object) => {});

// The object parameter must be of type MyClass.
// instance.addEventListener(CHANGE_EVENT, (object: number) => {});
```

## License

This work is distributed under an [MIT license](https://github.com/amandaghassaei/event-dispatcher/blob/main/LICENSE). It has no dependencies.

## Acknowledgements

Inspired by [Three.js's](https://github.com/mrdoob/three.js) EventDispatcher class.

## Development

Install dev-dependencies:

```sh
npm install
```

Build from `src` to `dist` and compile docs:

```sh
npm run build
```

Test with code coverage:

```sh
npm run test-with-coverage
```
