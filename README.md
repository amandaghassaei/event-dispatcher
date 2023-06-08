# @amandaghassaei/event-dispatcher
[![NPM Package](https://img.shields.io/npm/v/@amandaghassaei/event-dispatcher)](https://www.npmjs.com/package/@amandaghassaei/event-dispatcher)
[![Build Size](https://img.shields.io/bundlephobia/min/@amandaghassaei/event-dispatcher)](https://bundlephobia.com/result?p=@amandaghassaei/event-dispatcher)
[![NPM Downloads](https://img.shields.io/npm/dw/@amandaghassaei/event-dispatcher)](https://www.npmtrends.com/@amandaghassaei/event-dispatcher)
[![License](https://img.shields.io/npm/l/@amandaghassaei/event-dispatcher)](https://github.com/amandaghassaei/event-dispatcher/blob/main/LICENSE)
![](https://img.shields.io/badge/Coverage-100%25-83A603.svg?prefix=$coverage$)

Parent class to support custom event listeners.

- Written in Typescript with exported type declarations.
- Includes unit tests with 100% coverage.

Table of Contents:

- [Installation](#installation)
- [Use](#use)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Development](#development)

## Installation

### Install via NPM

```sh
npm install @amandaghassaei/event-dispatcher
```
Then import via:
```js
import { EventDispatcherPrototype } from '@amandaghassaei/event-dispatcher';
```

### Install as JS
*OR* in the browser you can add [event-dispatcher.js](https://github.com/amandaghassaei/event-dispatcher/blob/main/dist/event-dispatcher.js) or [event-dispatcher.min.js](https://github.com/amandaghassaei/event-dispatcher/blob/main/dist/event-dispatcher.min.js) to your html:
```html
<html>
    <head>
        ....
        <script src="event-dispatcher.min.js"></script>
    </head>
    <body>
    </body>
</html>
```
Then in your js files, you can access the global variable `EVENT_DISPATCHER`:

```js
const { EventDispatcherPrototype } = EVENT_DISPATCHER;
```

## Use

See full API documentation in [docs/](https://github.com/amandaghassaei/event-dispatcher/tree/main/docs).

```js
import {
  EventDispatcherPrototype,
  EventListener,
} from '@amandaghassaei/event-dispatcher';

// Define events and class event types.
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

// Create a custom EventDispatcher subclass.
// Use function overloads to define correct typing of subclass event/listener pairs.
// Event listeners may accept an optional parameter.
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

  // You may decide to make dispatchEvent a protected function,
  // which can only be called from within the subclass.
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

// Define your EventListener subclasses.
class ThingA extends EventDispatcher<ThingAEventType>{
  ...
}
class ThingB extends EventDispatcher<ThingBEventType>{
  ...
}
```


## License

This work is distributed under an [MIT license](https://github.com/amandaghassaei/event-dispatcher/blob/main/LICENSE).  It has no dependencies.


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

