import express from "express";

import protect from "../middlewares/auth.js";

import authorize from "../middlewares/authorize.js";

import {
  overview,
  getUsers,
} from "../controllers/adminController.js";

const router = express.Router();

/**
 * @swagger
 * /admin/overview:
 *   get:
 *     tags: [Admin]
 *     summary: Get admin dashboard overview
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overview statistics
 */
router.get(
  "/overview",
  protect,
  authorize("admin"),
  overview
);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     tags: [Admin]
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get(
  "/users",
  protect,
  authorize("admin"),
  getUsers
);

export default router;