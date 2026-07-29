"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Users,
  Building2,
  Swords,
  LogOut,
  User,
} from "lucide-react"

interface SidebarProps {
  onClose?: () => void
}

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Ocorrências", href: "/ocorrencias", icon: FileText },
  { label: "Moradores", href: "/moradores", icon: Users },
  { label: "Apartamentos", href: "/apartamentos", icon: Building2 },
  { label: "Rivalidades", href: "/rivalidades", icon: Swords },
]

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <nav
      className="flex h-full w-64 flex-col bg-white border-r border-slate-200"
      aria-label="Navegação principal"
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-4">
        <span className="text-2xl">🏢</span>
        <span className="font-bold text-xl text-rose-600">CondoCombat</span>
      </div>

      {/* Navigation links */}
      <div className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-rose-50 text-rose-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Bottom section */}
      <div className="border-t border-slate-200 px-3 py-4">
        <div className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-slate-600">
          <div className="flex size-8 items-center justify-center rounded-full bg-slate-200">
            <User className="size-4 text-slate-500" />
          </div>
          <span className="flex-1">Morador</span>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <LogOut className="size-5" />
          <span>Sair</span>
        </Link>
      </div>
    </nav>
  )
}
