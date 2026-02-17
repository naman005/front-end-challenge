"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark"
      )
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"

    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    )
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}
