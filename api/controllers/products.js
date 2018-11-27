const Product = require("../models/product");
const mongoose = require("mongoose");

exports.product_get_all = (req, res, next) => {
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
};

exports.product_get_singleProduct = (req, res, next) => {
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
    };

exports.product_post_createProduct = (req, res, next) => {

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
};

exports.product_put_modifyProduct = (req, res, next) => {

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
};

exports.product_delete_deleteProduct = (req, res, next) => {
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
};