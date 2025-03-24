
var controller = require('./express_controller').createController()
var express = require('../express_model/express')

var router = express.createRouter()

router.get('/user/:id', controller.getById )

router.get('/user', controller.getRequest)

router.post('/createUser', controller.createUser)

router.put('/put', controller.putRequest)

router.patch('/patch/:id', controller.patchRequest)

router.delete('/delete', controller.deleteRequest)

export default router;