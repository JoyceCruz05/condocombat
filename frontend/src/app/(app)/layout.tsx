import type { Metadata } from "next"
import { AppShell } from "@/components/AppShell"
import { RequireAuth } from "@/components/RequireAuth"

export const metadata: Metadata = {
  title: "CondoCombat",
}

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <RequireAuth>
      <AppShell>
        {children}
      </AppShell>
    </RequireAuth>
  )
}
