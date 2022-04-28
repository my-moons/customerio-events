'use strict'

const errorBodyResponse = (type, status, code, detail, message) => {
  const body = JSON.stringify({
    type,
    status,
    code,
    detail,
    message
  })

  console.log(body)

  return {
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': false,
      'Access-Control-Allow-Methods': '*'
    },
    statusCode: status,
    body
  }
}

const buildErrorResponse = (err) => {
  console.log(err)
  if (err.statusCode) {
    return err
  }
  return errorResponse(500, err.message, {})

}

const errorResponse = (statusCode, message, errorObject) => {
  return errorBodyResponse(
    errorObject.TYPE,
    statusCode,
    errorObject.CODE,
    errorObject.DETAIL,
    message
  )
}

module.exports = {
  errorResponse,
  buildErrorResponse
}