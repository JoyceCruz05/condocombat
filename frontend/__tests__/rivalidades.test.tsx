import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

// ── Mocks ──────────────────────────────────────────────────────────────

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  use: vi.fn(),
}))

// ── Imports ────────────────────────────────────────────────────────────

import {
  RIVALIDADES_MOCK,
  getIntensidadeLabel,
  getStatusRivalidade,
  getRivalidadesPorApartamento,
  getOcorrenciasDaRivalidade,
} from "@/lib/mock-rivalidades"
import { OCORRENCIAS_MOCK } from "@/lib/types"
import { RivalidadeCard } from "@/components/Rivalidades/RivalidadeCard"
import { RivalidadeDetail } from "@/components/Rivalidades/RivalidadeDetail"

// ── Mock data integrity ────────────────────────────────────────────────

describe("RIVALIDADES_MOCK", () => {
  it("has 8 rivalidades", () => {
    expect(RIVALIDADES_MOCK).toHaveLength(8)
  })

  it("each rivalidade has required fields", () => {
    for (const r of RIVALIDADES_MOCK) {
      expect(r).toHaveProperty("id")
      expect(r).toHaveProperty("apartamentoA")
      expect(r).toHaveProperty("apartamentoB")
      expect(r).toHaveProperty("blocoA")
      expect(r).toHaveProperty("blocoB")
      expect(r).toHaveProperty("intensidade")
      expect(r).toHaveProperty("motivo")
      expect(r).toHaveProperty("status")
      expect(r).toHaveProperty("ocorrencias_relacionadas")
    }
  })

  it("intensidade is always 1-5", () => {
    for (const r of RIVALIDADES_MOCK) {
      expect(r.intensidade).toBeGreaterThanOrEqual(1)
      expect(r.intensidade).toBeLessThanOrEqual(5)
    }
  })

  it("status is always valid", () => {
    const valid = ["ativa", "resolvida", "escalada"]
    for (const r of RIVALIDADES_MOCK) {
      expect(valid).toContain(r.status)
    }
  })

  it("has at least one ativa, resolvida, escalada", () => {
    const statuses = RIVALIDADES_MOCK.map((r) => r.status)
    expect(statuses).toContain("ativa")
    expect(statuses).toContain("resolvida")
    expect(statuses).toContain("escalada")
  })

  it("has at least one of each intensity level", () => {
    const levels = RIVALIDADES_MOCK.map((r) => r.intensidade)
    for (const lvl of [1, 2, 3, 4, 5]) {
      expect(levels).toContain(lvl)
    }
  })

  it("no two rivalidades have the same id", () => {
    const ids = RIVALIDADES_MOCK.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

// ── Utility functions ──────────────────────────────────────────────────

describe("getIntensidadeLabel", () => {
  it('returns "Fofoca" for level 1', () => {
    expect(getIntensidadeLabel(1)).toBe("Fofoca")
  })
  it('returns "Desavença" for level 2', () => {
    expect(getIntensidadeLabel(2)).toBe("Desavença")
  })
  it('returns "Treta" for level 3', () => {
    expect(getIntensidadeLabel(3)).toBe("Treta")
  })
  it('returns "Rivalidade" for level 4', () => {
    expect(getIntensidadeLabel(4)).toBe("Rivalidade")
  })
  it('returns "Guerra" for level 5', () => {
    expect(getIntensidadeLabel(5)).toBe("Guerra")
  })
  it('returns "Desconhecida" for unknown level', () => {
    expect(getIntensidadeLabel(0)).toBe("Desconhecida")
    expect(getIntensidadeLabel(6)).toBe("Desconhecida")
  })
})

describe("getStatusRivalidade", () => {
  it('returns "Ativa" for ativa', () => {
    expect(getStatusRivalidade("ativa")).toBe("Ativa")
  })
  it('returns "Resolvida" for resolvida', () => {
    expect(getStatusRivalidade("resolvida")).toBe("Resolvida")
  })
  it('returns "Escalada" for escalada', () => {
    expect(getStatusRivalidade("escalada")).toBe("Escalada")
  })
  it("returns same text for unknown status", () => {
    expect(getStatusRivalidade("desconhecido")).toBe("desconhecido")
  })
})

describe("getRivalidadesPorApartamento", () => {
  it("finds rivalidades involving an apartment", () => {
    const result = getRivalidadesPorApartamento(RIVALIDADES_MOCK, "301")
    expect(result.length).toBeGreaterThanOrEqual(1)
    // 301 is in rivalidade id=2 (as parteB) and id=8 (as parteB)
    for (const r of result) {
      expect(
        r.apartamentoA === "301" || r.apartamentoB === "301",
      ).toBe(true)
    }
  })

  it("returns empty array when no rivalidades involve the apartment", () => {
    const result = getRivalidadesPorApartamento(RIVALIDADES_MOCK, "999")
    expect(result).toHaveLength(0)
  })
})

describe("getOcorrenciasDaRivalidade", () => {
  it("finds related ocorrencias by id", () => {
    const rivalidade = RIVALIDADES_MOCK.find((r) => r.id === 1)
    expect(rivalidade).toBeDefined()
    if (rivalidade) {
      const ocorrencias = getOcorrenciasDaRivalidade(
        rivalidade,
        OCORRENCIAS_MOCK,
      )
      expect(ocorrencias.length).toBeGreaterThanOrEqual(1)
      for (const o of ocorrencias) {
        expect(rivalidade.ocorrencias_relacionadas).toContain(o.id)
      }
    }
  })

  it("returns empty for rivalidade with no related ocorrencias", () => {
    const rivalidade = RIVALIDADES_MOCK.find((r) => r.id === 8)
    expect(rivalidade).toBeDefined()
    if (rivalidade) {
      const ocorrencias = getOcorrenciasDaRivalidade(
        rivalidade,
        OCORRENCIAS_MOCK,
      )
      expect(ocorrencias).toHaveLength(0)
    }
  })
})

// ── RivalidadeCard ─────────────────────────────────────────────────────

describe("RivalidadeCard", () => {
  const rivalidade = RIVALIDADES_MOCK[0]!

  it("renders apartment names in VS format", () => {
    render(<RivalidadeCard rivalidade={rivalidade} />)
    expect(screen.getByText(/A101 vs A201/)).toBeDefined()
  })

  it("renders motivo text", () => {
    render(<RivalidadeCard rivalidade={rivalidade} />)
    expect(screen.getByText(/barulho/i)).toBeDefined()
  })

  it("renders status badge", () => {
    render(<RivalidadeCard rivalidade={rivalidade} />)
    expect(screen.getByText("Ativa")).toBeDefined()
  })

  it("renders intensidade label with level", () => {
    render(<RivalidadeCard rivalidade={rivalidade} />)
    expect(screen.getByText(/Rivalidade 4\/5/)).toBeDefined()
  })

  it("renders escalada status badge correctly", () => {
    const escalada = RIVALIDADES_MOCK.find((r) => r.status === "escalada")!
    render(<RivalidadeCard rivalidade={escalada} />)
    expect(screen.getByText("Escalada")).toBeDefined()
  })

  it("renders resolvida status badge correctly", () => {
    const resolvida = RIVALIDADES_MOCK.find((r) => r.status === "resolvida")!
    const { unmount } = render(<RivalidadeCard rivalidade={resolvida} />)
    expect(screen.getByText("Resolvida")).toBeDefined()
    unmount()
  })

  it("links to detail page", () => {
    render(<RivalidadeCard rivalidade={rivalidade} />)
    const link = screen.getByRole("link")
    expect(link.getAttribute("href")).toBe("/rivalidades/1")
  })

  it("renders intensity level 1 as Fofoca", () => {
    const fofoca = RIVALIDADES_MOCK.find((r) => r.intensidade === 1)!
    render(<RivalidadeCard rivalidade={fofoca} />)
    expect(screen.getByText(/Fofoca 1\/5/)).toBeDefined()
  })
})

// ── RivalidadeDetail ──────────────────────────────────────────────────

describe("RivalidadeDetail", () => {
  const rivalidade = RIVALIDADES_MOCK[0]!
  const ocorrencias = OCORRENCIAS_MOCK.filter((o) =>
    rivalidade.ocorrencias_relacionadas.includes(o.id),
  )

  it("renders apartment conflict title", () => {
    render(
      <RivalidadeDetail
        rivalidade={rivalidade}
        ocorrencias={ocorrencias}
      />,
    )
    expect(screen.getByText(/A101 vs A201/)).toBeDefined()
  })

  it("renders motivo text", () => {
    render(
      <RivalidadeDetail
        rivalidade={rivalidade}
        ocorrencias={ocorrencias}
      />,
    )
    expect(screen.getByText(/barulho/i)).toBeDefined()
  })

  it("renders status badge", () => {
    render(
      <RivalidadeDetail
        rivalidade={rivalidade}
        ocorrencias={ocorrencias}
      />,
    )
    expect(screen.getByText("Ativa")).toBeDefined()
  })

  it("renders intensidade label", () => {
    render(
      <RivalidadeDetail
        rivalidade={rivalidade}
        ocorrencias={ocorrencias}
      />,
    )
    expect(screen.getByText(/Rivalidade — 4\/5/)).toBeDefined()
  })

  it("renders ocorrencias section header", () => {
    render(
      <RivalidadeDetail
        rivalidade={rivalidade}
        ocorrencias={ocorrencias}
      />,
    )
    expect(screen.getByText("Ocorrências Relacionadas")).toBeDefined()
  })

  it("shows 'Nenhuma ocorrência' when empty", () => {
    const rivalidadeSemOcorrencias = RIVALIDADES_MOCK.find((r) => r.id === 8)!
    render(
      <RivalidadeDetail
        rivalidade={rivalidadeSemOcorrencias}
        ocorrencias={[]}
      />,
    )
    expect(
      screen.getByText("Nenhuma ocorrência relacionada."),
    ).toBeDefined()
  })

  it("renders table headers when ocorrencias exist", () => {
    render(
      <RivalidadeDetail
        rivalidade={rivalidade}
        ocorrencias={ocorrencias}
      />,
    )
    expect(screen.getByText("Título")).toBeDefined()
    expect(screen.getByText("Gravidade")).toBeDefined()
    expect(screen.getByText("Status")).toBeDefined()
    expect(screen.getByText("Data")).toBeDefined()
  })

  it("renders each ocorrencia titulo", () => {
    render(
      <RivalidadeDetail
        rivalidade={rivalidade}
        ocorrencias={ocorrencias}
      />,
    )
    for (const o of ocorrencias) {
      expect(screen.getByText(o.titulo)).toBeDefined()
    }
  })
})
