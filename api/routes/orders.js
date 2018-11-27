const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require('../middleware/check-auth')

const Order = require("../models/order");
const Product = require("../models/product");

const OrdersController = require('../controllers/orders');

// as the product file, also here we are sure that the beginning of the url is already including orders
router.get('/', checkAuth, OrdersController.orders_get_all);

router.get('/:orderId', checkAuth, OrdersController.orders_get_singleOrder);

router.post('/', checkAuth, OrdersController.orders_post_createOrder);

router.delete('/:orderId', checkAuth, OrdersController.orders_post_deleteOrder);

module.exports = router;