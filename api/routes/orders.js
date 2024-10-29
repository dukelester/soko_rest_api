const express = require('express');
const mongoose = require('mongoose');

const Order = require('../models/orders');
const Product = require('../models/products');


const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling the get orders'
    });
});

const getProductPrice = async (productId) => {
    const doc = await Product.findById(productId);
    console.log(doc, 'hhh')
    return doc.price
}

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.product,
    });
    order.save().then((result) => {
        console.log(result);
        res.status(201).json({
            message: "Order has been initiated",
            order: order
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: 'Error occurred',
            error: error.message
        });
    });
});


router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    console.log(id)
    if (id === 'special') {
        res.status(200).json({
            message: 'You entered the special ID'
        });
    } else {
        res.status(200).json({
            message: "Getting the details for order"
        });
    }
});


router.patch('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    console.log(id)
    if (id ) {
        res.status(200).json({
            message: 'Updating the order'
        });
    } else {
        res.status(404).json({
            message: "order not found"
        });
    }
});


router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    console.log(id)
    if (id ) {
        res.status(200).json({
            message: 'deleting the order'
        });
    } else {
        res.status(404).json({
            message: "order not found"
        });
    }
});


module.exports = router;