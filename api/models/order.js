const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    customerId: {type: String},
    paymentIntentId: {type: String},
    products: [
        {
            id: { type: String },
            name: { type: String },
            brand: { type: String },
            desc: { type: String },
            products: { type: String },
            images: { type: String },
            cartQuantity: { type: String },
          },
    ],
    subtotal: {type: Number, required: true},
    total: {type: Number, required: true},
    shipping: {type: Object, required: true},
    delivery_status: {type: String, default: "pending"},
    payment_status: {type: String}
}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema);