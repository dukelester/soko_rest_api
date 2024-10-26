const express = require('express');
const mongoose = require('mongoose');

const Product = require('../models/products');



const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling the get products'
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        productTitle: req.body.productTitle,
        price: req.body.price,
        description: req.body.description,
        sellerName: req.body.sellerName,
        manufacturer: req.body.manufacturer,
        isValidated: req.body.isValidated || false
    });
    if (product.productTitle & product.price & product.description) {
        product.save().then((result) => {
            console.log(result);
            res.status(201).json({
                message: "product Created successfully",
                product: product
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).json({
                error: error.message
            });
        });
    } else {
        res.status(400).json({
            message: "Check your body and try again",
        });
    }
    

});


router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    console.log(id)
    if (id === 'special') {
        res.status(200).json({
            message: 'You entered the special ID'
        });
    } else {
        res.status(200).json({
            message: "Getting the details for product"
        });
    }
});


router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    console.log(id)
    if (id ) {
        res.status(200).json({
            message: 'Updating the product'
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});


router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    console.log(id)
    if (id ) {
        res.status(200).json({
            message: 'deleting the product'
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});






module.exports = router;