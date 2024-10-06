"use client";
import { useClerk } from "@clerk/nextjs";
import { Button } from "../ui/button";

export function UserProfileButton() {
  const { openUserProfile } = useClerk();

  return (
    <Button
      variant="ghost"
      className="p-0 font-normal"
      onClick={() => openUserProfile()}
    >
      Profile
    </Button>
  );
}
