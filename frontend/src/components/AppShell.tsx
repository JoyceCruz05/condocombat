"use client"

import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="flex items-center border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="ml-2 font-semibold text-slate-900">
            CondoCombat
          </span>
        </div>

        <main className="flex-1 overflow-auto bg-slate-50">{children}</main>
      </div>
    </div>
  )
}
