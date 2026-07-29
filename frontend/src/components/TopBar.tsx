import { Bell } from "lucide-react"

interface TopBarProps {
  title?: string
}

export function TopBar({ title }: TopBarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-4">
        {title && (
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <div className="relative flex items-center justify-center rounded-lg p-2 text-slate-600">
          <Bell className="size-5" />
        </div>

        {/* User avatar placeholder */}
        <div className="flex size-8 items-center justify-center rounded-full bg-rose-100 text-sm font-medium text-rose-600">
          M
        </div>
      </div>
    </header>
  )
}
