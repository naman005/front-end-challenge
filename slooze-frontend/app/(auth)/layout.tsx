"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <div className="h-screen flex flex-col overflow-auto">
  <div className="absolute top-4 right-4">
    <ThemeToggle />
  </div>

  <div className="flex flex-1 items-center justify-center">
    {children}
  </div>
</div>

  )
}
