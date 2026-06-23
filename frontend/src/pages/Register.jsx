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
  useRegister,
} from "../features/auth/authQueries";

export default function Register() {
  const navigate =
    useNavigate();

  const registerMutation =
    useRegister();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const submit =
    async (e) => {
      e.preventDefault();

      try {
        await registerMutation.mutateAsync(
          form
        );

        toast.success(
          "Account created"
        );

        navigate(
          "/login"
        );
      } catch {
        toast.error(
          "Registration failed"
        );
      }
    };

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Build your financial dashboard in a few seconds.
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
              placeholder="Name"
              required
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name:
                    e.target
                      .value,
                })
              }
            />

            <Input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email:
                    e.target
                      .value,
                })
              }
            />

            <Input
              type="password"
              placeholder="Password"
              required
              value={
                form.password
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target
                      .value,
                })
              }
            />

            <Button className="w-full" size="lg" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? "Creating account..." : "Register"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
