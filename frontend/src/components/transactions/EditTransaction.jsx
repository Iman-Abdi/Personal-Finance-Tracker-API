import {
  useState,
} from "react";

import {
  Button,
} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Input,
} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  toast,
} from "sonner";
import {
  Pencil,
} from "lucide-react";

import {
  useCategories,
} from "../../features/categories/categoryQueries";
import {
  useUpdateTransaction,
} from "../../features/transactions/transactionQueries";

export default function EditTransaction({
  transaction,
}) {
  const mutation =
    useUpdateTransaction();

  const {
    data: categories = [],
  } =
    useCategories();

  const [open, setOpen] =
    useState(false);

  const [form, setForm] =
    useState(() => ({
      title:
        transaction.title || "",
      amount:
        String(transaction.amount || ""),
      category:
        transaction.category || "",
      type:
        transaction.type || "expense",
      date:
        transaction.date
          ? new Date(transaction.date).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10),
    }));

  const [errors, setErrors] =
    useState({});

  const categoryOptions =
    categories.length
      ? categories.map((category) => category.name)
      : [
          "Food",
          "Transport",
          "Bills",
          "Salary",
          "Shopping",
          "Health",
          "Other",
        ];

  const updateField =
    (field, value) => {
      setForm({
        ...form,
        [field]: value,
      });
      setErrors({
        ...errors,
        [field]: "",
      });
    };

  const validateForm =
    () => {
      const nextErrors = {};

      if (!form.title.trim()) {
        nextErrors.title =
          "Title is required";
      }

      if (!form.amount || Number(form.amount) <= 0) {
        nextErrors.amount =
          "Enter an amount greater than 0";
      }

      if (!form.category) {
        nextErrors.category =
          "Choose a category";
      }

      setErrors(nextErrors);

      return Object.keys(nextErrors).length === 0;
    };

  const submit =
    async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        toast.error(
          "Please fix the highlighted fields"
        );
        return;
      }

      try {
        await mutation.mutateAsync({
          id:
            transaction._id,
          data: {
            title:
              form.title.trim(),
            amount:
              Number(form.amount),
            category:
              form.category,
            type:
              form.type,
            date:
              form.date,
          },
        });

        toast.success(
          "Transaction updated"
        );
        setOpen(false);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Update failed"
        );
      }
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Edit transaction"
        >
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit transaction</DialogTitle>
          <DialogDescription>
            Update the saved details for this record.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="grid gap-4">
          <Field label="Title" error={errors.title}>
            <Input
              value={form.title}
              aria-invalid={Boolean(errors.title)}
              onChange={(e) =>
                updateField(
                  "title",
                  e.target.value
                )
              }
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Amount" error={errors.amount}>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={form.amount}
                aria-invalid={Boolean(errors.amount)}
                onChange={(e) =>
                  updateField(
                    "amount",
                    e.target.value
                  )
                }
              />
            </Field>

            <Field label="Date">
              <Input
                type="date"
                value={form.date}
                onChange={(e) =>
                  updateField(
                    "date",
                    e.target.value
                  )
                }
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category" error={errors.category}>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  updateField(
                    "category",
                    value
                  )
                }
              >
                <SelectTrigger
                  className="w-full"
                  aria-invalid={Boolean(errors.category)}
                >
                  <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent>
                  {categoryOptions.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Type">
              <Select
                value={form.type}
                onValueChange={(value) =>
                  updateField(
                    "type",
                    value
                  )
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            size="lg"
            className="mt-2"
          >
            {mutation.isPending ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  children,
  error,
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">
        {label}
      </span>
      {children}
      {error && (
        <span className="text-xs font-medium text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}
