
var controller = require('./express_controller').createController()
var express = require('../express_model/express')

var router = express.createRouter()

router.post('/post', controller.createXSS)
router.get('/getById/:id', controller.getById )


export default router;