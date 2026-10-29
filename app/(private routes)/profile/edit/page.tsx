"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import type { UpdateUserRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

import css from "./EditProfile.module.css";

export default function EditProfilePage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [username, setUsername] = useState<string | null>(null);

  const { data: user, isLoading } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });

  const currentUsername = username ?? user?.username ?? "";

  const mutation = useMutation({
    mutationFn: (payload: UpdateUserRequest) => updateMe(payload),
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      router.push("/profile");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const username = String(formData.get("username") ?? "").trim();
    if (!username) {
      return;
    }
    mutation.mutate({ username });
  };

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return <p>Failed to load user profile.</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar || "/avatar-placeholder.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>

            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              value={currentUsername}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          {mutation.isError && (
            <p role="alert">
              Failed to update profile. Please try again.
            </p>
          )}

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
