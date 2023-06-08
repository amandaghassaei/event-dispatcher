[@amandaghassaei/event-dispatcher](../README.md) / EventDispatcherPrototype

# Class: EventDispatcherPrototype<T\>

Parent class for typed EventDispatcher subclasses.
See https://github.com/amandaghassaei/event-dispatcher#use
for an example of how to subclass EventDispatcherPrototype.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | The type of events this object should dispatch. |

## Table of contents

### Constructors

- [constructor](EventDispatcherPrototype.md#constructor)

### Methods

- [\_prototype\_addOneTimeEventListener](EventDispatcherPrototype.md#_prototype_addonetimeeventlistener)
- [\_prototype\_addEventListener](EventDispatcherPrototype.md#_prototype_addeventlistener)
- [\_prototype\_removeEventListener](EventDispatcherPrototype.md#_prototype_removeeventlistener)
- [\_prototype\_dispatchEvent](EventDispatcherPrototype.md#_prototype_dispatchevent)
- [getNumberOfListenersForEvent](EventDispatcherPrototype.md#getnumberoflistenersforevent)
- [dispose](EventDispatcherPrototype.md#dispose)

## Constructors

### constructor

• **new EventDispatcherPrototype**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

## Methods

### \_prototype\_addOneTimeEventListener

▸ `Protected` **_prototype_addOneTimeEventListener**(`type`, `listener`): `void`

Add one time event listener for a given event type (unsubscriber is called after first dispatch).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | The type of the event as a string. |
| `listener` | [`EventListener`](../README.md#eventlistener) | An event listener function. |

#### Returns

`void`

___

### \_prototype\_addEventListener

▸ `Protected` **_prototype_addEventListener**(`type`, `listener`): `void`

Add an event listener for a given event type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | The type of the event as a string. |
| `listener` | [`EventListener`](../README.md#eventlistener) | An event listener function |

#### Returns

`void`

___

### \_prototype\_removeEventListener

▸ `Protected` **_prototype_removeEventListener**(`type`, `listener`): `void`

Remove an event listener for a given event type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | The type of the event as a string. |
| `listener` | [`EventListener`](../README.md#eventlistener) | The currently bound event listener function. |

#### Returns

`void`

___

### \_prototype\_dispatchEvent

▸ `Protected` **_prototype_dispatchEvent**(`type`, `object?`): `void`

Dispatch an event from this object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | The type of the event as a string. |
| `object?` | `any` | An optional object to pass to event listener function. |

#### Returns

`void`

___

### getNumberOfListenersForEvent

▸ **getNumberOfListenersForEvent**(`type`): `number`

Returns the number of currently bound listeners for a given event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | Event type. |

#### Returns

`number`

- The number of currently bound listeners for this event type.

___

### dispose

▸ **dispose**(): `void`

Dispose all currently bound listeners from this object.

#### Returns

`void`
