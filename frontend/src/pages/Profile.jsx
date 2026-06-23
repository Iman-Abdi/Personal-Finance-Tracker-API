import { useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import { useProfile } from "../features/auth/authQueries";

import { uploadProfilePicture } from "../api/uploadApi";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";

export default function Profile() {
  const {
    data: user,
    isLoading,
    error,
  } = useProfile();

  const [file, setFile] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const handleUpload =
    async () => {
      if (!file) {
        toast.error(
          "Please select an image"
        );

        return;
      }

      try {
        setUploading(true);

        const formData =
          new FormData();

        formData.append(
          "image",
          file
        );

        await uploadProfilePicture(
          formData
        );

        toast.success(
          "Profile picture updated"
        );
      } catch (error) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Upload failed"
        );
      } finally {
        setUploading(false);
      }
    };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="h-72 animate-pulse rounded-xl bg-muted" />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Card className="border-destructive/30 bg-destructive/5 text-destructive">
          <CardHeader>
            <CardTitle>Failed to load profile</CardTitle>
          </CardHeader>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Profile
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your account details and profile image.
          </p>
        </div>

        <Card>
          <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl font-semibold">
                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-semibold">
                {user?.name}
              </h2>

              <p className="text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["Name", user?.name],
              ["Email", user?.email],
              ["Role", user?.role || "user"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border bg-muted/30 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
                <p className="mt-2 font-medium">{value}</p>
              </div>
            ))}
          </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload profile picture</CardTitle>
            <CardDescription>Choose an image from your device.</CardDescription>
          </CardHeader>

          <CardContent>
          <input
            type="file"
            accept="image/*"
            className="block w-full rounded-lg border border-dashed bg-muted/30 p-4 text-sm"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
          />

          <Button
            className="mt-4"
            onClick={
              handleUpload
            }
            disabled={
              uploading
            }
          >
            {uploading
              ? "Uploading..."
              : "Upload Image"}
          </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
