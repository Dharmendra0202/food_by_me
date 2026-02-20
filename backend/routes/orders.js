const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const orders = []; // Temporary storage (in production, use a database)

router.post('/place-order', authMiddleware, (req, res) => {
  try {
    const {
      item,
      items,
      restaurant,
      address,
      phone,
      fullName,
      paymentMethod,
      total,
      deliveryFee,
      taxesAndCharges,
      discount,
      couponCode,
      deliveryNote,
      platformFee,
      subtotal,
      addressLabel,
    } = req.body;

    const normalizedItems = Array.isArray(items) && items.length > 0
      ? items
      : item
      ? [item]
      : [];

    if (!normalizedItems.length || !restaurant?.name || !address || !phone || !fullName || !paymentMethod) {
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
      addressLabel: String(addressLabel || 'Address'),
      item: normalizedItems[0],
      items: normalizedItems,
      restaurant,
      paymentMethod,
      subtotal: Number(subtotal || 0),
      total,
      deliveryFee,
      platformFee: Number(platformFee || 0),
      discount: Number(discount || 0),
      couponCode: couponCode || null,
      deliveryNote: String(deliveryNote || ''),
      taxesAndCharges,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    orders.push(order);
    const firstItemName = normalizedItems[0]?.name || 'items';
    console.log(`✓ New Order: ${firstItemName} from ${restaurant.name} - ₹${total}`);
    
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
