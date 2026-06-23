import {
  useProfile,
} from "../features/auth/authQueries";

import DashboardLayout from "../components/layout/DashboardLayout";
import { useTransactions } from "../features/transactions/transactionQueries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  ReceiptText,
  Sparkles,
} from "lucide-react";

const money =
  (value = 0) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

export default function Dashboard() {
  const {
    data,
    isLoading,
  } =
    useProfile();

  const {
    data: transactions = [],
    isLoading: transactionsLoading,
  } = useTransactions();

  if (isLoading)
    return (
      <DashboardLayout>
        <div className="h-48 animate-pulse rounded-2xl bg-muted" />
      </DashboardLayout>
    );

  const income =
    transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const expenses =
    transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const balance =
    income - expenses;

  const recentTransactions =
    transactions.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="grid gap-6 p-5 md:p-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3 mt-10">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Hi {data?.name || "there"}, your money is organized.
              </h1>

              <p className="mt-3 max-w-2xl text-muted-foreground">
                Track income, expenses, balance, and recent movements.
              </p>
            </div>

            <div className="rounded-xl border bg-background p-4">
              <p className="text-sm text-muted-foreground">
                Current balance
              </p>
              <p className="mt-2 text-4xl font-semibold tracking-tight">
                {money(balance)}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-emerald-50 p-3 text-emerald-700">
                  <p>Income</p>
                  <p className="mt-1 font-semibold">{money(income)}</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-3 text-rose-700">
                  <p>Expenses</p>
                  <p className="mt-1 font-semibold">{money(expenses)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={CircleDollarSign} label="Current balance" value={money(balance)} tone="slate" />
          <StatCard icon={ArrowUpRight} label="Income" value={money(income)} tone="green" />
          <StatCard icon={ArrowDownRight} label="Expenses" value={money(expenses)} tone="red" />
          <StatCard icon={ReceiptText} label="Transactions" value={transactionsLoading ? "..." : transactions.length} tone="slate" />
        </section>

        <section>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Latest transactions.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="divide-y">
                {recentTransactions.length ? (
                  recentTransactions.map((transaction) => (
                    <div key={transaction._id} className="flex items-center justify-between gap-4 py-4">
                      <div>
                        <p className="font-medium">{transaction.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.category} - {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>

                      <p className={transaction.type === "income" ? "font-medium text-emerald-600" : "font-medium text-rose-600"}>
                        {transaction.type === "income" ? "+" : "-"}{money(transaction.amount)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed bg-muted/30 p-6 text-center text-muted-foreground">
                    No transactions yet. Add your first one to start tracking.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon: Icon, label, value, tone }) {
  const colors = {
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-rose-50 text-rose-700",
    slate: "bg-muted text-foreground",
  };

  return (
    <Card className="shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent>
        <div className={`mb-4 flex size-10 items-center justify-center rounded-lg ${colors[tone]}`}>
          <Icon className="size-5" />
        </div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}
