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

- [addOneTimeEventListener](EventDispatcherPrototype.md#addonetimeeventlistener)
- [addEventListener](EventDispatcherPrototype.md#addeventlistener)
- [removeEventListener](EventDispatcherPrototype.md#removeeventlistener)
- [\_dispatchEvent](EventDispatcherPrototype.md#_dispatchevent)
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

### addOneTimeEventListener

▸ **addOneTimeEventListener**<`S`\>(`type`, `listener`): `void`

Add one time event listener for a given event type (removeEventListener is called after first dispatch).

#### Type parameters

| Name |
| :------ |
| `S` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `S` | The type of the event as a string. |
| `listener` | [`EventListenerPrototype`](../README.md#eventlistenerprototype) | An event listener function. |

#### Returns

`void`

___

### addEventListener

▸ **addEventListener**<`S`\>(`type`, `listener`): `void`

Add an event listener for a given event type.

#### Type parameters

| Name |
| :------ |
| `S` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `S` | The type of the event as a string. |
| `listener` | [`EventListenerPrototype`](../README.md#eventlistenerprototype) | An event listener function |

#### Returns

`void`

___

### removeEventListener

▸ **removeEventListener**<`S`\>(`type`, `listener`): `void`

Remove an event listener for a given event type.

#### Type parameters

| Name |
| :------ |
| `S` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `S` | The type of the event as a string. |
| `listener` | [`EventListenerPrototype`](../README.md#eventlistenerprototype) | The currently bound event listener function. |

#### Returns

`void`

___

### \_dispatchEvent

▸ `Protected` **_dispatchEvent**<`S`\>(`type`, `object?`): `void`

Dispatch an event from this object.

#### Type parameters

| Name |
| :------ |
| `S` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `S` | The type of the event as a string. |
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
