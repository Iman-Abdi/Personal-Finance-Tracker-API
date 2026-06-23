import { z } from "zod";

export const transactionSchema =
  z.object({
    title: z
      .string()
      .trim()
      .min(2, "Title must be at least 2 characters"),

    amount:
      z.coerce
        .number({
          message: "Amount is required",
        })
        .positive("Amount must be greater than 0"),

    type: z.enum([
      "income",
      "expense",
    ]),

    category:
      z
        .string()
        .trim()
        .min(2, "Category is required"),

    date: z
      .string()
      .trim()
      .optional(),
  });
