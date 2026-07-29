"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, Swords } from "lucide-react"
import { RIVALIDADES_MOCK } from "@/lib/mock-rivalidades"
import { RivalidadeCard } from "@/components/Rivalidades/RivalidadeCard"

export default function RivalidadesListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("todas")
  const [sortBy, setSortBy] = useState<"intensidade" | "data">("intensidade")

  const filtered = RIVALIDADES_MOCK
    .filter((r) => {
      if (filterStatus !== "todas" && r.status !== filterStatus) return false
      if (!searchQuery) return true
      const q = searchQuery.toLowerCase()
      return (
        r.apartamentoA.toLowerCase().includes(q) ||
        r.apartamentoB.toLowerCase().includes(q) ||
        r.blocoA.toLowerCase().includes(q) ||
        r.blocoB.toLowerCase().includes(q) ||
        r.motivo.toLowerCase().includes(q)
      )
    })
    .sort((a, b) => {
      if (sortBy === "intensidade") return b.intensidade - a.intensidade
      return (
        new Date(b.ultima_ocorrencia).getTime() -
        new Date(a.ultima_ocorrencia).getTime()
      )
    })

  const statusFilterOptions = [
    { value: "todas", label: "Todas" },
    { value: "ativa", label: "Ativas" },
    { value: "resolvida", label: "Resolvidas" },
    { value: "escalada", label: "Escaladas" },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Rivalidades</h1>
          <p className="mt-1 text-sm text-slate-600">
            {RIVALIDADES_MOCK.length} conflitos entre apartamentos
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-600">
          <Swords className="size-4" />
          <span className="font-medium">{RIVALIDADES_MOCK.length} total</span>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Buscar por apartamento, bloco ou motivo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {statusFilterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterStatus(opt.value)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                filterStatus === opt.value
                  ? "border-rose-300 bg-rose-50 text-rose-700"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "intensidade" | "data")
          }
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
        >
          <option value="intensidade">Mais intensas</option>
          <option value="data">Mais recentes</option>
        </select>
      </div>

      {/* Results count */}
      <p className="mt-3 text-sm text-slate-500">
        {filtered.length} rivalidade{filtered.length !== 1 ? "s" : ""}{" "}
        encontrada{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Cards list */}
      <div className="mt-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500">
            Nenhuma rivalidade encontrada com os filtros atuais.
          </div>
        ) : (
          filtered.map((rivalidade) => (
            <RivalidadeCard key={rivalidade.id} rivalidade={rivalidade} />
          ))
        )}
      </div>
    </div>
  )
}
