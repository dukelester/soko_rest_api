const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productTitle: String,
    price: Number,
    description: String,
    sellerName: String,
    manufacturer: String,
    isValidated: Boolean,
});


module.exports = mongoose.model('Product', productSchema)

