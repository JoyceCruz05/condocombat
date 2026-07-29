"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { OCORRENCIAS_MOCK } from "@/lib/types"
import { ArrowLeft, CheckCircle, Archive } from "lucide-react"

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
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function OcorrenciaDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const ocorrencia = OCORRENCIAS_MOCK.find((o) => o.id === id)

  if (!ocorrencia) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <h1 className="text-2xl font-bold text-slate-900">
          Ocorrência não encontrada
        </h1>
        <p className="mt-2 text-slate-600">
          A ocorrência que você procura não existe ou foi removida.
        </p>
        <Link href="/ocorrencias">
          <Button variant="outline" className="mt-6">
            <ArrowLeft className="mr-2 size-4" />
            Voltar para Ocorrências
          </Button>
        </Link>
      </div>
    )
  }

  function handleResolver() {
    alert(`Ocorrência "${ocorrencia!.titulo}" resolvida com sucesso!`)
    console.log("Resolver ocorrência:", ocorrencia!.id)
  }

  function handleArquivar() {
    alert(`Ocorrência "${ocorrencia!.titulo}" arquivada.`)
    console.log("Arquivar ocorrência:", ocorrencia!.id)
  }

  return (
    <div className="p-6">
      {/* Back button */}
      <Link
        href="/ocorrencias"
        className="mb-6 inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="mr-1 size-4" />
        Voltar para Ocorrências
      </Link>

      {/* Title bar */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {ocorrencia.titulo}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Ocorrência #{ocorrencia.id} &middot;{" "}
            {ocorrencia.categoria.charAt(0).toUpperCase() +
              ocorrencia.categoria.slice(1)}
          </p>
        </div>
        <div className="flex gap-2">
          {ocorrencia.status !== "resolvida" &&
            ocorrencia.status !== "arquivada" && (
              <>
                <Button
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                  onClick={handleResolver}
                >
                  <CheckCircle className="mr-2 size-4" />
                  Resolver
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-300 text-slate-600 hover:bg-slate-50"
                  onClick={handleArquivar}
                >
                  <Archive className="mr-2 size-4" />
                  Arquivar
                </Button>
              </>
            )}
        </div>
      </div>

      {/* Detail Cards */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Descrição */}
        <div className="col-span-full rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Descrição
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            {ocorrencia.descricao}
          </p>
        </div>

        {/* Informações */}
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Informações
          </h2>
          <dl className="mt-3 space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm text-slate-500">Categoria</dt>
              <dd className="text-sm font-medium text-slate-900">
                {ocorrencia.categoria.charAt(0).toUpperCase() +
                  ocorrencia.categoria.slice(1)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-slate-500">Gravidade</dt>
              <dd>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${GRAVIDADE_COLORS[ocorrencia.gravidade] ?? "bg-slate-100 text-slate-700"}`}
                >
                  {ocorrencia.gravidade.charAt(0).toUpperCase() +
                    ocorrencia.gravidade.slice(1)}
                </span>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-slate-500">Status</dt>
              <dd>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[ocorrencia.status] ?? "bg-slate-100 text-slate-500"}`}
                >
                  {ocorrencia.status === "investigando"
                    ? "Investigando"
                    : ocorrencia.status.charAt(0).toUpperCase() +
                      ocorrencia.status.slice(1)}
                </span>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-slate-500">Apartamento</dt>
              <dd className="text-sm font-medium text-slate-900">
                {ocorrencia.apartamento}
              </dd>
            </div>
          </dl>
        </div>

        {/* Datas */}
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Datas
          </h2>
          <dl className="mt-3 space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm text-slate-500">Data de Criação</dt>
              <dd className="text-sm font-medium text-slate-900">
                {formatDate(ocorrencia.created_at)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-slate-500">Última Atualização</dt>
              <dd className="text-sm font-medium text-slate-900">
                {formatDate(ocorrencia.updated_at)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
