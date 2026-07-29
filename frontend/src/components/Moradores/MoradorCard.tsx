"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Morador } from "@/lib/types"

const STATUS_COLORS: Record<string, string> = {
  ativo: "bg-emerald-100 text-emerald-800",
  inadimplente: "bg-red-100 text-red-800",
  suspenso: "bg-amber-100 text-amber-800",
}

const TIPO_LABELS: Record<string, string> = {
  sindico: "Síndico",
  morador: "Morador",
  proprietario: "Proprietário",
  inquilino: "Inquilino",
}

interface MoradorCardProps {
  morador: Morador
}

export function MoradorCard({ morador }: MoradorCardProps) {
  return (
    <Link href={`/moradores/${morador.id}`}>
      <Card className="cursor-pointer transition-colors hover:border-rose-200">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            {/* Avatar placeholder */}
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-600">
              {morador.avatar}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-semibold text-slate-900">
                {morador.nome}
              </h3>
              <p className="text-sm text-slate-500">
                {morador.bloco} • {morador.apartamento}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[morador.status] ?? "bg-slate-100 text-slate-700"}`}
              >
                {morador.status === "inadimplente"
                  ? "Inadimplente"
                  : morador.status.charAt(0).toUpperCase() + morador.status.slice(1)}
              </span>
              <span className="text-xs text-slate-400">
                {TIPO_LABELS[morador.tipo]}
              </span>
            </div>
          </div>

          {/* Ocorrências count */}
          {morador.ocorrencias > 0 && (
            <div className="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-500">
              {morador.ocorrencias} ocorrência{morador.ocorrencias !== 1 ? "s" : ""}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
