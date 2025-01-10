'use strict'

var express = require('../express_model/express')
const route = require('./express_route')
var client = require('../express_model/express_test_client')()
var app = express()

app.use('/', route)

app.set("port", 4000)

const server = app.listen(app.get("port"), function () {
  const host = server.address().address
  const port = server.address().port

  console.log("Node.js API app running at http://%s:%s", host, port)
}, client.generateRequest())

