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
  Plus,
} from "lucide-react";

import {
  useCategories,
} from "../../features/categories/categoryQueries";
import {
  useCreateTransaction,
} from "../../features/transactions/transactionQueries";

const emptyForm = {
  title: "",
  amount: "",
  category: "",
  type: "expense",
  date: new Date().toISOString().slice(0, 10),
};

export default function CreateTransaction() {
  const mutation =
    useCreateTransaction();

  const {
    data: categories = [],
    isLoading: categoriesLoading,
  } =
    useCategories();

  const [open, setOpen] =
    useState(false);

  const [form, setForm] =
    useState(emptyForm);

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

  const validateForm =
    () => {
      const nextErrors = {};

      if (!form.title.trim()) {
        nextErrors.title =
          "Title is required";
      } else if (form.title.trim().length < 2) {
        nextErrors.title =
          "Use at least 2 characters";
      }

      if (!form.amount) {
        nextErrors.amount =
          "Amount is required";
      } else if (Number(form.amount) <= 0) {
        nextErrors.amount =
          "Amount must be greater than 0";
      }

      if (!form.category) {
        nextErrors.category =
          "Choose a category";
      }

      setErrors(nextErrors);

      return Object.keys(nextErrors).length === 0;
    };

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

  const submit =
    async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        toast.error(
          "Please complete the required fields"
        );
        return;
      }

      try {
        await mutation.mutateAsync({
          ...form,
          title:
            form.title.trim(),
          amount:
            Number(form.amount),
        });

        toast.success(
          "Transaction created"
        );
        setForm(emptyForm);
        setErrors({});
        setOpen(false);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to create transaction"
        );
      }
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Plus className="size-4" />
          New transaction
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create transaction</DialogTitle>
          <DialogDescription>
            Add a clean income or expense record to your account.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={submit}
          className="grid gap-4"
        >
          <Field label="Title" error={errors.title}>
            <Input
              placeholder="Example: Grocery run"
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
                placeholder="0.00"
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
                  <SelectValue placeholder={categoriesLoading ? "Loading..." : "Choose category"} />
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
            {mutation.isPending ? "Creating..." : "Create transaction"}
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
