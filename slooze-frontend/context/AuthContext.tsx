"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation";


interface UserPayload {
  sub: string
  email: string
  role: "MANAGER" | "STORE_KEEPER"
}

interface AuthContextType {
  user: UserPayload | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<UserPayload | null>(null)
  const router = useRouter();

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) return;

  if (token.split(".").length !== 3) {
    localStorage.removeItem("token");
    return;
  }

  try {
    const decoded = jwtDecode<UserPayload>(token);
    setUser(decoded);
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
  }
}, []);

  const login = (token: string) => {
    localStorage.setItem("token", token)
    const decoded =
      jwtDecode<UserPayload>(token)
    setUser(decoded)
  }

  const logout = () => {
  localStorage.removeItem("token");
  setUser(null);
  router.push("/login");
};

  return (
    <AuthContext.Provider
      value={{ user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error("useAuth must be used inside AuthProvider")
  return context
}
