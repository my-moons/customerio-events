const { errorResponse } = require("./responses");
const { ERRORCODES } = require('./enums.js');
const axios = require('axios');


const customerioUrl = process.env.CUSTOMER_IO_URL || 'https://production.moons.ninja/customerio/customer/event'
const customerioEventToken = process.env.CUSTOMER_IO_EVENT_TOKEN || 'null'

console.log(customerioUrl, customerioEventToken)

const sendEvent = async ({eventName, eventProperties}) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${customerioEventToken}`
    }

    validateRequest(eventName, eventProperties)
  
    const request = {
      id: eventProperties.distinct_id,
      event: eventName,
      dataEvent: {
        ...eventProperties
      }
    }

    delete request.dataEvent.distinct_id
  
    const response = await axios.post(customerioUrl, request, { headers: headers })

    const resFinal = (response && response.data) ? response.data : response
    return resFinal

  } catch (error) {
      console.log(error)
    error = error.response && error.response.data ? error.response.data : error;
    throw (error);
  }
}

const validateRequest = (eventName, eventProperties) => {

  if (!eventName) {
    throw errorResponse(
      404,
      'Please provide event name to tracking',
      ERRORCODES.event_name_not_found
    )
  }

  if (Object.prototype.toString.call(eventProperties) !== '[object Object]') {
    throw errorResponse(
      404,
      'Event properties has to be an object',
      ERRORCODES.data_incorrect
    )
  }

  if (Object.keys(eventProperties).length === 0) {
    throw errorResponse(
      404,
      'Please provide event properties to tracking',
      ERRORCODES.event_properties_not_found
    )
  }

  if (!eventProperties.distinct_id) {
    throw errorResponse(
      404,
      'Please provide distinct_id in event properties to tracking',
      ERRORCODES.distinct_id_not_found
    )
  }
}

module.exports = {
  sendEvent
}