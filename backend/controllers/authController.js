import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const normalizeEmail = (email) =>
  String(email).trim().toLowerCase();

// REGISTER
export const registerUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const normalizedEmail =
      normalizeEmail(email);

    const existingUser =
      await User.findOne({
        email:
          normalizedEmail,
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email:
          normalizedEmail,
        password:
          hashedPassword,

        role:
          role || "user",
      });

    const token =
      generateToken(
        user._id
      );

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// LOGIN
export const loginUser = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const normalizedEmail =
      normalizeEmail(email);

    const user =
      await User.findOne({
        email:
          normalizedEmail,
      });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    const token =
      generateToken(
        user._id
      );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// PROFILE
export const getProfile =
  async (
    req,
    res
  ) => {
    try {
      const user =
        await User.findById(
          req.user._id
        ).select(
          "-password"
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export {
  registerUser as register,
  loginUser as login,
  getProfile as profile,
};
