const HttpMethods = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS',
  'HEAD',
]

// Object.freeze() did not work with DSE
export default HttpMethods;