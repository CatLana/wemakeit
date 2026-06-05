"use client";

import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GetQuoteButton({ children, className }: Props) {
  return (
    <Link
      href={{ pathname: "/", query: { service: "quote" }, hash: "quote" } as never}
      className={className}
    >
      {children}
    </Link>
  );
}
