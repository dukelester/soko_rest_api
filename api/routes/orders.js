const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling the get orders'
    });
});


router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling the post orders'
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