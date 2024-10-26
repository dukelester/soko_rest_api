const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling the get products'
    });
});


router.post('/', (req, res, next) => {
    const product = {
        productName : req.body.productName,
        price : req.body.price,
    };

    res.status(200).json({
        message: 'Handling the post products',
        product: product
    });
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