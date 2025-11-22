"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { loggedIn, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
    if (!loggedIn) {
      router.replace("/login");
    }
  }, [loggedIn, router, hydrate]);

  if (!loggedIn) return null;
  return <>{children}</>;
}
