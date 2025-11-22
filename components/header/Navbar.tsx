"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { ModeToggle } from "../themeToggle";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const logout = useAuthStore((state) => state.logout);
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();

    const id = window.setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, [hydrate]);

  return (
    <header className="border-b">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
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
              {!loggedIn ? (
                <>
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
                </>
              ) : (
                <>
                  <Link href="/profile">
                    <Button variant="ghost" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => logout()}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}

              {mounted && <ModeToggle />}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
