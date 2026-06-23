import {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  Input,
} from "@/components/ui/input";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  toast,
} from "sonner";

import {
  useLogin,
} from "../features/auth/authQueries";

import useAuthStore from "../store/authStore";

export default function Login() {
  const navigate =
    useNavigate();

  const loginMutation =
    useLogin();

  const login =
    useAuthStore(
      (state) =>
        state.login
    );

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const submit =
    async (e) => {
      e.preventDefault();

      try {
        const data =
          await loginMutation.mutateAsync(
            {
              email,
              password,
            }
          );

        login(
          data,
          data.token
        );

        toast.success(
          "Login successful"
        );

        navigate("/");
      } catch {
        toast.error(
          "Invalid credentials"
        );
      }
    };

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in to continue tracking your income and expenses.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={
              submit
            }
            className="space-y-4"
          >
            <Input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            <Input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <Button className="w-full" size="lg" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Signing in..." : "Login"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              No account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
