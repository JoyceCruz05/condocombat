export interface Morador {
  id: number
  nome: string
  email: string
  apartamento: string
  bloco: string
  telefone: string
  tipo: "sindico" | "morador" | "proprietario" | "inquilino"
  status: "ativo" | "inadimplente" | "suspenso"
  avatar: string
  ocorrencias: number
}

export interface Ocorrencia {
  id: number
  titulo: string
  descricao: string
  categoria: string
  gravidade: "baixa" | "media" | "alta" | "critica"
  status: "aberta" | "investigando" | "resolvida" | "arquivada"
  apartamento: string
  bloco: string
  created_at: string
  updated_at: string
}

export const MORADORES_MOCK: Morador[] = [
  { id: 1, nome: "Carlos Silva", email: "carlos@email.com", apartamento: "101", bloco: "A", telefone: "(11) 99999-0001", tipo: "proprietario", status: "ativo", avatar: "CS", ocorrencias: 3 },
  { id: 2, nome: "Ana Oliveira", email: "ana@email.com", apartamento: "102", bloco: "A", telefone: "(11) 99999-0002", tipo: "inquilino", status: "ativo", avatar: "AO", ocorrencias: 5 },
  { id: 3, nome: "Roberto Santos", email: "roberto@email.com", apartamento: "103", bloco: "A", telefone: "(11) 99999-0003", tipo: "proprietario", status: "inadimplente", avatar: "RS", ocorrencias: 1 },
  { id: 4, nome: "Maria Costa", email: "maria@email.com", apartamento: "201", bloco: "A", telefone: "(11) 99999-0004", tipo: "morador", status: "ativo", avatar: "MC", ocorrencias: 7 },
  { id: 5, nome: "João Pereira", email: "joao@email.com", apartamento: "202", bloco: "A", telefone: "(11) 99999-0005", tipo: "sindico", status: "ativo", avatar: "JP", ocorrencias: 0 },
  { id: 6, nome: "Fernanda Lima", email: "fernanda@email.com", apartamento: "203", bloco: "A", telefone: "(11) 99999-0006", tipo: "proprietario", status: "ativo", avatar: "FL", ocorrencias: 2 },
  { id: 7, nome: "Pedro Alves", email: "pedro@email.com", apartamento: "103", bloco: "A", telefone: "(11) 99999-0007", tipo: "inquilino", status: "suspenso", avatar: "PA", ocorrencias: 4 },
  { id: 8, nome: "Lucia Mendes", email: "lucia@email.com", apartamento: "301", bloco: "B", telefone: "(11) 99999-0008", tipo: "proprietario", status: "ativo", avatar: "LM", ocorrencias: 1 },
  { id: 9, nome: "Rafael Souza", email: "rafael@email.com", apartamento: "302", bloco: "B", telefone: "(11) 99999-0009", tipo: "morador", status: "ativo", avatar: "RS", ocorrencias: 6 },
  { id: 10, nome: "Juliana Costa", email: "juliana@email.com", apartamento: "401", bloco: "B", telefone: "(11) 99999-0010", tipo: "proprietario", status: "inadimplente", avatar: "JC", ocorrencias: 2 },
  { id: 11, nome: "Thiago Nunes", email: "thiago@email.com", apartamento: "502", bloco: "B", telefone: "(11) 99999-0011", tipo: "inquilino", status: "ativo", avatar: "TN", ocorrencias: 0 },
  { id: 12, nome: "Amanda Ribeiro", email: "amanda@email.com", apartamento: "703", bloco: "A", telefone: "(11) 99999-0012", tipo: "proprietario", status: "ativo", avatar: "AR", ocorrencias: 3 },
]

export const OCORRENCIAS_MOCK: Ocorrencia[] = [
  { id: 1, titulo: "Festa alta às 2h", descricao: "Reclamação de barulho excessivo durante a madrugada.", categoria: "festa", gravidade: "alta", status: "aberta", apartamento: "101", bloco: "A", created_at: "2026-05-28T23:00:00Z", updated_at: "2026-05-28T23:00:00Z" },
  { id: 2, titulo: "Barulho de reforma", descricao: "Obra com furadeira antes das 8h.", categoria: "barulho", gravidade: "media", status: "aberta", apartamento: "502", bloco: "B", created_at: "2026-05-29T08:00:00Z", updated_at: "2026-05-29T08:00:00Z" },
  { id: 3, titulo: "Vazamento no teto", descricao: "Água escorrendo do apartamento de cima.", categoria: "vazamento", gravidade: "critica", status: "investigando", apartamento: "202", bloco: "A", created_at: "2026-05-27T14:30:00Z", updated_at: "2026-05-28T10:00:00Z" },
  { id: 4, titulo: "Discussão na garagem", descricao: "Moradores discutindo por causa de vaga.", categoria: "briga", gravidade: "alta", status: "aberta", apartamento: "201", bloco: "A", created_at: "2026-05-30T19:00:00Z", updated_at: "2026-05-30T19:00:00Z" },
  { id: 5, titulo: "Festa com som alto até 4h", descricao: "Música alta impedindo o sono dos vizinhos.", categoria: "festa", gravidade: "media", status: "aberta", apartamento: "203", bloco: "A", created_at: "2026-05-26T02:00:00Z", updated_at: "2026-05-26T02:00:00Z" },
  { id: 6, titulo: "Cachorro latindo o dia todo", descricao: "Animal sozinho no apto latindo sem parar.", categoria: "animal", gravidade: "baixa", status: "resolvida", apartamento: "105", bloco: "A", created_at: "2026-05-25T09:00:00Z", updated_at: "2026-05-26T18:00:00Z" },
  { id: 7, titulo: "Animal solto no corredor", descricao: "Cachorro circulando solto no hall do 3o andar.", categoria: "animal", gravidade: "media", status: "aberta", apartamento: "301", bloco: "B", created_at: "2026-05-28T14:00:00Z", updated_at: "2026-05-28T14:00:00Z" },
  { id: 8, titulo: "Obra sem licença", descricao: "Reforma estrutural sem autorização do condomínio.", categoria: "obra", gravidade: "media", status: "investigando", apartamento: "401", bloco: "B", created_at: "2026-05-29T09:00:00Z", updated_at: "2026-05-30T11:00:00Z" },
  { id: 9, titulo: "Ameaça entre vizinhos", descricao: "Discussão acalorada com ameaças verbais na área comum.", categoria: "briga", gravidade: "critica", status: "aberta", apartamento: "501", bloco: "B", created_at: "2026-05-31T18:45:00Z", updated_at: "2026-05-31T18:50:00Z" },
  { id: 10, titulo: "Vaga de garagem ocupada por visitante", descricao: "Visitante estacionou na vaga de morador sem autorização.", categoria: "outra", gravidade: "baixa", status: "resolvida", apartamento: "102", bloco: "A", created_at: "2026-05-24T20:00:00Z", updated_at: "2026-05-24T22:00:00Z" },
]
