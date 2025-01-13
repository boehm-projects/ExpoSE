'use strict'


// Changes made to original server: https://github.com/petkivim/nodejs-rest-api-example/tree/master
// Moved routing in own file. Moved functions into service file.
// changed imports to use mock express and router
// created a client to inject "http" data into the app.listen function
//
// In theory, every express server should be testable with these changes
// Every function has to be modeled in /express_model/express and router.
var express = require('../express_model/express')
const route = require('./express_route').default


var client = require('./express_test_client')()
var app = express.createApplication()

app.use((req, res) => {
  console.log("im using this with " + req.url)
})
// testing the use() function for modifying the request
app.use("print les bull", (req, res) => {
  console.log("THIS IS ANOTHER BULL")
}, (req, res) => {
  console.log("THIS IS ANOTHER ANOTHER BULL")
})

app.use("stampede", (req, res) => {
  console.log("THIS IS LA STAMPEDE")
}, (req, res) => {
  console.log("THIS IS ANOTHER STAMPEDE")
}, (req, res) => {
  console.log("THIS IS ANOTHER ANOTHER STAMPEDE")
})

app.use('/', route)

app.use("modify res", (req, res) => {
  if (res !== undefined) {
    console.log(res)
    console.log("this is after the response is generated. last minute changes can be done here ")
  }
  else {
    throw "there is something wrong with this country"
  }

})

app.set("port", 4000)


const res = app.listen(app.get("port"), function () {
  const host = server.address().address
  const port = server.address().port
  console.log("Node.js API app running at http://%s:%s", host, port)
}, client.generateRequest())



client.doSomethingWithTheResponse(res);


