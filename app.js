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













module.exports = app;