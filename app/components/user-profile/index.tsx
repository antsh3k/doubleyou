import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { User } from "@prisma/client";

import { UserProfileButton } from "./user-profile-button";

export function UserProfile({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="w-[2.25rem] h-[2.25rem] cursor-pointer"
      >
        <Avatar>
          <AvatarImage
            // src={user.profile_image_url || undefined}
            // TODO: Add user profile image
            src={undefined}
            alt="User Profile"
          />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <Link href="/user-profile">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link> */}
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <UserProfileButton />
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <SignOutButton>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
