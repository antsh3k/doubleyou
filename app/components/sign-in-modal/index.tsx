"use client";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/nextjs";

export function UserSignInModal() {
  const { openSignIn } = useClerk();

  return (
    <Button variant="secondary" onClick={() => openSignIn()}>
      Sign in
    </Button>
  );
}
