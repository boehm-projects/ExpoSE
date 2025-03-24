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

ExpressController.prototype.getRequest = function (req, res) {
    let users = s.getUsers()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    var response = { "message": users }
    res.end(response)
}
ExpressController.prototype.getById = function (req, res) {

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

ExpressController.prototype.putRequest = function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    var response = { "message": "This is PUT method." }
    res.end(response)
}

ExpressController.prototype.createUser = function (req, res) {
    let newUser = s.createUser(req.data)
    console.log(newUser)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    var response = newUser
    res.end(response)
}

// This was too much for expoSE
// ExpressController.prototype.createUserSanitized = function (req, res) {
//     let newUser = s.createUserSanitized(req.data)
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     var response = newUser
//     res.end(response)
// }

ExpressController.prototype.deleteRequest = function (req, res) {
    let userId = s.findUserByField(req.data).index
    if (s.deleteUser(userId)){
        res.writeHead(200, { 'Content-Type': 'application/json' })
        var response = { "message": "This is DELETE method." }
        res.end(response)
    }
    console.log('delete')
}

ExpressController.prototype.patchRequest = function (req, res) {
    let updatedUser =  s.patchUser(req.params.id, req.data)
    console.log(updatedUser)
    if (updatedUser !== null){
        res.writeHead(200, { 'Content-Type': 'application/json' })
        var response = { "message":  updatedUser }
        res.end(response)
    }
    else {
        res.writeHead(400, { 'content-type': 'application/json' })
        var response = { "response": "user updated" }
        res.end(response)
    }
}