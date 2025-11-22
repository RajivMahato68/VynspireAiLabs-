"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const router = useRouter();
  const { loggedIn, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
    if (loggedIn) {
      router.replace("/blog");
    }
  }, [loggedIn, router, hydrate]);

  if (loggedIn) return null;
  return <>{children}</>;
}
