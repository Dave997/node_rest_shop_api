const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

// handle incoming get requests
//* here i don't need to include "products" in the path because is asserted from the include in app.js that this page is accessible only from './api/routes/products'
router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc.id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            }

            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err)

            res.status(500).json({error: err});
        });
}); 
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log("Data received from db: "+doc);

            if(doc){
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000'
                    }
                });
            }else{
                res.status(404).json({
                    message: "no valid entry for provided ID"
                });
            }
            
        })
        .catch(err => {
            console.log(err)

            res.status(500).json({error: err});
        });
});

router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    // store the product in the data base 
    product
        .save()
        .then(result => {
            console.log(result);

            // 201 means "ok, everything was created"
            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result.id,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            });
         })
        .catch(err => {
            console.log(err);

            res.status(500).json({error: err});
        });
}); 

router.patch('/:productId', (req, res, next) => {

    const id = req.params.productId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    //name: req.body.newName,
    //price: req.body.newPrice

    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'PATCH',
                    url: 'http://localhost:3000/product/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.remove({_id: id }).exec()
        .then(result => {
            res.status(200).json({
                type: 'POST',
                url: 'http://localhost:3000/products/'+id,
                body: { 
                    name: 'String', 
                    price: 'Number'
                }
            })
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                error: err
            });
        });

    
    
    res.status(200).json({
        message: 'Deleted product!',
        id: id
    });
});


module.exports = router;