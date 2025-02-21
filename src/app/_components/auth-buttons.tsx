"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export function AuthButtons() {
  const user = useUser();

  return (
    <div>
      {!user.isSignedIn && <SignInButton />}
      {!!user.isSignedIn && <SignOutButton />}
    </div>
  );
}
