"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ReactNode } from "react";

const ClientLink = ({
  children,
  href,
  className,
  ...props
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <Link href={href} className={cn("", className)} {...props}>
      {children}
    </Link>
  );
};

export default ClientLink;
