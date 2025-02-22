"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import CreatePostWizard from "./create-post-wizard";

const AuthButtons = () => {
  const { isSignedIn, isLoaded: isUserLoaded } = useUser();

  if (!isUserLoaded) return <div />;

  return (
    <div className="flex border-b border-slate-400 p-4">
      {!isSignedIn && (
        <div className="flex justify-center">
          <SignInButton />
        </div>
      )}
      {!!isSignedIn && <CreatePostWizard />}
    </div>
  );
};

export default AuthButtons;
