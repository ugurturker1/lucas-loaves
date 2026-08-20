import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  priceAtPurchase: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Processing' },
  items: [orderItemSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);