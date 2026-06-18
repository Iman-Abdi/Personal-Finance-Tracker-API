import Transaction from "../models/Transaction.js";

export const createTransaction =
  async (req, res) => {
    try {
      const transaction =
        await Transaction.create({
          ...req.body,
          user: req.user._id,
        });

      res.status(201).json(
        transaction
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  export const getTransactions =
  async (req, res) => {
    try {
      const transactions =
        await Transaction.find({
          user: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.json(
        transactions
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  export const getTransaction =
  async (req, res) => {
    try {
      const transaction =
        await Transaction.findOne({
          _id: req.params.id,
          user: req.user._id,
        });

      if (
        !transaction
      ) {
        return res
          .status(404)
          .json({
            message:
              "Transaction not found",
          });
      }

      res.json(
        transaction
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  export const updateTransaction =
  async (req, res) => {
    try {
      const transaction =
        await Transaction.findOneAndUpdate(
          {
            _id: req.params.id,
            user: req.user._id,
          },
          req.body,
          {
            new: true,
          }
        );

      if (
        !transaction
      ) {
        return res
          .status(404)
          .json({
            message:
              "Transaction not found",
          });
      }

      res.json(
        transaction
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };


  export const deleteTransaction =
  async (req, res) => {
    try {
      const transaction =
        await Transaction.findOneAndDelete(
          {
            _id: req.params.id,
            user: req.user._id,
          }
        );

      if (
        !transaction
      ) {
        return res
          .status(404)
          .json({
            message:
              "Transaction not found",
          });
      }

      res.json({
        message:
          "Transaction deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };



  export const monthlySummary =
  async (req, res) => {
    try {
      const summary =
        await Transaction.aggregate([
          {
            $match: {
              user:
                req.user._id,
            },
          },

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
        ]);

      res.json(
        summary
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };