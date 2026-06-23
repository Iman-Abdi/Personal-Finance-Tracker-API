import DashboardLayout from "../components/layout/DashboardLayout";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  useSummary,
} from "../features/transactions/transactionQueries";

const money =
  (value = 0) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

export default function Summary() {
  const {
    data,
    isLoading,
  } =
    useSummary();

  if (isLoading)
    return (
      <DashboardLayout>
        <div className="h-72 animate-pulse rounded-xl bg-muted" />
      </DashboardLayout>
    );

  const maxTotal =
    Math.max(
      ...((data || []).map((item) => item.total)),
      1
    );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Summary
          </h1>

          <p className="mt-2 text-muted-foreground">
            Totals grouped by category summary.
          </p>
        </div>

        <div className="grid gap-4">
          {(data || []).map((item) => (
            <Card key={item._id}>
              <CardHeader>
                <CardTitle>{item._id}</CardTitle>
                <CardDescription>{money(item.total)}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.max((item.total / maxTotal) * 100, 8)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {!data?.length && (
            <Card className="border-dashed bg-muted/20">
              <CardContent className="p-10 text-center text-muted-foreground">
                No summary data yet. Add transactions to generate insights.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
