var express = require('./express')
var router = require('./router')()
var client = require('./express_test_client')()

var app = express()


app.set("port", 4000)

router.get('/sub',
    getRequest)
    router.post('/sub',
        getRequest)

function getRequest(req, res) {
    console.log('GET request received')
    res.writeHead(200, {'Content-Type': 'application/json'})
    var response = { "response" : "This is GET method." }
    console.log(response)
    res.end(response)  }

app.use("/sub", router)

app.listen(app.get("port"), function(){ 
    console.log("Running on 4000")
}, client.generateRequest())