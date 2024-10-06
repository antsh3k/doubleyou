import * as React from "react";
import { UserProfile } from "../user-profile";
import ClientLink from "../client-link";
import { UserSignInModal } from "../sign-in-modal";
import { User } from "@prisma/client";
import { UserSignOut } from "../signout";

export default function NavBar({
  user,
  title,
  userId,
}: {
  userId?: string | null | undefined;
  user: User | undefined | null;
  title?: string;
}) {
  return (
    <div className="flex min-w-full fixed justify-between p-2 border-b z-10 dark:bg-black dark:bg-opacity-50 bg-white">
      <ClientLink
        href="/"
        className="pl-2 flex items-center gap-3"
        aria-label="Home"
      >
        {/* <Image
          src="/logo.svg"
          width={200}
          height={200}
          alt="Bentogrid Logo"
          className="w-full max-w-[50px]"
          priority
        /> */}
        <span className="sr-only">Home</span>
        <h1>DoubleYou</h1>
      </ClientLink>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {user?.id && <UserProfile user={user} />}
          {/* <ModeToggle /> */}
          {!user?.id && !userId ? <UserSignInModal /> : <UserSignOut />}
        </div>
      </div>
    </div>
  );
}
