import Category from "../models/Category.js";

const defaultCategories = [
  {
    name: "Food",
    description: "Meals, groceries, coffee, and restaurants.",
  },
  {
    name: "Transport",
    description: "Fuel, rides, public transport, and vehicle costs.",
  },
  {
    name: "Bills",
    description: "Utilities, rent, subscriptions, and recurring payments.",
  },
  {
    name: "Salary",
    description: "Payroll, client income, and recurring earnings.",
  },
  {
    name: "Shopping",
    description: "Clothing, home goods, and general purchases.",
  },
  {
    name: "Health",
    description: "Medical, pharmacy, wellness, and insurance costs.",
  },
  {
    name: "Other",
    description: "Everything that does not fit another category.",
  },
];

const ensureDefaultCategories =
  async () => {
    const count =
      await Category.countDocuments();

    if (count > 0) {
      return;
    }

    await Category.insertMany(
      defaultCategories,
      {
        ordered: false,
      }
    );
  };

export const getCategories =
  async (req, res) => {
    try {
      await ensureDefaultCategories();

      const categories =
        await Category.find()
          .sort({
            name: 1,
          });

      res.json(
        categories
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };


  export const createCategory =
  async (req, res) => {
    try {
      const name =
        req.body.name
          ?.trim();

      if (!name) {
        return res
          .status(400)
          .json({
            message:
              "Category name is required",
          });
      }

      const category =
        await Category.create(
          {
            name,
            description:
              req.body.description
                ?.trim() || "",
          }
        );

      res.status(201).json(
        category
      );
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(409)
          .json({
            message:
              "Category already exists",
          });
      }

      res.status(500).json({
        message:
          error.message,
      });
    }
  };

