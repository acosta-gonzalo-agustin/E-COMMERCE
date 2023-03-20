const cloudy = require('../controllers/cloudy');
const express = require('express');
const router = express.Router();

router.get('/cloudy',cloudy.Create);

module.exports = router;