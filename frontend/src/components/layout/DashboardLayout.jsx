import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(circle_at_top_right,color-mix(in_oklch,var(--primary),transparent_93%),transparent_32rem)]">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
