const express = require("express");
const router = express.Router();
const supabase = require("../lib/supabase");
const jwt = require("jsonwebtoken");

// Admin login endpoint
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME || "majnu";
    const adminPassword = process.env.ADMIN_PASSWORD || "majnu@2909";

    if (username === adminUsername && password === adminPassword) {
      // Generate JWT token for admin
      const token = jwt.sign(
        { username, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        success: true,
        token,
        message: "Admin login successful",
      });
    } else {
      res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Get all orders (admin only)
router.get("/orders", verifyAdminToken, async (req, res) => {
  try {
    console.log("Admin fetching orders");

    // Fetch all orders
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ error: "Failed to fetch orders" });
    }

    console.log(`Found ${orders?.length || 0} orders`);

    // Format orders to match expected structure
    const formattedOrders = (orders || []).map(order => ({
      id: order.id,
      orderId: order.order_id,
      status: order.status,
      total: order.total,
      createdAt: order.created_at,
      items: order.items || [order.item],
      item: order.item,
      restaurant: order.restaurant,
      user: {
        fullName: order.full_name,
        email: order.user_email,
      },
      deliveryAddress: {
        address: order.address,
        phone: order.phone,
      },
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error("Admin orders error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get dashboard statistics
router.get("/stats", verifyAdminToken, async (req, res) => {
  try {
    console.log("Admin fetching stats");

    // Get order counts by status
    const { data: orders, error } = await supabase
      .from("orders")
      .select("status, total");

    if (error) {
      console.error("Error fetching stats:", error);
      return res.status(500).json({ error: "Failed to fetch statistics" });
    }

    const stats = {
      total: orders.length,
      confirmed: orders.filter((o) => o.status === "confirmed").length,
      preparing: orders.filter((o) => o.status === "preparing").length,
      onTheWay: orders.filter((o) => o.status === "on_the_way").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
      revenue: orders
        .filter((o) => o.status === "delivered")
        .reduce((sum, o) => sum + (Number(o.total) || 0), 0),
    };

    res.json(stats);
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
