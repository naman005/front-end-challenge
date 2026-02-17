"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import { usePathname, useRouter } from "next/navigation";
import { ApolloWrapper } from "@/lib/apollo-wrapper"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] })

export function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" || pathname === "/signup";

  if (!user || isAuthPage) return null;

  return (
    <header className="w-full h-14 border-b bg-background shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="text-sm sm:text-base font-medium">
          Welcome {user.email}
        </div>

        <div className="flex items-center gap-3">
          {user.role === "MANAGER" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Button>
          )}
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
    <ApolloWrapper>
      <AuthProvider>
        <div className="h-screen flex flex-col bg-muted overflow-hidden">
          <Topbar />

          <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 overflow-auto">
            {children}
          </main>
        </div>
      </AuthProvider>
    </ApolloWrapper>
  </body>
    </html>
  )
}
