import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Morador, Ocorrencia } from "@/lib/types"

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

const GRAVIDADE_COLORS: Record<string, string> = {
  baixa: "bg-slate-100 text-slate-700",
  media: "bg-yellow-100 text-yellow-800",
  alta: "bg-orange-100 text-orange-800",
  critica: "bg-red-100 text-red-800",
}

const STATUS_OCORRENCIA_COLORS: Record<string, string> = {
  aberta: "bg-blue-100 text-blue-800",
  investigando: "bg-amber-100 text-amber-800",
  resolvida: "bg-green-100 text-green-800",
  arquivada: "bg-slate-100 text-slate-500",
}

interface MoradorProfileProps {
  morador: Morador
  ocorrencias: Ocorrencia[]
}

export function MoradorProfile({ morador, ocorrencias }: MoradorProfileProps) {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-5">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xl font-bold text-rose-600">
              {morador.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">{morador.nome}</h2>
              <p className="text-sm text-slate-500">
                {morador.bloco} • Apartamento {morador.apartamento}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[morador.status] ?? "bg-slate-100 text-slate-700"}`}>
                  {morador.status === "inadimplente" ? "Inadimplente" : morador.status.charAt(0).toUpperCase() + morador.status.slice(1)}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                  {TIPO_LABELS[morador.tipo]}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-900">Informações de Contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-slate-500">Email:</span>
            <span className="text-slate-700">{morador.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-slate-500">Telefone:</span>
            <span className="text-slate-700">{morador.telefone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-slate-500">Ocorrências:</span>
            <span className="text-slate-700">{morador.ocorrencias}</span>
          </div>
        </CardContent>
      </Card>

      {/* Associated Ocorrências */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-900">Ocorrências Associadas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {ocorrencias.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500">Nenhuma ocorrência registrada.</p>
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
                      <td className="px-6 py-3 font-medium text-slate-900">{oc.titulo}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${GRAVIDADE_COLORS[oc.gravidade] ?? ""}`}>
                          {oc.gravidade.charAt(0).toUpperCase() + oc.gravidade.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_OCORRENCIA_COLORS[oc.status] ?? ""}`}>
                          {oc.status === "investigando" ? "Investigando" : oc.status.charAt(0).toUpperCase() + oc.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-slate-500">{new Date(oc.created_at).toLocaleDateString("pt-BR")}</td>
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
