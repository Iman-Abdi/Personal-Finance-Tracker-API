import streamifier from "streamifier";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/User.js";

export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "finance-tracker",
        },
        (error, uploadResult) => {
          if (error) return reject(error);
          resolve(uploadResult);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        profilePicture: result.secure_url,
      },
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile picture uploaded",
      image: result.secure_url,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

  