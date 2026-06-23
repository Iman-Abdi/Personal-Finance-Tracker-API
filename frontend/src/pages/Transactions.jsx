import { useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import CreateTransaction from "../components/transactions/CreateTransaction";
import DeleteTransaction from "../components/transactions/DeleteTransaction";
import EditTransaction from "../components/transactions/EditTransaction";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useTransactions,
} from "../features/transactions/transactionQueries";

import {
  useCategories,
} from "../features/categories/categoryQueries";

import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const money =
  (value = 0) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

export default function Transactions() {
  const {
    data,
    isLoading,
    error,
  } = useTransactions();

  const {
    data: categories = [],
  } =
    useCategories();

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("all");

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <div className="h-10 w-64 animate-pulse rounded-lg bg-muted" />
          <div className="h-72 animate-pulse rounded-xl bg-muted" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Card className="border-destructive/30 bg-destructive/5 text-destructive">
          <CardHeader>
            <CardTitle>Failed to load transactions</CardTitle>
            <CardDescription>
              Please check your login session is valid.
            </CardDescription>
          </CardHeader>
        </Card>
      </DashboardLayout>
    );
  }

  const filteredTransactions =
    data?.filter(
      (transaction) => {
        const searchMatch =
          transaction.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const categoryMatch =
          category === "all" ||
          transaction.category ===
            category;

        return (
          searchMatch &&
          categoryMatch
        );
      }
    ) || [];

  const totalIncome =
    data
      ?.filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0) || 0;

  const totalExpense =
    data
      ?.filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0) || 0;

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div className="rounded-lg border bg-card p-5 shadow-sm md:p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Money movement
              </p>

              <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                Transactions
              </h1>

              <p className="mt-2 max-w-2xl text-muted-foreground">
                Review, filter, create, update, and remove your income and expense records.
              </p>
            </div>

            <div className="mr-6 sm:flex-row sm:items-center">
              <div className="flex justify-end">
              <CreateTransaction/>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Metric label="Showing" value={filteredTransactions.length} />
                <Metric label="Income" value={money(totalIncome)} tone="income" icon={ArrowUpRight} />
                <Metric label="Expense" value={money(totalExpense)} tone="expense" icon={ArrowDownRight} />
              </div>
              
            </div>
            
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="grid gap-3 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search by title..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />
            </div>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SlidersHorizontal className="size-4 text-muted-foreground" />
                <SelectValue placeholder="All categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((item) => (
                  <SelectItem key={item._id || item.name} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {filteredTransactions.length ===
        0 ? (
          <Card className="border-dashed bg-muted/20">
            <CardContent className="py-14 text-center">
              <h2 className="text-lg font-medium">
                No transactions found
              </h2>

              <p className="mt-2 text-muted-foreground">
                Create your first transaction or adjust your filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-sm">
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell className="font-medium">
                        {transaction.title}
                      </TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>
                        <span className={transaction.type === "income" ? "rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700" : "rounded-md bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700"}>
                          {transaction.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarDays className="size-4" />
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className={transaction.type === "income" ? "font-medium text-emerald-600" : "font-medium text-rose-600"}>
                        {transaction.type === "income" ? "+" : "-"}{money(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-4">
                          <EditTransaction transaction={transaction} />
                          <DeleteTransaction
                            id={transaction._id}
                            title={transaction.title}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

function Metric({
  label,
  value,
  tone,
  icon: Icon,
}) {
  const toneClass =
    tone === "income"
      ? "text-emerald-700"
      : tone === "expense"
        ? "text-rose-700"
        : "text-foreground";

  return (
    <div className="min-w-32 rounded-lg border bg-background px-4 py-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {Icon && (
          <Icon className="size-4" />
        )}
        {label}
      </div>
      <p className={`mt-1 text-xl font-semibold tracking-tight ${toneClass}`}>
        {value}
      </p>
    </div>
  );
}
