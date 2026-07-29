"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

interface RequireAuthProps {
  children: React.ReactNode
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { user, isLoading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (!user && pathname !== "/login") {
      router.push("/login")
    }

    if (user && pathname === "/login") {
      router.push("/dashboard")
    }
  }, [user, isLoading, pathname, router])

  if (isLoading) {
    return null
  }

  if (!user && pathname !== "/login") {
    return null
  }

  return <>{children}</>
}
