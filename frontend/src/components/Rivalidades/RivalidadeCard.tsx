"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Rivalidade } from "@/lib/mock-rivalidades"
import { getIntensidadeLabel, getStatusRivalidade } from "@/lib/mock-rivalidades"

const INTENSIDADE_COLORS: Record<number, string> = {
  1: "bg-slate-100 text-slate-700",
  2: "bg-green-100 text-green-800",
  3: "bg-yellow-100 text-yellow-800",
  4: "bg-orange-100 text-orange-800",
  5: "bg-red-100 text-red-800",
}

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "destructive"> = {
  ativa: "default",
  resolvida: "secondary",
  escalada: "destructive",
}

const MOTIVO_ICONS: Record<string, string> = {
  barulho: "🔊",
  animal: "🐕",
  "vaga de garagem": "🚗",
  festa: "🎉",
  reforma: "🔨",
  briga: "⚔️",
  vazamento: "💧",
  "área comum": "🏢",
}

interface RivalidadeCardProps {
  rivalidade: Rivalidade
}

export function RivalidadeCard({ rivalidade }: RivalidadeCardProps) {
  const iconA = MOTIVO_ICONS[rivalidade.motivo] ?? "⚡"

  return (
    <Link href={`/rivalidades/${rivalidade.id}`}>
      <Card className="cursor-pointer transition-colors hover:border-rose-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{iconA}</span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  {rivalidade.blocoA}{rivalidade.apartamentoA} vs{" "}
                  {rivalidade.blocoB}{rivalidade.apartamentoB}
                </h3>
                <p className="text-sm capitalize text-slate-500">
                  {rivalidade.motivo}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <Badge variant={STATUS_VARIANTS[rivalidade.status] ?? "default"}>
                {getStatusRivalidade(rivalidade.status)}
              </Badge>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${INTENSIDADE_COLORS[rivalidade.intensidade] ?? ""}`}
              >
                {getIntensidadeLabel(rivalidade.intensidade)} {rivalidade.intensidade}/5
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
