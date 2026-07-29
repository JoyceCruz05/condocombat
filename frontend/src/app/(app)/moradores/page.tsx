"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { MORADORES_MOCK } from "@/lib/types"
import { MoradorCard } from "@/components/Moradores/MoradorCard"
import { Search, Users } from "lucide-react"

const ITEMS_PER_PAGE = 8

export default function MoradoresListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = MORADORES_MOCK.filter((morador) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      morador.nome.toLowerCase().includes(q) ||
      morador.apartamento.includes(q) ||
      morador.bloco.toLowerCase().includes(q) ||
      morador.email.toLowerCase().includes(q)
    )
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Moradores</h1>
          <p className="mt-1 text-sm text-slate-600">
            {MORADORES_MOCK.length} moradores cadastrados
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-600">
          <Users className="size-4" />
          <span className="font-medium">{MORADORES_MOCK.length} total</span>
        </div>
      </div>

      {/* Search */}
      <div className="mt-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Buscar por nome, apartamento, bloco..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-9"
          />
        </div>
      </div>

      {/* Results count */}
      <p className="mt-3 text-sm text-slate-500">
        {filtered.length} morador{filtered.length !== 1 ? "es" : ""}{" "}
        encontrado{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Cards grid */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {paginated.length === 0 ? (
          <div className="col-span-full py-12 text-center text-sm text-slate-500">
            Nenhum morador encontrado com a busca atual.
          </div>
        ) : (
          paginated.map((morador) => (
            <MoradorCard key={morador.id} morador={morador} />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Página {currentPage} de {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
