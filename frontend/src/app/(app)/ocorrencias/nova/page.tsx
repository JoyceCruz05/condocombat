"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OCORRENCIAS_MOCK, type Ocorrencia } from "@/lib/types"
import { ArrowLeft } from "lucide-react"

type NovaOcorrenciaForm = Pick<
  Ocorrencia,
  "titulo" | "descricao" | "categoria" | "gravidade"
>

const INITIAL_FORM: NovaOcorrenciaForm = {
  titulo: "",
  descricao: "",
  categoria: "barulho",
  gravidade: "media",
}

export default function NovaOcorrenciaPage() {
  const router = useRouter()
  const [form, setForm] = useState<NovaOcorrenciaForm>(INITIAL_FORM)

  function handleChange(
    field: keyof NovaOcorrenciaForm,
    value: string,
  ) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.titulo.trim()) {
      alert("O título é obrigatório.")
      return
    }

    const novaOcorrencia: Ocorrencia = {
      id: Math.max(...OCORRENCIAS_MOCK.map((o) => o.id)) + 1,
      titulo: form.titulo.trim(),
      descricao: form.descricao.trim(),
      categoria: form.categoria,
      gravidade: form.gravidade,
      status: "aberta",
      apartamento: "—",
      bloco: "A",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    OCORRENCIAS_MOCK.unshift(novaOcorrencia)
    alert("Ocorrência registrada com sucesso!")
    router.push("/ocorrencias")
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

      <h1 className="text-2xl font-bold text-slate-900">Nova Ocorrência</h1>
      <p className="mt-1 text-sm text-slate-600">
        Registre uma nova ocorrência no condomínio
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl">
        <div className="space-y-5 rounded-lg border border-slate-200 bg-white p-6">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              placeholder="Ex: Barulho excessivo no apartamento 201"
              value={form.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
              required
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <textarea
              id="descricao"
              rows={4}
              placeholder="Descreva detalhadamente a ocorrência..."
              value={form.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1"
            />
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria</Label>
            <select
              id="categoria"
              value={form.categoria}
              onChange={(e) => handleChange("categoria", e.target.value)}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1"
            >
              <option value="barulho">Barulho</option>
              <option value="briga">Briga</option>
              <option value="festa">Festa</option>
              <option value="obra">Obra</option>
              <option value="animal">Animal</option>
              <option value="vazamento">Vazamento</option>
              <option value="outra">Outra</option>
            </select>
          </div>

          {/* Gravidade */}
          <div className="space-y-2">
            <Label htmlFor="gravidade">Gravidade</Label>
            <select
              id="gravidade"
              value={form.gravidade}
              onChange={(e) => handleChange("gravidade", e.target.value)}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1"
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
              <option value="critica">Crítica</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              Registrar Ocorrência
            </Button>
            <Link href="/ocorrencias">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
