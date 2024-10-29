const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');

const Product = require('../models/products');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/products')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const uploads = multer({ storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}, fileFilter: fileFilter});

const router = express.Router();

router.get('/', (req, res, next) => {
    Product.find().then((products) => {
        const response =  {
            count: products.length,
            products: products
        };
        res.status(200).json(response);
    }).catch((error) => (
        res.json({error: error.message})
    ));
});

router.post('/', uploads.single('productImage'), checkAuth, (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        productTitle: req.body.productTitle,
        price: req.body.price,
        description: req.body.description,
        sellerName: req.body.sellerName,
        manufacturer: req.body.manufacturer,
        isValidated: req.body.isValidated || false,
        productImage: req.file.path
    });
    
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


});


router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    console.log(id)
    Product.findById(id).then((document) => {
        console.log('From the database', document);
        if (document) {
            res.status(200).json(document);
        } else {
            res.status(404).json({message: 'No product with that ID found.'})
        }
        
    }).catch((error) => {
        console.log(error);
        res.status(500).json({error: error.message})
    });
});


router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const productBody = req.body;
    console.log(id, productBody)
    if (id && productBody) {
        Product.findByIdAndUpdate(id, productBody, { new:true }).then((result) => {
            res.status(200).json(result)
        }).catch((error) => {
            res.status(500).json({error: error.message});
        });
    } else {
        res.status(400).json({error: "Invalid Product Id"});
    }
});


router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    console.log(id)
    if (id) {
        Product.deleteOne({_id: id}).then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            res.status(500).json({error: error.message});
        });
    } else {
        res.status(400).json({message: 'Enter a valid ID'});
    }

});






module.exports = router;