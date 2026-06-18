import express from "express";

import protect from "../middlewares/auth.js";

import authorize from "../middlewares/authorize.js";

import {
  getCategories,
  createCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Transactions]
 *     summary: Get available categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get(
  "/",
  protect,
  getCategories
);

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Transactions]
 *     summary: Add a new category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 */
router.post(
  "/",
  protect,
  authorize("admin"),
  createCategory
);

export default router;