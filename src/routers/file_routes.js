const express = require('express'); 
const fileController = require('../controller/file_controller.js'); 
const validateApiKey = require('../middlewares/apikey_middleware.js'); 
const router = express.Router(); 

router.post('/upload', validateApiKey, fileController.uploadImage); 
router.get('/image/:id/:imageId', fileController.getImage); 
router.get('/images/:id', fileController.getAllImages); 

module.exports = router;