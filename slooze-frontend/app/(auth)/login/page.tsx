"use client"

import { useMutation } from "@apollo/client/react"
import { LOGIN_MUTATION } from "@/graphql/auth"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"


  interface LoginResponse {
    login: string
  }

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  

  const { login } = useAuth()
  const router = useRouter()

  const [loginMutation, { loading, error }] = useMutation<LoginResponse>(LOGIN_MUTATION)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await loginMutation({
      variables: { email, password },
    })

    if (!result.data) {
      throw new Error("Login failed")
    }

    const token = result.data.login;

      login(token)

      const payload = jwtDecode<{ role: string }>(token)

      if (payload.role === "MANAGER") {
        router.push("/dashboard")
      } else {
        router.push("/")
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="flex flex-row justify-between items-center text-center">
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="my-2">Email</Label>
            <Input
              type="email"
              placeholder="manager@slooze.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
                <Label className="my-2">Password</Label>
                <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                 <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
    </div>
                </div>
          <Button className="w-full my-4" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-sm text-center mt-4">
  New User?{" "}
  <Link href="/signup" className="font-semibold underline">
    Create an account
  </Link>
</p>

          {error && (
            <p className="text-red-500 text-sm">
              Invalid credentials
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
