"use client";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/nextjs";

export function UserSignInModal() {
  const { openSignIn } = useClerk();

  const handleSignIn = async () => {
    await openSignIn();
  };

  return (
    <Button variant="secondary" onClick={handleSignIn}>
      Sign in
    </Button>
  );
}
