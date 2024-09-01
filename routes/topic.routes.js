const express = require('express');
const auth = require('../middleware/auth');
const { selectTopic } = require('../controllers/topics.controller');

const router = express.Router();

router.post('/select',auth ,selectTopic );


module.exports = router;
