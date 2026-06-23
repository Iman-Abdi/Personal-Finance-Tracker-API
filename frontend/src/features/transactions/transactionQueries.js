import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
} from "../../api/transactionApi";

// GET ALL TRANSACTIONS
export const useTransactions =
  () => {
    return useQuery({
      queryKey: [
        "transactions",
      ],

      queryFn:
        getTransactions,
    });
  };

// CREATE TRANSACTION
export const useCreateTransaction =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createTransaction,

      onSuccess:
        async () => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: [
                "transactions",
              ],
              refetchType:
                "active",
            }),
            queryClient.invalidateQueries({
              queryKey: [
                "summary",
              ],
              refetchType:
                "active",
            }),
          ]);
        },
    });
  };

// UPDATE TRANSACTION
export const useUpdateTransaction =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        updateTransaction,

      onSuccess:
        async () => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: [
                "transactions",
              ],
              refetchType:
                "active",
            }),
            queryClient.invalidateQueries({
              queryKey: [
                "summary",
              ],
              refetchType:
                "active",
            }),
          ]);
        },
    });
  };

// DELETE TRANSACTION
export const useDeleteTransaction =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteTransaction,

      onSuccess:
        async () => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: [
                "transactions",
              ],
              refetchType:
                "active",
            }),
            queryClient.invalidateQueries({
              queryKey: [
                "summary",
              ],
              refetchType:
                "active",
            }),
          ]);
        },
    });
  };

// MONTHLY SUMMARY
export const useSummary =
  () => {
    return useQuery({
      queryKey: [
        "summary",
      ],

      queryFn:
        getSummary,
    });
  };
