import {
  useState,
} from "react";

import {
  Trash2,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  toast,
} from "sonner";

import {
  useDeleteTransaction,
} from "../../features/transactions/transactionQueries";

export default function DeleteTransaction({
  id,
  title,
}) {
  const mutation =
    useDeleteTransaction();

  const [open, setOpen] =
    useState(false);

  const handleDelete =
    async () => {
      try {
        await mutation.mutateAsync(
          id
        );

        toast.success(
          "Transaction deleted"
        );
        setOpen(false);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Delete failed"
        );
      }
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          aria-label="Delete transaction"
        >
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete transaction?</DialogTitle>
          <DialogDescription>
            This will permanently remove {title ? `"${title}"` : "this transaction"} from your account.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
