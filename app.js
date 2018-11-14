const express = require('express'); // this will use express to handle request
const app = express();
const morgan = require('morgan'); //middleware for authentication
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const productOrders = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb://node_server:' 
    +  process.env.MONGO_ATLAS_PSW 
    +'@node-rest-shop-shard-00-00-vlzc2.mongodb.net:27017,node-rest-shop-shard-00-01-vlzc2.mongodb.net:27017,node-rest-shop-shard-00-02-vlzc2.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true',
    {
        useMongoClient: true
    }
);
mongoose.Promise = global.Promise;

// all the incoming requests pass through this method (middleware)
/* the next function will be execute to move the request to the next middleware
app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});*/

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); //this would parse urlencoded requets, without rich-extended options (false)
app.use(bodyParser.json()); // this will extract json data from requests

// headers to prevent CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    //sent by browser in post req, to check if it's possibile to perform it
    if(req.method === 'OPTIONS'){
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        
        return res.status(200).json({});
    }

    next();
});

// Routes which should handle requests 
app.use('/products', productRoutes);  //handle get requests on products, this method forwards directly to product.js get method
app.use('/orders', productOrders); 
app.use('/users', userRoutes);

// if the server reach that line, none of the routes above was able to process the request, so i should send an error message
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;

    //this will forward the error req insted of the original
    next(error); 
})

//* Error Handler
// this method will be called from "next(error)"
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;