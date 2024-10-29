const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    quantity: { type: Number, required: true, default: 1 },
    totalPrice: { type: Number, required: false },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required:true}
});


module.exports = mongoose.model("Order", orderSchema);
