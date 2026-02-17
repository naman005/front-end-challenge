"use client"

import Link from "next/link";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { REGISTER_MUTATION } from "@/graphql/auth";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, EyeOff } from "lucide-react"
import { useState, useEffect } from "react"

interface RegisterResponse {
  register: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState("STORE_KEEPER")
  const [countdown, setCountdown] = useState(3);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registerMutation, { loading, error }] = useMutation<RegisterResponse>(REGISTER_MUTATION);

  const passwordsMatch = password === confirmPassword
  const isFormValid =
    name &&
    email &&
    password &&
    confirmPassword && role &&
    passwordsMatch



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await registerMutation({
        variables: {
          name,
          email,
          password,
          role,
        },
      });
    if (data?.register) {
        setIsSuccess(true);
      }
    } catch (err) {
      console.error("Register failed", err);
    }  
  }

   useEffect(() => {
    if (!isSuccess) return;

    if (countdown === 0) {
      router.push("/login");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isSuccess, countdown, router]);

  return (
    <Card className="w-full max-w-md shadow-lg">
      {isSuccess ? (
        <div className="p-6 text-center">
          <h2 style={{ color: "green" }}>
            Registration successful!
          </h2>
          <p>Redirecting to login in {countdown}...</p>
        </div>
      ) : (
        <>
      <CardHeader>
        <CardTitle className="text-center">Create Account</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
                <Label className="my-2">Name</Label>
                <Input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
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
            <div>
                <Label className="my-2">Confirm Password</Label>
                <div className="relative">

                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
        <div>
          <Label className="my-2">Role</Label>
          <Select onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MANAGER">Manager</SelectItem>
              <SelectItem value="STORE_KEEPER">
                Store Keeper
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full my-4" disabled={!isFormValid || loading}>
          {loading ? "Creating account..." : "Create Account"}
        </Button>
        <p className="text-sm text-center mt-2">
  Existing user?{" "}
  <Link href="/login" className="font-semibold underline">
    Login
  </Link>
</p>
        {error && (
            <p className="text-red-500 text-sm">
              Registration failed. Please try again.
            </p>
          )}
        </form>
      </CardContent>
      </>
      )}
    </Card>
  )
}
