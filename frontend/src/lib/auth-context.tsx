"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  name: string
  email: string
  tipo: "sindico" | "morador" | "admin"
}

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const MOCK_CREDENTIALS = {
  email: "admin@condocombat.com",
  password: "123456",
}

const MOCK_USER: User = {
  name: "Admin",
  email: "admin@condocombat.com",
  tipo: "sindico",
}

const STORAGE_KEY = "condocombat_token"

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function setStoredToken(token: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, token)
  } catch {
    // Storage not available
  }
}

function clearStoredToken(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage not available
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = getStoredToken()
    if (token) {
      setUser(MOCK_USER)
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (email !== MOCK_CREDENTIALS.email || password !== MOCK_CREDENTIALS.password) {
        return { success: false, error: "Email ou senha inválidos" }
      }

      setStoredToken("mock-jwt-token-condocombat")
      setUser(MOCK_USER)
      return { success: true }
    },
    [],
  )

  const logout = useCallback(() => {
    clearStoredToken()
    setUser(null)
    router.push("/login")
  }, [router])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
