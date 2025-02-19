var express = require('../express_model/express')
var router = express.createRouter()
var client = require('./express_test_client')()

var app = express.createApplication()


app.set("port", 4000)

app.use(function(req,res){
    console.log(req)
})

function getRequest(req, res) {
    if(req.params.id ){    
        console.log('ID request received, ' + req.params.id)
    } 
    else{
        console.log('GET request received')
    }
   
    res.writeHead(200, { 'Content-Type': 'application/json' })
    var response = { "response": "This is GET method." }
    console.log(response)
    res.end(response)
} 
function postRequest(req, res) {
    console.log('POST request received')
    res.writeHead(200, { 'Content-Type': 'application/json' })
    var response = { "response": "This is POST method." }
    console.log(response)
    res.end(response)
} 



router.get('/sub/:id',
    getRequest)
router.post('/sub',
    postRequest)



app.use("/", router)

app.listen(app.get("port"), function () {
    console.log("Running on 4000")
}, client.generateRequest())