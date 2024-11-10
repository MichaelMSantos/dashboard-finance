"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between px-8 py-4 border-b border-solid">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />

        <Link
          href="/"
          className={
            pathname === "/" ? "text-primary font-bold" : "text-gray-300"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/transaction"
          className={
            pathname === "/transactions"
              ? "text-primary font-bold"
              : "text-gray-300"
          }
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={
            pathname === "/subscriptions"
              ? "text-primary font-bold"
              : "text-gray-300"
          }
        >
          Assinatura
        </Link>
      </div>

      <UserButton showName />
    </nav>
  );
};

export default Navbar;