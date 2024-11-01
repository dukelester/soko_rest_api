const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

const mongoURI = process.env.MONGODBURL;
console.log(mongoURI, 'url');

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to mongodb successfully!');
}).catch(() => {
    console.log('Sorry! An error occurred! Unable to connect to the Database')
});


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/uploads/products', express.static('uploads/products'));



// Add The headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control_Allow-Headers", "*");
    if (req.method === 'OPTIONS') {
        res.header('Access0-Control-Allow-Methods', "POST", "PUT",
            "GET", "DELETE", "PATCH"
        );
        return res.status(200).json({});
    }
    next();
});


app.get('/', (req, res, next) => {
    res.status(200).json({
        message: ' Welcome to our shop REST api. We provide all e-commerce functionalities '
    });
});


app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});










module.exports = app;