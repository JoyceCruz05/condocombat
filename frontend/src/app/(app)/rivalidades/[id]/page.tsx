"use client"

import { use, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RIVALIDADES_MOCK } from "@/lib/mock-rivalidades"
import { OCORRENCIAS_MOCK } from "@/lib/types"
import { RivalidadeDetail } from "@/components/Rivalidades/RivalidadeDetail"

interface RivalidadeDetailPageProps {
  params: Promise<{ id: string }>
}

export default function RivalidadeDetailPage({ params }: RivalidadeDetailPageProps) {
  const { id } = use(params)

  const rivalidade = useMemo(
    () => RIVALIDADES_MOCK.find((r) => r.id === Number(id)),
    [id],
  )

  const ocorrenciasRelacionadas = useMemo(
    () =>
      rivalidade
        ? OCORRENCIAS_MOCK.filter((o) =>
            rivalidade.ocorrencias_relacionadas.includes(o.id),
          )
        : [],
    [rivalidade],
  )

  if (!rivalidade) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <p className="text-lg text-slate-500">Rivalidade não encontrada</p>
        <Link href="/rivalidades">
          <Button variant="outline" className="mt-4">
            Voltar para Rivalidades
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Back button */}
      <Link
        href="/rivalidades"
        className="mb-6 flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
      >
        <ArrowLeft className="size-4" />
        Voltar para Rivalidades
      </Link>

      <RivalidadeDetail
        rivalidade={rivalidade}
        ocorrencias={ocorrenciasRelacionadas}
      />
    </div>
  )
}
