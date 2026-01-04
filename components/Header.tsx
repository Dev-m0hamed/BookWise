"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="text-2xl font-bold">
        <Image src="/icons/logo.svg" alt="Logo" width={40} height={40} />
      </Link>
      <ul className="flex items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              pathname === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
