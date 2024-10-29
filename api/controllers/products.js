const { default: mongoose } = require("mongoose");
const products = require("../models/products");

exports.getallProducts = (req, res, next) => {
    products.find().then((products) => {
        const response =  {
            count: products.length,
            products: products
        };
        res.status(200).json(response);
    }).catch((error) => (
        res.json({error: error.message})
    ));
}

exports.createProduct = (req, res, next) => {
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

}

exports.getProductDetails = (req, res, next) => {
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
}

exports.updateProduct = (req, res, next) => {
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
}

exports.deleteProduct = (req, res, next) => {
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

}