const express = require('express');

const adminController = require('../controllers/admin.controllers');
const imageUploadMiddleware = require('../middleware/image-upload');

const router = express.Router();


router.get('/products',adminController.getProducts); // 

router.get('/products/new',adminController.getNewProduct); // 새 제품 추가

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

router.get('/products/:id',adminController.getUpdateProduct);

router.post('/products/:id',imageUploadMiddleware,adminController.updateProduct); // 이미지 미들웨어를 추가하지 않으면, 모든 자료가 null로..

router.delete('/products/:id',adminController.deleteProduct);

module.exports = router;  