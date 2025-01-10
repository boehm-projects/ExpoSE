
var service = require('./express_service')
var express = require('../express_model/express')
var router = require('../express_model/router')()



router.get('/', service.getRequest )

router.get('/:id', service.getById )

router.post('/', service.postRequest  )

router.put('/', service.putRequest )

router.delete('/', service.deleteRequest )

module.exports = router;