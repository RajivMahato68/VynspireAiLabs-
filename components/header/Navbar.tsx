"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ModeToggle } from "../themeToggle";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <header className="border-b">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Blog className="h-6 w-6" /> */}
            <span className="font-bold text-xl">MyBlog</span>
          </Link>

          <nav className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>

            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register
                </Button>
              </Link>
              {mounted && <ModeToggle />}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
