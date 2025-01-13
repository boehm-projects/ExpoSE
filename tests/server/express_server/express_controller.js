function getRequest(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    var response = { "response": "This is GET method." }
    res.end(response)
}

function getById(req, res) {
    if (req.params.id === undefined || typeof req.params.id !== "number") {
        res.writeHead(400, { 'content-type': 'application/json' })
        var response = { "response": "No valid id" }
    }
    else {
        res.writeHead(200, { 'content-type': 'application/json' })
        var response = { "response": "Get method with id = " + req.params.id + "." }

    }
    res.end(response)
}


function test(req, res) {
    if (req.params.id === undefined || typeof parseInt(req.params.id) !== "number") {
        res.writeHead(400, { 'content-type': 'application/json' })
        var response = { "response": "No valid id" }
    }
    const uuidRegex = /^[a-fA-F0-9]{8}$/
    if (req.params.uuid === undefined || !uuidRegex.test(req.params.uuid)) {
        res.writeHead(400, { 'content-type': 'application/json' })
        var response = { "response": "No valid uuid" }
    }
    else {
        res.writeHead(200, { 'content-type': 'application/json' })
        var response = { "response": "POST method with id = " + req.params.id + " and UUID = " + req.params.uuid}
    }
    res.end(response)
}

function postRequest(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    var response = { "response": "This is POST method." }
    res.end(response)
}

function putRequest(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    var response = { "response": "This is PUT method." }
    res.end(response)
}

function deleteRequest(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    var response = { "response": "This is DELETE method." }
    res.end(response)
}


const requestFun = [deleteRequest, putRequest, postRequest, getById, getRequest];

module.exports = {
    deleteRequest,
    putRequest,
    postRequest,
    getById,
    getRequest,
    test,
    requestFun
}