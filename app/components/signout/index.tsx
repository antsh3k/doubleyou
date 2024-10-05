"use client";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/nextjs";

export function UserSignOut() {
  const { signOut } = useClerk();

  return (
    <Button variant="secondary" onClick={() => signOut()}>
      Sign out
    </Button>
  );
}
