const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      productId: String,
      quantity: Number,
    },
  ],
  status: {
    type: String,
    default: 'pending',
  },
});

module.exports = mongoose.model('Cart', CartSchema);
