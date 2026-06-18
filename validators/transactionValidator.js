import { z } from "zod";

export const transactionSchema =
  z.object({
    title: z
      .string()
      .min(2),

    amount:
      z.number(),

    type: z.enum([
      "income",
      "expense",
    ]),

    category:
      z.string(),

    date: z
      .string()
      .optional(),
  });