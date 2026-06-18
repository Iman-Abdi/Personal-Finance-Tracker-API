import User from "../models/User.js";

import Transaction from "../models/Transaction.js";

export const overview =
  async (req, res) => {
    try {
      const totalUsers =
        await User.countDocuments();

      const totalTransactions =
        await Transaction.countDocuments();

      const topCategories =
        await Transaction.aggregate([
          {
            $group: {
              _id:
                "$category",

              total: {
                $sum:
                  "$amount",
              },
            },
          },

          {
            $sort: {
              total: -1,
            },
          },

          {
            $limit: 5,
          },
        ]);

      res.json({
        totalUsers,
        totalTransactions,
        topCategories,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const getUsers =
  async (req, res) => {
    try {
      const users =
        await User.find()
          .select(
            "-password"
          );

      res.json(users);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
  
  