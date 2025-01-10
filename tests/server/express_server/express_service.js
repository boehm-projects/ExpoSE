function getRequest(req, res) {
    console.log('GET request received')
    res.writeHead(200, { 'Content-Type': 'application/json' })
    var response = { "response": "This is GET method." }
    console.log(response)
    res.end(response)
}

function getById(req, res) {
    if (req.params.id === undefined || typeof req.params.id !== "number") {
        res.writeHead(400, { 'content-type': 'application/json' })
        var response = { "response": "No valid id" }
    }
    else {
        console.log('get /:id request received')
        res.writeHead(200, { 'content-type': 'application/json' })
        var response = { "response": "Get method with id = " + req.params.id + "." }

    }
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

function putRequest(req, res) {
    console.log('PUT request received')
    res.writeHead(200, { 'Content-Type': 'application/json' })
    var response = { "response": "This is PUT method." }
    console.log(response)
    res.end(response)
}

function deleteRequest(req, res) {
    console.log('DELETE request received')
    res.writeHead(200, { 'Content-Type': 'application/json' })
    var response = { "response": "This is DELETE method." }
    console.log(response)
    res.end(response)
}

module.exports = {
    deleteRequest,
    putRequest,
    postRequest,
    getById,
    getRequest

}