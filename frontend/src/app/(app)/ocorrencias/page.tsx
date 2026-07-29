"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OCORRENCIAS_MOCK } from "@/lib/types"
import { Plus, Search } from "lucide-react"

const CATEGORIAS = [
  "todas",
  "barulho",
  "briga",
  "festa",
  "obra",
  "animal",
  "vazamento",
  "outra",
] as const

const STATUS = [
  "todos",
  "aberta",
  "investigando",
  "resolvida",
  "arquivada",
] as const

const GRAVIDADES = ["todas", "baixa", "media", "alta", "critica"] as const

const ITEMS_PER_PAGE = 10

const GRAVIDADE_COLORS: Record<string, string> = {
  baixa: "bg-slate-100 text-slate-700",
  media: "bg-yellow-100 text-yellow-800",
  alta: "bg-orange-100 text-orange-800",
  critica: "bg-red-100 text-red-800",
}

const STATUS_COLORS: Record<string, string> = {
  aberta: "bg-blue-100 text-blue-800",
  investigando: "bg-amber-100 text-amber-800",
  resolvida: "bg-green-100 text-green-800",
  arquivada: "bg-slate-100 text-slate-500",
}

function GravidadeBadge({ gravidade }: { gravidade: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${GRAVIDADE_COLORS[gravidade] ?? "bg-slate-100 text-slate-700"}`}
    >
      {gravidade.charAt(0).toUpperCase() + gravidade.slice(1)}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[status] ?? "bg-slate-100 text-slate-500"}`}
    >
      {status === "investigando"
        ? "Investigando"
        : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

function formatDate(dateString: string): string {
  if (typeof dateString !== "string" || !dateString) {
    return "Data inválida"
  }
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return "Data inválida"
  }
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function OcorrenciasListPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoriaFilter, setCategoriaFilter] = useState("todas")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [gravidadeFilter, setGravidadeFilter] = useState("todas")
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = OCORRENCIAS_MOCK.filter((ocorrencia) => {
    if (categoriaFilter !== "todas" && ocorrencia.categoria !== categoriaFilter)
      return false
    if (statusFilter !== "todos" && ocorrencia.status !== statusFilter)
      return false
    if (gravidadeFilter !== "todas" && ocorrencia.gravidade !== gravidadeFilter)
      return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        ocorrencia.titulo.toLowerCase().includes(query) ||
        ocorrencia.descricao.toLowerCase().includes(query) ||
        ocorrencia.apartamento.toLowerCase().includes(query)
      )
    }
    return true
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  function handleCategoriaChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCategoriaFilter(e.target.value)
    setCurrentPage(1)
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setStatusFilter(e.target.value)
    setCurrentPage(1)
  }

  function handleGravidadeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setGravidadeFilter(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ocorrências</h1>
          <p className="mt-1 text-sm text-slate-600">
            Gerencie as ocorrências do condomínio
          </p>
        </div>
        <Link href="/ocorrencias/nova">
          <Button className="bg-rose-600 hover:bg-rose-700 text-white">
            <Plus className="mr-2 size-4" />
            Nova Ocorrência
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Buscar ocorrências..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-9"
          />
        </div>

        {/* Categoria Filter */}
        <select
          value={categoriaFilter}
          onChange={handleCategoriaChange}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1"
          aria-label="Filtrar por categoria"
        >
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "todas" ? "Todas Categorias" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1"
          aria-label="Filtrar por status"
        >
          {STATUS.map((st) => (
            <option key={st} value={st}>
              {st === "todos"
                ? "Todos Status"
                : st === "investigando"
                  ? "Investigando"
                  : st.charAt(0).toUpperCase() + st.slice(1)}
            </option>
          ))}
        </select>

        {/* Gravidade Filter */}
        <select
          value={gravidadeFilter}
          onChange={handleGravidadeChange}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1"
          aria-label="Filtrar por gravidade"
        >
          {GRAVIDADES.map((g) => (
            <option key={g} value={g}>
              {g === "todas"
                ? "Todas Gravidades"
                : g.charAt(0).toUpperCase() + g.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="mt-3 text-sm text-slate-500">
        {filtered.length} ocorrência{filtered.length !== 1 ? "s" : ""}{" "}
        encontrada{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Table */}
      <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Título
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Categoria
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Apt
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Gravidade
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-sm text-slate-500"
                >
                  Nenhuma ocorrência encontrada com os filtros atuais.
                </td>
              </tr>
            ) : (
              paginated.map((ocorrencia) => (
                <tr
                  key={ocorrencia.id}
                  className="cursor-pointer transition-colors hover:bg-slate-50"
                  onClick={() => router.push(`/ocorrencias/${ocorrencia.id}`)}
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900">
                    {ocorrencia.titulo}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                    {ocorrencia.categoria.charAt(0).toUpperCase() +
                      ocorrencia.categoria.slice(1)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                    {ocorrencia.apartamento}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <GravidadeBadge gravidade={ocorrencia.gravidade} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <StatusBadge status={ocorrencia.status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500">
                    {formatDate(ocorrencia.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Página {currentPage} de {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Próximo
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
