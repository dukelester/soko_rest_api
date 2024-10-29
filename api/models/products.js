const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productTitle: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    sellerName: String,
    manufacturer: String,
    isValidated: Boolean,
    productImage: { type: String, required: true }
});


module.exports = mongoose.model('Product', productSchema)

