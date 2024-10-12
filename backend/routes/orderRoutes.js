import express from "express";
const router = express.Router();

import {
    createOrder,
    getAllOrders,
    getUserOrders,
    countTotalOrders,
    calculateTotalSales,
    calcualteTotalSalesByDate,
    findOrderById,
    markOrderAsPaid, // If you are not using payment options, you might remove this function
    markOrderAsDelivered,
} from "../controllers/orderController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// Route for creating an order and getting all orders (admin)
router
    .route("/")
    .post(authenticate, createOrder) // This endpoint is fine for creating orders
    .get(authenticate, authorizeAdmin, getAllOrders); // Admin can get all orders

// Route for getting the current user's orders
router.route("/mine").get(authenticate, getUserOrders);

// Routes for order statistics
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calcualteTotalSalesByDate);

// Route for getting a specific order by ID
router.route("/:id").get(authenticate, findOrderById);

// If you don't handle payment through this API anymore, consider removing this route
router.route("/:id/pay").put(authenticate, markOrderAsPaid); // Consider removing if not used

// Route for marking an order as delivered (admin only)
router
    .route("/:id/deliver")
    .put(authenticate, authorizeAdmin, markOrderAsDelivered);

export default router;
