"use client"

import { use, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MORADORES_MOCK, OCORRENCIAS_MOCK } from "@/lib/types"
import { MoradorProfile } from "@/components/Moradores/MoradorProfile"

interface MoradorDetailPageProps {
  params: Promise<{ id: string }>
}

export default function MoradorDetailPage({ params }: MoradorDetailPageProps) {
  const router = useRouter()
  const { id } = use(params)

  const morador = useMemo(
    () => MORADORES_MOCK.find((m) => m.id === Number(id)),
    [id],
  )

  const ocorrencias = useMemo(
    () =>
      OCORRENCIAS_MOCK.filter((o) => o.apartamento === morador?.apartamento),
    [morador?.apartamento],
  )

  if (!morador) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <p className="text-lg text-slate-500">Morador não encontrado</p>
        <Link href="/moradores">
          <Button variant="outline" className="mt-4">
            Voltar para Moradores
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Back button */}
      <button
        onClick={() => router.push("/moradores")}
        className="mb-6 flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
      >
        <ArrowLeft className="size-4" />
        Voltar para Moradores
      </button>

      <MoradorProfile morador={morador} ocorrencias={ocorrencias} />
    </div>
  )
}
