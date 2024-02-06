[@amandaghassaei/event-dispatcher](../README.md) / EventDispatcher

# Class: EventDispatcher<T\>

Parent class for typed EventDispatcher subclasses.
See https://github.com/amandaghassaei/event-dispatcher#use
for an example of how to subclass EventDispatcherPrototype.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `string` | The type of events this object should dispatch. |

## Table of contents

### Constructors

- [constructor](EventDispatcher.md#constructor)

### Methods

- [addOneTimeEventListener](EventDispatcher.md#addonetimeeventlistener)
- [addEventListener](EventDispatcher.md#addeventlistener)
- [removeEventListener](EventDispatcher.md#removeeventlistener)
- [\_dispatchEvent](EventDispatcher.md#_dispatchevent)
- [getNumberOfListenersForEvent](EventDispatcher.md#getnumberoflistenersforevent)
- [dispose](EventDispatcher.md#dispose)

## Constructors

### constructor

• **new EventDispatcher**<`T`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

## Methods

### addOneTimeEventListener

▸ **addOneTimeEventListener**<`S`\>(`type`, `listener`): `void`

Add one time event listener for a given event type (removeEventListener is called after first dispatch).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `S` | The type of the event as a string. |
| `listener` | [`Listener`](../README.md#listener) | An event listener function. |

#### Returns

`void`

___

### addEventListener

▸ **addEventListener**<`S`\>(`type`, `listener`): `void`

Add an event listener for a given event type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `S` | The type of the event as a string. |
| `listener` | [`Listener`](../README.md#listener) | An event listener function |

#### Returns

`void`

___

### removeEventListener

▸ **removeEventListener**<`S`\>(`type`, `listener`): `void`

Remove an event listener for a given event type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `S` | The type of the event as a string. |
| `listener` | [`Listener`](../README.md#listener) | The currently bound event listener function. |

#### Returns

`void`

___

### \_dispatchEvent

▸ `Protected` **_dispatchEvent**<`S`\>(`type`, `object?`): `void`

Dispatch an event from this object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` |

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
