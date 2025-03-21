'use strict'


// Changes made to original server: https://github.com/petkivim/nodejs-rest-api-example/tree/master
// Moved routing in own file. Moved functions into service file.
// changed imports to use mock express and router
// created a client to inject "http" data into the app.listen function
//
// In theory, every express server should be testable with these changes
// Every express function has to be modeled in /express_model/express and router.
var express = require('../express_model/express')
const route = require('./express_route').default


var client = require('./express_test_client')()
var app = express.createApplication()

app.use((req, res) => {
  console.log(req.url)
})
//testing the use() function for modifying the request
app.use("2 callbacks", (req, res) => {
  console.log("1 Callback")
}, (req, res) => {
  console.log("2 Callback")
})

app.use("> 2 Callbacks", (req, res) => {
  console.log("1 Callback")
}, (req, res) => {
  console.log("2 Callback")
}, (req, res) => {
  console.log("3 Callback")
})



app.use('/', route)

app.get('/', function(req, res, next){
  res.writeHead(100, { 'Content-Type': 'application/json' })
  var response = { "response": "Server is up and running" }
  res.end(response)
})

app.use("modify res", (req, res, next) => {
  if (res !== undefined) {
  }
  next()
})

app.set("port", 4000)


const res = app.listen(app.get("port"), function () {
  const host = server.address().address
  const port = server.address().port
  console.log("Node.js API app running at http://%s:%s", host, port)
}, client.generateRequest())





client.doSomethingWithTheResponse(res)