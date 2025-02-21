"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import CreatePostWizard from "./create-post-wizard";

export function AuthButtons() {
  const user = useUser();

  return (
    <div className="flex border-b border-slate-400 p-4">
      {!user.isSignedIn && (
        <div className="flex justify-center">
          <SignInButton />
        </div>
      )}
      {!!user.isSignedIn && <CreatePostWizard />}
    </div>
  );
}
