# customerio-events
Integrating customer.io events in a library
### Installation
```
$ npm i customerio-events
```

or using `yarn`

```
$ yarn add customerio-events
```

### Configuration
You must have the `CUSTOMER_IO_URL` and the `CUSTOMER_IO_EVENT_TOKEN` environment variables to send successfully an event to the workspace.
If `CUSTOMER_IO_URL` is not given, the production URL is taken by default. Be careful with this default value.
If `CUSTOMER_IO_EVENT_TOKEN` (the auth token) is not provided, an error there will be thrown


### Usage

Basic usage

```js
const {sendEvent} = require('customerio-events')

// Event properties must describe the event data with custom fields
// distinct_id is mandatory for any event
const eventProperties = {
    distinct_id: 'your id'
}

sendEvent({
    eventName: 'your event name',
    eventProperties,
})

```