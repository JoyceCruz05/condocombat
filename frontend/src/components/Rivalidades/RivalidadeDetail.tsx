"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Ocorrencia } from "@/lib/types"
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

const GRAVIDADE_COLORS: Record<string, string> = {
  baixa: "bg-slate-100 text-slate-700",
  media: "bg-yellow-100 text-yellow-800",
  alta: "bg-orange-100 text-orange-800",
  critica: "bg-red-100 text-red-800",
}

const STATUS_OCORRENCIA_COLORS: Record<string, string> = {
  aberta: "bg-blue-100 text-blue-800",
  investigando: "bg-amber-100 text-amber-800",
  resolvida: "bg-emerald-100 text-emerald-800",
  arquivada: "bg-slate-100 text-slate-500",
}

interface RivalidadeDetailProps {
  rivalidade: Rivalidade
  ocorrencias: Ocorrencia[]
}

export function RivalidadeDetail({ rivalidade, ocorrencias }: RivalidadeDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {rivalidade.blocoA}
                {rivalidade.apartamentoA}
                {" "}vs{" "}
                {rivalidade.blocoB}
                {rivalidade.apartamentoB}
              </h2>
              <p className="mt-1 text-sm capitalize text-slate-500">
                Motivo: {rivalidade.motivo}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge
                variant={STATUS_VARIANTS[rivalidade.status] ?? "default"}
              >
                {getStatusRivalidade(rivalidade.status)}
              </Badge>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${INTENSIDADE_COLORS[rivalidade.intensidade] ?? ""}`}
              >
                {getIntensidadeLabel(rivalidade.intensidade)} — {rivalidade.intensidade}/5
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ocorrências Relacionadas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-900">
            Ocorrências Relacionadas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {ocorrencias.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500">
              Nenhuma ocorrência relacionada.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-3">Título</th>
                    <th className="px-6 py-3">Gravidade</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {ocorrencias.map((oc) => (
                    <tr key={oc.id} className="hover:bg-slate-50">
                      <td className="px-6 py-3 font-medium text-slate-900">
                        {oc.titulo}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${GRAVIDADE_COLORS[oc.gravidade] ?? ""}`}
                        >
                          {oc.gravidade.charAt(0).toUpperCase() +
                            oc.gravidade.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_OCORRENCIA_COLORS[oc.status] ?? ""}`}
                        >
                          {oc.status === "investigando"
                            ? "Investigando"
                            : oc.status.charAt(0).toUpperCase() +
                              oc.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-slate-500">
                        {new Date(oc.created_at).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
