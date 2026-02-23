const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const supabase = require('../lib/supabase');

function toNumber(value, fallback = null) {
  if (value === undefined || value === null || value === '') return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatOrderRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    orderId: row.order_id,
    user: row.user_email,
    fullName: row.full_name,
    phone: row.phone,
    address: row.address,
    addressLabel: row.address_label,
    item: row.item,
    items: row.items,
    restaurant: row.restaurant,
    paymentMethod: row.payment_method,
    subtotal: toNumber(row.subtotal, 0),
    total: toNumber(row.total, 0),
    deliveryFee: toNumber(row.delivery_fee, 0),
    platformFee: toNumber(row.platform_fee, 0),
    discount: toNumber(row.discount, 0),
    couponCode: row.coupon_code,
    deliveryNote: row.delivery_note,
    taxesAndCharges: toNumber(row.taxes_and_charges, 0),
    status: row.status,
    createdAt: row.created_at,
  };
}

router.post('/place-order', authMiddleware, async (req, res) => {
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
    
    const orderId = "ORD" + Date.now() + Math.floor(Math.random() * 1000);
    const orderPayload = {
      order_id: orderId,
      user_email: req.user.email,
      full_name: fullName,
      phone,
      address,
      address_label: String(addressLabel || 'Address'),
      item: normalizedItems[0],
      items: normalizedItems,
      restaurant,
      payment_method: paymentMethod,
      subtotal: Number(subtotal || 0),
      total,
      delivery_fee: toNumber(deliveryFee, 0),
      platform_fee: toNumber(platformFee, 0),
      discount: toNumber(discount, 0),
      coupon_code: couponCode || null,
      delivery_note: String(deliveryNote || ''),
      taxes_and_charges: toNumber(taxesAndCharges, 0),
      status: 'confirmed',
    };

    const { data, error } = await supabase
      .from('orders')
      .insert(orderPayload)
      .select()
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: 'Failed to place order' });
    }

    const order = formatOrderRow(data) || { orderId };

    const firstItemName = normalizedItems[0]?.name || 'items';
    console.log(`✓ New Order: ${firstItemName} from ${restaurant.name} - ₹${total}`);
    
    res.status(200).json({ 
      success: true, 
      orderId: order.orderId || orderId,
      message: 'Order placed successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_email', req.user.email)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to load orders' });
    }

    const userOrders = Array.isArray(data) ? data.map(formatOrderRow).filter(Boolean) : [];
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load orders' });
  }
});

module.exports = router;
