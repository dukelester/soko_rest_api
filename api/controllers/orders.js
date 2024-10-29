const  mongoose  = require("mongoose");
const orders = require("../models/orders");
const Product = require('../models/products');

exports.getAllOrders = (req, res, next) => {
    orders.find().populate('product').then((results) => {
        res.status(200).json({
            count: results.length,
            orders: results
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error);
    })
}


exports.createOrder = (req, res, next) => {
    Product.findById(req.body.product).then((product) => {
        new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.product,
        }).save().then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Order has been initiated",
                order: result
            });
        
        }).catch((error) => {
            res.status(404).json({
                message: `Product with id: ${req.body.product} not found`,
                error: error
            });
        });
    }).catch((error) => {
        res.status(404).json({
            message: `An error occurred. Check your product Id ${req.body.product}`,
            error: error
        });
    });
}

exports.getOrderById = (req, res, next) => {
    const id = req.params.orderId;
    console.log(id)
    Order.findById({_id: id}).populate("product").then((order) => {
        res.status(200).json(order);
    }).catch((error) => {
        res.status(500).json(error);
    });
}

exports.updateOrder = (req, res, next) => {
    const id = req.params.orderId;
    const order = req.body;
    if (id && order) {
        Order.findByIdAndUpdate({_id: id }, order, { new: true } ).then((updatedOrder) => {
            res.status(200).json({
                updated: true,
                order: updatedOrder
            });
        }).catch((error) => {
            console.log("Error Occurred");
            res.status(500).json(error);
        });
    } else {
        res.status(400).json({
            error: "The Data is not correct"
        });
    }
    
}

exports.deleteOrder = (req, res, next) => {
    const id = req.params.orderId;
    Order.deleteOne({_id:id}).then(() => {
        res.status(200).json({
            message: `Deleted the order ${id} successfully`
        });
    }).catch((error) => {
        res.status(500).json(error);
    });
}