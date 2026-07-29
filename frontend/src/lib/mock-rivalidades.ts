import type { Ocorrencia } from "./types"

export interface Rivalidade {
  id: number
  apartamentoA: string
  blocoA: string
  apartamentoB: string
  blocoB: string
  intensidade: 1 | 2 | 3 | 4 | 5
  motivo: string
  status: "ativa" | "resolvida" | "escalada"
  ultima_ocorrencia: string
  ocorrencias_relacionadas: number[]
}

export const RIVALIDADES_MOCK: Rivalidade[] = [
  {
    id: 1,
    apartamentoA: "101",
    blocoA: "A",
    apartamentoB: "201",
    blocoB: "A",
    intensidade: 4,
    motivo: "barulho",
    status: "ativa",
    ultima_ocorrencia: "2026-05-30T22:30:00Z",
    ocorrencias_relacionadas: [1, 4],
  },
  {
    id: 2,
    apartamentoA: "301",
    blocoA: "B",
    apartamentoB: "302",
    blocoB: "B",
    intensidade: 5,
    motivo: "animal",
    status: "escalada",
    ultima_ocorrencia: "2026-05-28T14:00:00Z",
    ocorrencias_relacionadas: [7],
  },
  {
    id: 3,
    apartamentoA: "102",
    blocoA: "A",
    apartamentoB: "103",
    blocoB: "A",
    intensidade: 3,
    motivo: "vaga de garagem",
    status: "ativa",
    ultima_ocorrencia: "2026-05-25T09:15:00Z",
    ocorrencias_relacionadas: [10],
  },
  {
    id: 4,
    apartamentoA: "202",
    blocoA: "A",
    apartamentoB: "203",
    blocoB: "A",
    intensidade: 2,
    motivo: "festa",
    status: "resolvida",
    ultima_ocorrencia: "2026-05-20T23:00:00Z",
    ocorrencias_relacionadas: [5],
  },
  {
    id: 5,
    apartamentoA: "401",
    blocoA: "B",
    apartamentoB: "402",
    blocoB: "B",
    intensidade: 4,
    motivo: "reforma",
    status: "ativa",
    ultima_ocorrencia: "2026-05-29T08:00:00Z",
    ocorrencias_relacionadas: [8],
  },
  {
    id: 6,
    apartamentoA: "501",
    blocoA: "B",
    apartamentoB: "502",
    blocoB: "B",
    intensidade: 5,
    motivo: "briga",
    status: "ativa",
    ultima_ocorrencia: "2026-05-31T18:45:00Z",
    ocorrencias_relacionadas: [9],
  },
  {
    id: 7,
    apartamentoA: "103",
    blocoA: "A",
    apartamentoB: "105",
    blocoB: "A",
    intensidade: 3,
    motivo: "vazamento",
    status: "resolvida",
    ultima_ocorrencia: "2026-05-15T10:30:00Z",
    ocorrencias_relacionadas: [6],
  },
  {
    id: 8,
    apartamentoA: "703",
    blocoA: "A",
    apartamentoB: "301",
    blocoB: "B",
    intensidade: 1,
    motivo: "área comum",
    status: "resolvida",
    ultima_ocorrencia: "2026-05-10T16:20:00Z",
    ocorrencias_relacionadas: [],
  },
]

export function getRivalidadesPorApartamento(
  rivalidades: Rivalidade[],
  apartamento: string,
): Rivalidade[] {
  return rivalidades.filter(
    (r) => r.apartamentoA === apartamento || r.apartamentoB === apartamento,
  )
}

export function getOcorrenciasDaRivalidade(
  rivalidade: Rivalidade,
  todasOcorrencias: Ocorrencia[],
): Ocorrencia[] {
  return todasOcorrencias.filter((o) =>
    rivalidade.ocorrencias_relacionadas.includes(o.id),
  )
}

const INTENSIDADE_LABELS: Record<number, string> = {
  1: "Fofoca",
  2: "Desavença",
  3: "Treta",
  4: "Rivalidade",
  5: "Guerra",
}

export function getIntensidadeLabel(nivel: number): string {
  return INTENSIDADE_LABELS[nivel] ?? "Desconhecida"
}

const STATUS_LABELS: Record<string, string> = {
  ativa: "Ativa",
  resolvida: "Resolvida",
  escalada: "Escalada",
}

export function getStatusRivalidade(status: string): string {
  return STATUS_LABELS[status] ?? status
}
