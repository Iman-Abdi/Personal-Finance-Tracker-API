import express from "express";

import protect from "../middlewares/auth.js";

import upload from "../middlewares/upload.js";

import {
  uploadProfilePicture,
} from "../controllers/uploadController.js";

const router = express.Router();

/**
 * @swagger
 * /upload/profile-picture:
 *   post:
 *     tags: [Upload]
 *     summary: Upload a profile picture
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [image]
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 */
router.post(
  "/profile-picture",
  protect,
  upload.single("image"),
  uploadProfilePicture
);

export default router;