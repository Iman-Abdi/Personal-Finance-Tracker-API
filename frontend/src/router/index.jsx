import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";

import ProtectedRoute from "@/components/common/ProtectedRoute";

import Transactions from "@/pages/Transactions";

import Profile from "@/pages/Profile";

import Summary from "@/pages/Summary";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",

    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  {
    path: "/transactions",

    element: (
      <ProtectedRoute>
        <Transactions />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",

    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },

  {
    path: "/summary",

    element: (
      <ProtectedRoute>
        <Summary />
      </ProtectedRoute>
    ),
  },
]);
