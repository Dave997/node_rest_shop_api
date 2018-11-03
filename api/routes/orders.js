const express = require('express');
const router = express.Router();

// as the product file, also here we are sure that the beginning of the url is already including orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Oders were fetched"
    });
});
router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        id: req.params.orderId
    });        
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }

    res.status(201).json({
        message: "Order was created",
        order: order
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted!',
        id: req.params.orderId
    });        
});

module.exports = router;