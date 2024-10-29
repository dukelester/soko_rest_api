const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userType: { type: String, default: 'seller' },
});


module.exports = mongoose.model("User", UserSchema);