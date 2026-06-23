import UserMenu from "./UserMenu";
import {
  NavLink,
} from "react-router-dom";

import {
  LayoutDashboard,
  PieChart,
  User,
  Wallet,
} from "lucide-react";

const links = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/transactions",
    label: "Transactions",
    icon: Wallet,
  },
  {
    to: "/summary",
    label: "Summary",
    icon: PieChart,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
  },
];

export default function Navbar() {
  const linkClass =
    ({ isActive }) =>
      [
        "inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition",
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      ].join(" ");

  return (
    <header className="sticky top-0 z-30 border-b bg-background/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            FT
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Finance Tracker
            </p>

            <h1 className="text-lg font-semibold tracking-tight">
              Financial overview
            </h1>
          </div>
        </div>

        <nav className="order-3 flex w-full gap-2 overflow-x-auto md:order-2 md:w-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              end={link.to === "/"}
            >
              <link.icon className="size-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="order-2 md:order-3">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
