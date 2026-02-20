const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const orders = []; // Temporary storage (in production, use a database)

router.post('/place-order', authMiddleware, (req, res) => {
  try {
    const { item, restaurant, address, phone, fullName, paymentMethod, total, deliveryFee, taxesAndCharges } = req.body;

    if (!item?.name || !restaurant?.name || !address || !phone || !fullName || !paymentMethod) {
      return res.status(400).json({ error: 'Missing required order details' });
    }

    if (typeof total !== 'number' || Number.isNaN(total) || total <= 0) {
      return res.status(400).json({ error: 'Invalid total amount' });
    }
    
    const order = {
      orderId: "ORD" + Date.now() + Math.floor(Math.random() * 1000),
      user: req.user.email,
      fullName,
      phone,
      address,
      item,
      restaurant,
      paymentMethod,
      total,
      deliveryFee,
      taxesAndCharges,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    orders.push(order);
    console.log(`✓ New Order: ${item.name} from ${restaurant.name} - ₹${total}`);
    
    res.status(200).json({ 
      success: true, 
      orderId: order.orderId,
      message: 'Order placed successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

router.get('/my-orders', authMiddleware, (req, res) => {
  const userOrders = orders.filter(order => order.user === req.user.email);
  res.json(userOrders);
});

module.exports = router;
