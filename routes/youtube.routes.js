const express = require('express');
const auth = require('../middleware/auth.js');
const { getVideos } = require('../controllers/youtube.controller.js');


const router = express.Router();

router.get('/videos',auth ,getVideos );


module.exports = router;
