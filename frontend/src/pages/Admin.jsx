import DashboardLayout from "../components/layout/DashboardLayout";

import {
  useAdminOverview,
} from "../features/admin/adminQueries";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Admin() {
  const {
    data,
    isLoading,
    error,
  } =
    useAdminOverview();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="h-48 animate-pulse rounded-xl bg-muted" />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Card className="border-destructive/30 bg-destructive/5 text-destructive">
          <CardHeader>
            <CardTitle>Admin overview unavailable</CardTitle>
            <CardDescription>
              Your account may not have admin access, or the admin API endpoint may be unavailable.
            </CardDescription>
          </CardHeader>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Overview from the admin API.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <MetricCard label="Total Users" value={data?.totalUsers} />
        <MetricCard label="Total Transactions" value={data?.totalTransactions} />
      </div>
    </DashboardLayout>
  );
}

function MetricCard({ label, value }) {
  return (
    <Card>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {label}
        </p>

        <p className="mt-2 text-3xl font-semibold tracking-tight">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
