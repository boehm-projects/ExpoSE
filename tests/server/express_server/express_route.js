
var controller = require('./express_controller').createController()
var express = require('../express_model/express')

var router = express.createRouter()


router.get('/get', controller.getRequest)

router.get('/getWithId/:id', controller.getById )
 
router.post('/post', controller.createUser)
// 
//  router.put('/put', controller.putRequest)
 
// router.patch('/patch/:id', controller.patchRequest)
// // 
// router.delete('/delete', controller.deleteRequest)

export default router;