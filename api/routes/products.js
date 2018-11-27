const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Product = require('../models/product');

const ProductController = require('../controllers/products');

// handle incoming get requests
//* here i don't need to include "products" in the path because is asserted from the include in app.js that this page is accessible only from './api/routes/products'
//curl --header "Content-Type: application/json" --request GET http://localhost:3000/products | jq
router.get('/', ProductController.product_get_all); 

router.get('/:productId', ProductController.product_get_singleProduct);

router.post('/', checkAuth, ProductController.product_post_createProduct); 

router.patch('/:productId', checkAuth, ProductController.product_put_modifyProduct);

//curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5pdCIsInVzZXJJZCI6IjViZWJlM2E1M2IxOWRjNjI2ZDhkNWY0MiIsImlhdCI6MTU0MjE5MTMzNiwiZXhwIjoxNTQyMTk0OTM2fQ.NebrNR_OoUmDSHzT7sc0H4A8fiBjFAJwJ7gTB4R42BI5bebff232b0a7c0704f089d7" -X "DELETE" http://localhost:3000/products/5bebff232b0a7c0704f089d7 | jq
router.delete('/:productId', checkAuth, ProductController.product_delete_deleteProduct);


module.exports = router;