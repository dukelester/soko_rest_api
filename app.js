const express = require('express');
const morgan = require('morgan');

const app = express();

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: "Server ready to run"
//     });
// });

app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: ' Welcome to our shop REST api. We provide all e-commerce functionalities '
    });
});


app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);


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