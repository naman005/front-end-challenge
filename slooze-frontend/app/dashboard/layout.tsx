"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (user.role !== "MANAGER") {
      router.push("/")
    }
  }, [user, router])

  if (!user || user.role !== "MANAGER") {
    return null
  }


  return (
              <main className="flex-1 w-full px-4 sm:px-6 lg:px-8">
                {children}
              </main>
  );
}
