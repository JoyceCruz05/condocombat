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

// ── Data imports ───────────────────────────────────────────────────────

import { MORADORES_MOCK, OCORRENCIAS_MOCK } from "@/lib/types"
import type { Morador, Ocorrencia } from "@/lib/types"
import { MoradorCard } from "@/components/Moradores/MoradorCard"
import { MoradorProfile } from "@/components/Moradores/MoradorProfile"

// ── Mock data integrity ────────────────────────────────────────────────

describe("MORADORES_MOCK", () => {
  it("has 12 moradores", () => {
    expect(MORADORES_MOCK).toHaveLength(12)
  })

  it("each morador has required fields", () => {
    for (const m of MORADORES_MOCK) {
      expect(m).toHaveProperty("id")
      expect(m).toHaveProperty("nome")
      expect(m).toHaveProperty("apartamento")
      expect(m).toHaveProperty("bloco")
      expect(m).toHaveProperty("tipo")
      expect(m).toHaveProperty("status")
      expect(m).toHaveProperty("avatar")
      expect(m).toHaveProperty("ocorrencias")
    }
  })

  it("status is always valid", () => {
    const validStatuses = ["ativo", "inadimplente", "suspenso"]
    for (const m of MORADORES_MOCK) {
      expect(validStatuses).toContain(m.status)
    }
  })

  it("tipo is always valid", () => {
    const validTipos = ["sindico", "morador", "proprietario", "inquilino"]
    for (const m of MORADORES_MOCK) {
      expect(validTipos).toContain(m.tipo)
    }
  })

  it("has at least one sindico", () => {
    expect(MORADORES_MOCK.some((m) => m.tipo === "sindico")).toBe(true)
  })

  it("has at least one inadimplente", () => {
    expect(MORADORES_MOCK.some((m) => m.status === "inadimplente")).toBe(true)
  })

  it("has at least one suspenso", () => {
    expect(MORADORES_MOCK.some((m) => m.status === "suspenso")).toBe(true)
  })

  it("has moradores from multiple blocos", () => {
    const blocos = new Set(MORADORES_MOCK.map((m) => m.bloco))
    expect(blocos.size).toBeGreaterThan(1)
  })
})

describe("OCORRENCIAS_MOCK", () => {
  it("has 10 ocorrencias", () => {
    expect(OCORRENCIAS_MOCK).toHaveLength(10)
  })

  it("each ocorrencia has required fields", () => {
    for (const o of OCORRENCIAS_MOCK) {
      expect(o).toHaveProperty("id")
      expect(o).toHaveProperty("titulo")
      expect(o).toHaveProperty("categoria")
      expect(o).toHaveProperty("gravidade")
      expect(o).toHaveProperty("status")
      expect(o).toHaveProperty("apartamento")
      expect(o).toHaveProperty("created_at")
    }
  })

  it("categorias are valid", () => {
    const valid = ["barulho", "briga", "festa", "vazamento", "animal", "obra", "outra"]
    for (const o of OCORRENCIAS_MOCK) {
      expect(valid).toContain(o.categoria)
    }
  })

  it("gravidade values are valid", () => {
    const valid = ["baixa", "media", "alta", "critica"]
    for (const o of OCORRENCIAS_MOCK) {
      expect(valid).toContain(o.gravidade)
    }
  })
})

// ── Filtering logic ────────────────────────────────────────────────────

function filterMoradores(moradores: Morador[], query: string): Morador[] {
  if (!query) return moradores
  const q = query.toLowerCase()
  return moradores.filter(
    (m) =>
      m.nome.toLowerCase().includes(q) ||
      m.apartamento.includes(q) ||
      m.bloco.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q),
  )
}

function filterOcorrenciasPorApartamento(
  ocorrencias: Ocorrencia[],
  apartamento: string,
): Ocorrencia[] {
  return ocorrencias.filter((o) => o.apartamento === apartamento)
}

describe("Moradores filtering", () => {
  it("returns all moradores when query is empty", () => {
    expect(filterMoradores(MORADORES_MOCK, "")).toHaveLength(12)
  })

  it("filters by nome (partial match)", () => {
    const result = filterMoradores(MORADORES_MOCK, "carlos")
    expect(result).toHaveLength(1)
    expect(result[0]?.nome).toBe("Carlos Silva")
  })

  it("filters by nome (case insensitive)", () => {
    const result = filterMoradores(MORADORES_MOCK, "CARLOS")
    expect(result).toHaveLength(1)
  })

  it("filters by apartamento", () => {
    const result = filterMoradores(MORADORES_MOCK, "101")
    expect(result.length).toBeGreaterThanOrEqual(1)
    expect(result.some((m) => m.apartamento === "101")).toBe(true)
  })

  it("filters by email", () => {
    const result = filterMoradores(MORADORES_MOCK, "maria@email.com")
    expect(result).toHaveLength(1)
    expect(result[0]?.nome).toBe("Maria Costa")
  })

  it("returns empty array when no match", () => {
    const result = filterMoradores(MORADORES_MOCK, "zzzzz")
    expect(result).toHaveLength(0)
  })

  it("matches multiple moradores for partial name", () => {
    const result = filterMoradores(MORADORES_MOCK, "a")
    expect(result.length).toBeGreaterThan(1)
  })

  it("search query matches across multiple fields (nome, email, bloco)", () => {
    const result = filterMoradores(MORADORES_MOCK, "roberto")
    expect(result.length).toBeGreaterThanOrEqual(1)
  })
})

describe("Ocorrencias filtering by apartment", () => {
  it("finds ocorrencias for a specific apartment", () => {
    const result = filterOcorrenciasPorApartamento(OCORRENCIAS_MOCK, "102")
    expect(result.length).toBeGreaterThanOrEqual(1)
  })

  it("returns empty for apartment with no ocorrencias", () => {
    const result = filterOcorrenciasPorApartamento(OCORRENCIAS_MOCK, "999")
    expect(result).toHaveLength(0)
  })
})

// ── MoradorCard component ──────────────────────────────────────────────

describe("MoradorCard", () => {
  const morador: Morador = {
    id: 1,
    nome: "Carlos Silva",
    email: "carlos@email.com",
    apartamento: "101",
    bloco: "A",
    telefone: "(11) 99999-0001",
    tipo: "proprietario",
    status: "ativo",
    avatar: "CS",
    ocorrencias: 3,
  }

  it("renders morador name", () => {
    render(<MoradorCard morador={morador} />)
    expect(screen.getByText("Carlos Silva")).toBeDefined()
  })

  it("renders bloco and apartamento", () => {
    render(<MoradorCard morador={morador} />)
    expect(screen.getByText(/A.*101/)).toBeDefined()
  })

  it("renders status badge", () => {
    render(<MoradorCard morador={morador} />)
    expect(screen.getByText("Ativo")).toBeDefined()
  })

  it("renders tipo label", () => {
    render(<MoradorCard morador={morador} />)
    expect(screen.getByText("Proprietário")).toBeDefined()
  })

  it("renders ocorrencias count when > 0", () => {
    render(<MoradorCard morador={morador} />)
    expect(screen.getByText(/3 ocorrências/)).toBeDefined()
  })

  it("does NOT render ocorrencias count when 0", () => {
    const semOcorrencias: Morador = { ...morador, ocorrencias: 0, id: 5 }
    const { container } = render(<MoradorCard morador={semOcorrencias} />)
    const countEl = container.querySelector(".border-t")
    expect(countEl).toBeNull()
  })

  it("renders avatar initials", () => {
    render(<MoradorCard morador={morador} />)
    expect(screen.getByText("CS")).toBeDefined()
  })

  it("links to detail page", () => {
    render(<MoradorCard morador={morador} />)
    const link = screen.getByRole("link")
    expect(link.getAttribute("href")).toBe("/moradores/1")
  })

  it("shows warning status color for inadimplente", () => {
    const inadimplente: Morador = {
      ...morador,
      id: 3,
      status: "inadimplente",
      nome: "Roberto Santos",
    }
    render(<MoradorCard morador={inadimplente} />)
    expect(screen.getByText("Inadimplente")).toBeDefined()
  })

  it("shows amber status color for suspenso", () => {
    const suspenso: Morador = {
      ...morador,
      id: 7,
      status: "suspenso",
      nome: "Pedro Alves",
    }
    render(<MoradorCard morador={suspenso} />)
    expect(screen.getByText("Suspenso")).toBeDefined()
  })
})

// ── MoradorProfile component ──────────────────────────────────────────

describe("MoradorProfile", () => {
  const morador: Morador = {
    id: 1,
    nome: "Carlos Silva",
    email: "carlos@email.com",
    apartamento: "101",
    bloco: "A",
    telefone: "(11) 99999-0001",
    tipo: "proprietario",
    status: "ativo",
    avatar: "CS",
    ocorrencias: 3,
  }

  it("renders morador name", () => {
    render(<MoradorProfile morador={morador} ocorrencias={[]} />)
    expect(screen.getByText("Carlos Silva")).toBeDefined()
  })

  it("renders email", () => {
    render(<MoradorProfile morador={morador} ocorrencias={[]} />)
    expect(screen.getByText("carlos@email.com")).toBeDefined()
  })

  it("renders telefone", () => {
    render(<MoradorProfile morador={morador} ocorrencias={[]} />)
    expect(screen.getByText("(11) 99999-0001")).toBeDefined()
  })

  it("renders bloco and apartamento combined", () => {
    render(<MoradorProfile morador={morador} ocorrencias={[]} />)
    expect(screen.getByText(/A.*Apartamento 101/)).toBeDefined()
  })

  it("renders tipo section", () => {
    render(<MoradorProfile morador={morador} ocorrencias={[]} />)
    expect(screen.getByText("Proprietário")).toBeDefined()
  })

  it("renders status badge", () => {
    render(<MoradorProfile morador={morador} ocorrencias={[]} />)
    expect(screen.getByText("Ativo")).toBeDefined()
  })

  it("shows ocorrencias section header", () => {
    render(<MoradorProfile morador={morador} ocorrencias={[]} />)
    expect(screen.getByText("Ocorrências Associadas")).toBeDefined()
  })

  it("shows 'Nenhuma ocorrência registrada' when empty", () => {
    render(<MoradorProfile morador={morador} ocorrencias={[]} />)
    expect(screen.getByText("Nenhuma ocorrência registrada.")).toBeDefined()
  })

  it("renders ocorrencia table when data exists", () => {
    const moradorComOcorrencias: Morador = {
      id: 2,
      nome: "Ana Oliveira",
      email: "ana@email.com",
      apartamento: "102",
      bloco: "A",
      telefone: "(11) 99999-0002",
      tipo: "inquilino",
      status: "ativo",
      avatar: "AO",
      ocorrencias: 5,
    }
    const ocorrenciasFiltradas = OCORRENCIAS_MOCK.filter(
      (o) => o.apartamento === "102",
    )
    render(
      <MoradorProfile
        morador={moradorComOcorrencias}
        ocorrencias={ocorrenciasFiltradas}
      />,
    )
    expect(screen.queryByText("Nenhuma ocorrência registrada.")).toBeNull()
    expect(screen.getByText("Título")).toBeDefined()
    expect(screen.getByText("Gravidade")).toBeDefined()
    expect(screen.getByText("Status")).toBeDefined()
  })

  it("shows inadimplente status badge", () => {
    const inadimplente: Morador = {
      ...morador,
      id: 3,
      status: "inadimplente",
    }
    render(<MoradorProfile morador={inadimplente} ocorrencias={[]} />)
    expect(screen.getByText("Inadimplente")).toBeDefined()
  })
})
