
var service = require('./express_controller')
var express = require('../express_model/express')

var router = express.createRouter()


router.get('/get', service.getRequest )

router.get('/:id', service.getById )

router.post('/post', service.postRequest  )

router.put('/put', service.putRequest )

router.delete('/delete', service.deleteRequest )

export default router;