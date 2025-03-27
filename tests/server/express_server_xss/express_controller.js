var s = require("./express_service").createService()



module.exports.createController = createController;


function createController() {
    const controller = new ExpressController()
    return controller
}

class ExpressController {
    constructor() {
    }
}

ExpressController.prototype.createXSS = function (req, res) {
    if(req.data.name && req.data.email && req.data.phone){
        let newUser = s.createUser(req.data)
        console.log(newUser)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        var response = newUser
        res.end(response)
    }
    else{
        res.writeHead(400, { 'Content-Type': 'application/json' })
        var response = {"message": "nonono"}
        res.end(response)
    }
}

ExpressController.prototype.getById = function (req, res) {

    console.log(req.params.id)
    if (req.params.id == undefined) {
        res.writeHead(401, { 'content-type': 'application/json' })
        var response = { "message": "No valid id" }
        throw "Params Id undefined"
    }
    else {
        let user = s.getUser(req.params.id)
        if (user == null) {
            res.writeHead(401, { 'content-type': 'application/json' })
            var response = { "response": "No user found" }
        }
        else {
            res.writeHead(200, { 'content-type': 'application/json' })
            var response = { "message": "Get method with id =" + req.params.id + " .", "data": user }
            
        }
    }
    res.end(response)
}