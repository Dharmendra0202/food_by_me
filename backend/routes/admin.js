const express = require("express");
const router = express.Router();
const { supabase } = require("../lib/supabase");

// Get all orders (admin only)
router.get("/orders", async (req, res) => {
  try {
    // In production, verify admin token here
    const adminToken = req.headers.authorization?.replace("Bearer ", "");
    
    if (!adminToken) {
      return res.status(401).json({ error: "Admin authentication required" });
    }

    // Fetch all orders with user details
    const { data: orders, error } = await supabase
      .from("orders")
      .select(`
        *,
        user:users(id, fullName, email)
      `)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ error: "Failed to fetch orders" });
    }

    res.json(orders || []);
  } catch (error) {
    console.error("Admin orders error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get dashboard statistics
router.get("/stats", async (req, res) => {
  try {
    const adminToken = req.headers.authorization?.replace("Bearer ", "");
    
    if (!adminToken) {
      return res.status(401).json({ error: "Admin authentication required" });
    }

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
