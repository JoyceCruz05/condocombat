import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Flame,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SummaryCardData {
  title: string
  value: string
  trend: string
  direction: "up" | "down" | "neutral"
  positive: boolean | null // true = green, false = red, null = neutral
}

interface OcorrenciaRow {
  titulo: string
  categoria: string
  apartamento: string
  gravidade: "alta" | "media" | "baixa" | "critica" | "intensa"
  status: "aberta" | "investigando" | "resolvida" | "arquivada"
  data: string
}

interface RivalidadeData {
  titulo: string
  nivel: string
  motivo: string
  ocorrencias: string
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const SUMMARY_CARDS: SummaryCardData[] = [
  { title: "Total Ocorrências", value: "42", trend: "+12%",  direction: "up",   positive: true },
  { title: "Rivalidades Ativas", value: "12", trend: "+3",    direction: "up",   positive: false },
  { title: "Moradores",          value: "156", trend: "+8",   direction: "up",   positive: true },
  { title: "Apartamentos",       value: "80", trend: "0",     direction: "neutral", positive: null },
]

const OCORRENCIAS: OcorrenciaRow[] = [
  { titulo: "Festa alta às 2h",       categoria: "barulho",  apartamento: "42", gravidade: "alta",    status: "aberta",       data: "hoje" },
  { titulo: "Briga na vaga de garagem", categoria: "briga",  apartamento: "15", gravidade: "critica", status: "investigando", data: "ontem" },
  { titulo: "Obra sem licença",        categoria: "obra",    apartamento: "23", gravidade: "media",   status: "aberta",       data: "2 dias" },
  { titulo: "Animal solto no corredor", categoria: "animal", apartamento: "07", gravidade: "baixa",   status: "resolvida",    data: "3 dias" },
  { titulo: "Fofoca sobre o síndico",  categoria: "outra",   apartamento: "31", gravidade: "intensa", status: "aberta",       data: "5 dias" },
]

const RIVALIDADES: RivalidadeData[] = [
  { titulo: "Apto 42 vs Apto 15",  nivel: "Bélico",  motivo: "Vaga de garagem",       ocorrencias: "5 ocorrências este mês" },
  { titulo: "Bloco A vs Bloco B",  nivel: "Intenso", motivo: "Barulho noturno",       ocorrencias: "12 reclamações" },
]

/* ------------------------------------------------------------------ */
/*  Color helpers                                                      */
/* ------------------------------------------------------------------ */

const GRAVIDADE_COLORS: Record<string, string> = {
  alta:    "bg-red-100 text-red-800",
  media:   "bg-yellow-100 text-yellow-800",
  baixa:   "bg-green-100 text-green-800",
  critica: "bg-rose-100 text-rose-800",
  intensa: "bg-purple-100 text-purple-800",
}

const STATUS_COLORS: Record<string, string> = {
  aberta:       "bg-blue-100 text-blue-800",
  investigando: "bg-orange-100 text-orange-800",
  resolvida:    "bg-green-100 text-green-800",
  arquivada:    "bg-gray-100 text-gray-800",
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function TrendIcon({ direction, positive }: { direction: string; positive: boolean | null }) {
  if (direction === "neutral") return <Minus className="size-4 text-slate-400" />

  const color = positive ? "text-emerald-600" : "text-red-500"
  const Icon = direction === "up" ? TrendingUp : TrendingDown
  return <Icon className={`size-4 ${color}`} />
}

function Badge({ text, colorClass }: { text: string; colorClass: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
    >
      {text}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function SummaryCards({ cards }: { cards: SummaryCardData[] }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {card.title}
            </CardTitle>
            <TrendIcon direction={card.direction} positive={card.positive} />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">{card.value}</p>
            <p
              className={`mt-1 text-xs ${
                card.positive === null
                  ? "text-slate-400"
                  : card.positive
                    ? "text-emerald-600"
                    : "text-red-500"
              }`}
            >
              {card.direction === "up" && "↑ "}
              {card.direction === "down" && "↓ "}
              {card.trend}
              {card.positive === null ? "" : card.positive ? " vs mês passado" : " este mês"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function RecentOcorrencias() {
  return (
    <section>
      <h2 className="mt-8 mb-4 text-lg font-semibold text-slate-900">
        Ocorrências Recentes
      </h2>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-3">Título</th>
                  <th className="px-6 py-3">Categoria</th>
                  <th className="px-6 py-3">Apartamento</th>
                  <th className="px-6 py-3">Gravidade</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {OCORRENCIAS.map((ocorrencia) => (
                  <tr key={ocorrencia.titulo} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {ocorrencia.titulo}
                    </td>
                    <td className="px-6 py-4 capitalize text-slate-600">
                      {ocorrencia.categoria}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {ocorrencia.apartamento}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        text={ocorrencia.gravidade}
                        colorClass={GRAVIDADE_COLORS[ocorrencia.gravidade] ?? ""}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        text={ocorrencia.status}
                        colorClass={STATUS_COLORS[ocorrencia.status] ?? ""}
                      />
                    </td>
                    <td className="px-6 py-4 text-slate-600">{ocorrencia.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

function RivalidadesSection() {
  return (
    <section>
      <h2 className="mt-8 mb-4 text-lg font-semibold text-slate-900">
        🔥 Rivalidades Quentes
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {RIVALIDADES.map((rivalidade) => (
          <Card key={rivalidade.titulo}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-base font-semibold text-slate-900">
                  {rivalidade.titulo}
                </CardTitle>
                <p className="mt-1 text-sm text-slate-500">
                  Nível: {rivalidade.nivel}
                </p>
              </div>
              <Flame className="size-5 text-red-400 shrink-0" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700">{rivalidade.motivo}</p>
              <p className="mt-1 text-xs text-slate-500">{rivalidade.ocorrencias}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-600">Bem-vindo ao CondoCombat</p>

      <SummaryCards cards={SUMMARY_CARDS} />
      <RecentOcorrencias />
      <RivalidadesSection />
    </div>
  )
}
