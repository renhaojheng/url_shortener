const express = require('express')
const router = express.Router()
const index = require('./modules/index')

router.use('/', index)

module.exports = router
