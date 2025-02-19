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

    res.writeHead(200, { 'Content-Type': 'application/json' })
    var response = { "message": "This is GET method." }
    res.end(response)
}
ExpressController.prototype.getById = function (req, res) {

    if (req.params.id == undefined) {
        res.writeHead(401, { 'content-type': 'application/json' })
        var response = { "message": "No valid id" }
        throw "Params Id undefined"
    }
    else {
        let user = s.getUser(parseInt(req.params.id))
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
    console.log(res)
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
ExpressController.prototype.createUserSanitized = function (req, res) {
    let newUser = s.createUserSanitized(req.data)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    var response = newUser
    res.end(response)
}

ExpressController.prototype.deleteRequest = function (req, res) {
    // let userId = s.findUserByField(req.data).index
    // if (s.deleteUser(userId)){
    //     res.writeHead(200, { 'Content-Type': 'application/json' })
    //     var response = { "message": "This is DELETE method." }
    //     res.end(response)
    // }
    console.log('delete')
}


// UUID is too complex for the time being
// ExpressController.prototype.getByUUID = function (req, res) {
//     const uuidRegex = /^[a-fA-F0-9]{8}$/
//     if (req.params.uuid === undefined || !uuidRegex.test(req.params.uuid)) {
//         res.writeHead(400, { 'content-type': 'application/json' })
//         var response = { "response": "No valid uuid" }
//     }
//     else {
//         var uuid = req.params.uuid.toString()
//         res.writeHead(200, { 'content-type': 'application/json' })
//         var response = { "message": `${uuid}`}
//     }
//     res.end(response)
// }