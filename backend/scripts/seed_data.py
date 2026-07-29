"""Dados satíricos para seed do CondoCombat."""

from typing import Any

# ── Condomínios ────────────────────────────────────────────────────────

CONDOMINIOS: list[dict[str, Any]] = [
    {
        "nome": "Residencial Fofoca Feliz",
        "endereco": "Rua das Fuxicadas, 42 — Bairro do Mexerico",
        "cnpj": "12.345.678/0001-90",
        "telefone": "(11) 99999-8888",
        "email": "sindico@fofocafeliz.com.br",
    },
    {
        "nome": "Condomínio Barulho da Madruga",
        "endereco": "Avenida do Pancadão, 666 — Vila do Som",
        "cnpj": "98.765.432/0001-10",
        "telefone": "(11) 97777-6666",
        "email": "sindico@barulhodamadruga.com.br",
    },
    {
        "nome": "Edifício Disputa&Guerra",
        "endereco": "Travessa da Fofoca, 171 — Centro do Caos",
        "cnpj": "11.222.333/0001-44",
        "telefone": "(11) 95555-4444",
        "email": "sindico@disputaeguerra.com.br",
    },
    {
        "nome": "Château do Encontro de Condomínio",
        "endereco": "Alameda dos Teimosos, 1000 — Jardim da Discórdia",
        "cnpj": "44.555.666/0001-77",
        "telefone": "(11) 94444-3333",
        "email": "sindico@chateauencontro.com.br",
    },
    {
        "nome": "Conjunto Residencial Quem Cala",
        "endereco": "Rua do Silêncio Obrigatório, 1 — Bairro da Paz Forçada",
        "cnpj": "77.888.999/0001-11",
        "telefone": "(11) 93333-2222",
        "email": "sindico@quemcala.org.br",
    },
]

# ── Apartamentos (5 condomínios × 5-7 aptos) ─────────────────────────

APARTAMENTOS: list[dict[str, Any]] = [
    # Residencial Fofoca Feliz (cond_id=1)
    {"numero": "101", "bloco": "A", "torre": "Principal", "condominio_idx": 0},
    {"numero": "102", "bloco": "A", "torre": "Principal", "condominio_idx": 0},
    {"numero": "201", "bloco": "B", "torre": "Secundária", "condominio_idx": 0},
    {"numero": "202", "bloco": "B", "torre": "Secundária", "condominio_idx": 0},
    {"numero": "301", "bloco": "C", "torre": "Garagem", "condominio_idx": 0},
    # Condomínio Barulho da Madruga (cond_id=2)
    {"numero": "01", "bloco": "Norte", "torre": "Torre do Som", "condominio_idx": 1},
    {"numero": "02", "bloco": "Norte", "torre": "Torre do Som", "condominio_idx": 1},
    {"numero": "03", "bloco": "Sul", "torre": "Torre da Paz", "condominio_idx": 1},
    {"numero": "04", "bloco": "Sul", "torre": "Torre da Paz", "condominio_idx": 1},
    {"numero": "05", "bloco": "Leste", "torre": "Torre do Fundão", "condominio_idx": 1},
    {"numero": "06", "bloco": "Leste", "torre": "Torre do Fundão", "condominio_idx": 1},
    # Edifício Disputa&Guerra (cond_id=3)
    {"numero": "1A", "bloco": "Bloco dos Apontamentos", "torre": None, "condominio_idx": 2},
    {"numero": "1B", "bloco": "Bloco dos Apontamentos", "torre": None, "condominio_idx": 2},
    {"numero": "2A", "bloco": "Bloco das Disputas", "torre": None, "condominio_idx": 2},
    {"numero": "2B", "bloco": "Bloco das Disputas", "torre": None, "condominio_idx": 2},
    {"numero": "3A", "bloco": "Bloco da Trégua", "torre": None, "condominio_idx": 2},
    {"numero": "3B", "bloco": "Bloco da Trégua", "torre": None, "condominio_idx": 2},
    # Château do Encontro de Condomínio (cond_id=4)
    {"numero": "1201", "bloco": "A", "torre": "Torre dos Atritos", "condominio_idx": 3},
    {"numero": "1202", "bloco": "A", "torre": "Torre dos Atritos", "condominio_idx": 3},
    {"numero": "1301", "bloco": "A", "torre": "Torre dos Atritos", "condominio_idx": 3},
    {"numero": "1401", "bloco": "B", "torre": "Torre das Desavenças", "condominio_idx": 3},
    {"numero": "1402", "bloco": "B", "torre": "Torre das Desavenças", "condominio_idx": 3},
    {"numero": "1501", "bloco": "B", "torre": "Torre das Desavenças", "condominio_idx": 3},
    # Conjunto Residencial Quem Cala (cond_id=5)
    {"numero": "A1", "bloco": "Silêncio", "torre": None, "condominio_idx": 4},
    {"numero": "A2", "bloco": "Silêncio", "torre": None, "condominio_idx": 4},
    {"numero": "B1", "bloco": "Tolerância", "torre": None, "condominio_idx": 4},
    {"numero": "B2", "bloco": "Tolerância", "torre": None, "condominio_idx": 4},
    {"numero": "C1", "bloco": "Paciência", "torre": None, "condominio_idx": 4},
]

# ── Moradores (perfis cômicos) ───────────────────────────────────────

MORADORES: list[dict[str, Any]] = [
    # Residencial Fofoca Feliz (cond_idx=0)
    {
        "nome": "Dona Fofoqueira",
        "cpf": "111.111.111-11",
        "email": "fofoqueira@fofocafeliz.com",
        "telefone": "(11) 91111-1111",
        "tipo": "proprietario",
        "apartamento_idx": 0,
    },
    {
        "nome": "Seu Barriga",
        "cpf": "222.222.222-22",
        "email": "barriga@fofocafeliz.com",
        "telefone": "(11) 92222-2222",
        "tipo": "inquilino",
        "apartamento_idx": 0,
    },
    {
        "nome": "Maria Barulho",
        "cpf": "333.333.333-33",
        "email": "maria@fofocafeliz.com",
        "telefone": "(11) 93333-3333",
        "tipo": "proprietario",
        "apartamento_idx": 1,
    },
    {
        "nome": "João Reclamação",
        "cpf": "444.444.444-44",
        "email": "joao@fofocafeliz.com",
        "telefone": "(11) 94444-4444",
        "tipo": "sindico",
        "apartamento_idx": 2,
    },
    {
        "nome": "Tia do Andar de Cima",
        "cpf": "555.555.555-55",
        "email": "tia@fofocafeliz.com",
        "telefone": "(11) 95555-5555",
        "tipo": "proprietario",
        "apartamento_idx": 3,
    },
    # Condomínio Barulho da Madruga (cond_idx=1)
    {
        "nome": "DJ Paredão",
        "cpf": "666.666.666-66",
        "email": "dj@barulho.com",
        "telefone": "(11) 96666-6666",
        "tipo": "inquilino",
        "apartamento_idx": 5,
    },
    {
        "nome": "Madruguinha Silva",
        "cpf": "777.777.777-77",
        "email": "madruga@barulho.com",
        "telefone": "(11) 97777-7777",
        "tipo": "proprietario",
        "apartamento_idx": 6,
    },
    {
        "nome": "Seu Cochilo",
        "cpf": "888.888.888-88",
        "email": "cochilo@barulho.com",
        "telefone": "(11) 98888-8888",
        "tipo": "proprietario",
        "apartamento_idx": 7,
    },
    {
        "nome": "Dona Soneca",
        "cpf": "999.999.999-99",
        "email": "soneca@barulho.com",
        "telefone": "(11) 99999-9999",
        "tipo": "proprietario",
        "apartamento_idx": 8,
    },
    # Edifício Disputa&Guerra (cond_idx=2)
    {
        "nome": "Briguento Mendes",
        "cpf": "123.456.789-00",
        "email": "briguento@disputa.com",
        "telefone": "(11) 91234-5678",
        "tipo": "proprietario",
        "apartamento_idx": 11,
    },
    {
        "nome": "Paz & Amor Oliveira",
        "cpf": "987.654.321-00",
        "email": "paz@disputa.com",
        "telefone": "(11) 99876-5432",
        "tipo": "inquilino",
        "apartamento_idx": 12,
    },
    {
        "nome": "Advogado Chato Jr.",
        "cpf": "111.222.333-44",
        "email": "chato@disputa.com",
        "telefone": "(11) 91112-2233",
        "tipo": "proprietario",
        "apartamento_idx": 13,
    },
    {
        "nome": "Síndico Carrancudo",
        "cpf": "555.666.777-88",
        "email": "carrancudo@disputa.com",
        "telefone": "(11) 95556-6777",
        "tipo": "sindico",
        "apartamento_idx": 14,
    },
    # Château do Encontro de Condomínio
    {
        "nome": "Doutor Metido",
        "cpf": "121.121.121-11",
        "email": "drmetido@chateau.com",
        "telefone": "(11) 91212-1212",
        "tipo": "proprietario",
        "apartamento_idx": 16,
    },
    {
        "nome": "Doguinho do Doutor",
        "cpf": "131.131.131-11",
        "email": "dog@chateau.com",
        "telefone": "(11) 91313-1313",
        "tipo": "inquilino",
        "apartamento_idx": 16,
    },
    {
        "nome": "Dona Reclamação Profissional",
        "cpf": "141.141.141-11",
        "email": "reclamacao@chateau.com",
        "telefone": "(11) 91414-1414",
        "tipo": "proprietario",
        "apartamento_idx": 17,
    },
    {
        "nome": "Influencer do Condomínio",
        "cpf": "151.151.151-11",
        "email": "influencer@chateau.com",
        "telefone": "(11) 91515-1515",
        "tipo": "inquilino",
        "apartamento_idx": 18,
    },
    {
        "nome": "Seu Discurso",
        "cpf": "161.161.161-11",
        "email": "discurso@chateau.com",
        "telefone": "(11) 91616-1616",
        "tipo": "sindico",
        "apartamento_idx": 19,
    },
    {
        "nome": "Madame do Andar de Cima",
        "cpf": "171.171.171-11",
        "email": "madame@chateau.com",
        "telefone": "(11) 91717-1717",
        "tipo": "proprietario",
        "apartamento_idx": 20,
    },
    {
        "nome": "Estudante Noturno",
        "cpf": "181.181.181-11",
        "email": "noturno@quemcala.com",
        "telefone": "(11) 91818-1818",
        "tipo": "inquilino",
        "apartamento_idx": 21,
    },
    # Conjunto Quem Cala
    {
        "nome": "Fiscal de Portaria",
        "cpf": "191.191.191-11",
        "email": "fiscal@quemcala.com",
        "telefone": "(11) 91919-1919",
        "tipo": "proprietario",
        "apartamento_idx": 22,
    },
    {
        "nome": "Dona Calada",
        "cpf": "202.202.202-11",
        "email": "calada@quemcala.com",
        "telefone": "(11) 92020-2020",
        "tipo": "proprietario",
        "apartamento_idx": 23,
    },
    {
        "nome": "Padre da Paróquia",
        "cpf": "212.212.212-11",
        "email": "padre@quemcala.com",
        "telefone": "(11) 92121-2121",
        "tipo": "inquilino",
        "apartamento_idx": 24,
    },
    {
        "nome": "Vizinho Misterioso",
        "cpf": "222.222.232-11",
        "email": "misterio@quemcala.com",
        "telefone": "(11) 92222-2323",
        "tipo": "inquilino",
        "apartamento_idx": 25,
    },
    {
        "nome": "Aspirante a Síndico",
        "cpf": "232.232.232-11",
        "email": "aspirante@quemcala.com",
        "telefone": "(11) 92323-2323",
        "tipo": "proprietario",
        "apartamento_idx": 26,
    },
]

# ── Ocorrências ──────────────────────────────────────────────────────

OCORRENCIAS: list[dict[str, Any]] = [
    # Fofoca Feliz
    {
        "titulo": "Fofoca no elevador",
        "descricao": "Dona Fofoqueira foi flagrada contando que o morador do 102 está com o condomínio atrasado. Testemunhas confirmam.",
        "categoria": "outra",
        "gravidade": "media",
        "status": "aberta",
        "apartamento_idx": 0,
    },
    {
        "titulo": "Barulho ensurdecedor às 3h da manhã",
        "descricao": "Maria Barulho resolveu fazer uma festa para o gato dela. Vizinhos chamaram a polícia.",
        "categoria": "barulho",
        "gravidade": "alta",
        "status": "investigando",
        "apartamento_idx": 1,
    },
    {
        "titulo": "Briga por vaga de garagem",
        "descricao": "Seu Barriga estacionou na vaga do 201. Resultado: troca de ofensas e um retrovisor quebrado.",
        "categoria": "briga",
        "gravidade": "critica",
        "status": "aberta",
        "apartamento_idx": 0,
    },
    {
        "titulo": "Obra sem autorização",
        "descricao": "Tia do Andar de Cima resolveu quebrar a parede da sala num domingo de manhã. Marteladas ecoam por todo o prédio.",
        "categoria": "obra",
        "gravidade": "media",
        "status": "arquivada",
        "apartamento_idx": 3,
    },
    # Barulho da Madruga
    {
        "titulo": "Funk até o sol raiar",
        "descricao": "DJ Paredão resolveu testar o novo sistema de som às 2h da manhã. Seu Cochilo não dorme há 3 dias.",
        "categoria": "barulho",
        "gravidade": "alta",
        "status": "aberta",
        "apartamento_idx": 5,
    },
    {
        "titulo": "Animal solto no corredor",
        "descricao": "Madruguinha Silva deixou a porta aberta e o cachorro fugiu. O bichinho foi parar no apartamento da Dona Soneca e comeu o sofá dela.",
        "categoria": "animal",
        "gravidade": "media",
        "status": "resolvida",
        "apartamento_idx": 6,
    },
    {
        "titulo": "Festa na área comum",
        "descricao": "Um grupo de moradores resolveu fazer um churrasco na piscina às 23h. Cinco garrafas de vinho e uma caixa de som depois...",
        "categoria": "festa",
        "gravidade": "alta",
        "status": "investigando",
        "apartamento_idx": 8,
    },
    # Disputa&Guerra
    {
        "titulo": "Ofensas no grupo do condomínio",
        "descricao": "Briguento Mendes chamou Paz & Amor Oliveira de 'hipócrita' no grupo do WhatsApp. Prints foram anexados.",
        "categoria": "briga",
        "gravidade": "baixa",
        "status": "aberta",
        "apartamento_idx": 11,
    },
    {
        "titulo": "Reclamação de obra estrutural",
        "descricao": "Advogado Chato Jr. protocolou 14 páginas de reclamação sobre a reforma do hall de entrada. Alega que o tom do cinza não combina com o mármore.",
        "categoria": "obra",
        "gravidade": "media",
        "status": "aberta",
        "apartamento_idx": 13,
    },
    {
        "titulo": "Vazamento no teto do 1A",
        "descricao": "O apartamento 2A está com o banheiro vazando e caiu todo o gesso do teto do 1A. Advogado Chato Jr. já ameaça processar o condomínio.",
        "categoria": "outra",
        "gravidade": "alta",
        "status": "investigando",
        "apartamento_idx": 11,
    },
    {
        "titulo": "Discussão na assembleia",
        "descricao": "Assembleia ordinária terminou em briga generalizada após proposta de aumento de 5% no condomínio. Síndico Carrancudo perdeu a voz de tanto gritar.",
        "categoria": "briga",
        "gravidade": "critica",
        "status": "resolvida",
        "apartamento_idx": 14,
    },
    {
        "titulo": "Animal no jardim",
        "descricao": "Um gambá foi visto no jardim do condomínio. Paz & Amor Oliveira quer adotar. Briguento Mendes quer dedetizar.",
        "categoria": "animal",
        "gravidade": "baixa",
        "status": "aberta",
        "apartamento_idx": 12,
    },
    # Château do Encontro de Condomínio
    {
        "titulo": "Barulho de obra fora do horário",
        "descricao": "Doutor Metido contratou uma banda para ensaiar no apto 1201 às 22h. Dona Reclamação Profissional já ligou 17 vezes para o síndico.",
        "categoria": "barulho",
        "gravidade": "alta",
        "status": "aberta",
        "apartamento_idx": 16,
    },
    {
        "titulo": "Influencer gravou vídeo no salão de festas",
        "descricao": "Influencer do Condomínio usou o salão sem reserva para gravar um desafio de dança. Quebrou o lustre.",
        "categoria": "festa",
        "gravidade": "media",
        "status": "investigando",
        "apartamento_idx": 18,
    },
    {
        "titulo": "Discurso na garagem às 6h",
        "descricao": "Seu Discurso foi flagrado discursando para os carros na garagem sobre a importância de pagar o condomínio em dia. Ninguém ouviu porque os carros estavam desligados.",
        "categoria": "outra",
        "gravidade": "baixa",
        "status": "arquivada",
        "apartamento_idx": 19,
    },
    {
        "titulo": "Madame perdeu a paciência com o porteiro",
        "descricao": "Madame do Andar de Cima gritou com o porteiro porque a encomenda chegou com o papel amassado. O porteiro pediu transferência.",
        "categoria": "briga",
        "gravidade": "media",
        "status": "resolvida",
        "apartamento_idx": 20,
    },
    {
        "titulo": "Estudante confundiu o andar",
        "descricao": "Estudante Noturno tentou abrir a porta do 1301 achando que era seu apto. Acordou o Influencer, que gravou tudo.",
        "categoria": "outra",
        "gravidade": "baixa",
        "status": "arquivada",
        "apartamento_idx": 21,
    },
    {
        "titulo": "Doguinho latiu a noite toda",
        "descricao": "Doguinho do Doutor latiu das 2h às 4h da manhã. Dona Reclamação Profissional já protocolou denúncia na ouvidoria do condomínio.",
        "categoria": "barulho",
        "gravidade": "media",
        "status": "aberta",
        "apartamento_idx": 16,
    },
    # Conjunto Quem Cala
    {
        "titulo": "Fiscal de portaria multou visita",
        "descricao": "Fiscal de Portaria abordou a visita do Padre da Paróquia e exigiu documento com foto. O visita era a mãe do Padre.",
        "categoria": "briga",
        "gravidade": "media",
        "status": "investigando",
        "apartamento_idx": 22,
    },
    {
        "titulo": "Silêncio desfeito",
        "descricao": "Dona Calada foi ouvida gritando com o vizinho por causa de som alto. Descobriram que Dona Calada não é tão calada assim.",
        "categoria": "barulho",
        "gravidade": "baixa",
        "status": "aberta",
        "apartamento_idx": 23,
    },
    {
        "titulo": "Padre benzeu o elevador",
        "descricao": "Padre da Paróquia foi flagrado benzendo o elevador depois que ele travou entre os andares. Os moradores estão divididos entre 'milagre' e 'chamar o técnico'.",
        "categoria": "outra",
        "gravidade": "baixa",
        "status": "resolvida",
        "apartamento_idx": 24,
    },
    {
        "titulo": "Vizinho Misterioso nunca aparece",
        "descricao": "Ninguém nunca viu o Vizinho Misterioso. As entregas ficam acumuladas na portaria. Moradores suspeitam que ele seja um golpe de identidade falsa.",
        "categoria": "outra",
        "gravidade": "media",
        "status": "investigando",
        "apartamento_idx": 25,
    },
    {
        "titulo": "Campanha antecipada",
        "descricao": "Aspirante a Síndico já começou a campanha para a próxima eleição. Colou cartazes em todas as áreas comuns prometendo 'fim da fofoca' — ironia.",
        "categoria": "outra",
        "gravidade": "baixa",
        "status": "aberta",
        "apartamento_idx": 26,
    },
    {
        "titulo": "Vazamento no teto do B1",
        "descricao": "O apartamento B2 está com vazamento que afetou o teto do B1. Padre da Paróquia sugeriu rezar — Fiscal de Portaria sugeriu encanador.",
        "categoria": "outra",
        "gravidade": "alta",
        "status": "aberta",
        "apartamento_idx": 24,
    },
]

# ── Rivalidades ───────────────────────────────────────────────────────

RIVALIDADES: list[dict[str, Any]] = [
    {
        "apartamento_a_idx": 0,  # Dona Fofoqueira (101 A)
        "apartamento_b_idx": 1,  # Maria Barulho (102 A)
        "motivo": "Fofoca sobre festa do gato às 3h da manhã",
        "nivel": "intenso",
    },
    {
        "apartamento_a_idx": 5,  # DJ Paredão (01 Norte)
        "apartamento_b_idx": 7,  # Seu Cochilo (03 Sul)
        "motivo": "Som alto todos os finais de semana",
        "nivel": "belico",
    },
    {
        "apartamento_a_idx": 11,  # Briguento Mendes (1A)
        "apartamento_b_idx": 12,  # Paz & Amor Oliveira (1B)
        "motivo": "Vizinhos de porta com visões opostas da vida",
        "nivel": "moderado",
    },
    {
        "apartamento_a_idx": 11,  # Briguento Mendes (1A)
        "apartamento_b_idx": 13,  # Advogado Chato Jr. (2A)
        "motivo": "Vazamento do banheiro que destruiu o teto",
        "nivel": "intenso",
    },
    {
        "apartamento_a_idx": 3,  # Tia do Andar de Cima (202 B)
        "apartamento_b_idx": 2,  # João Reclamação (201 B)
        "motivo": "Obra de domingo de manhã sem autorização",
        "nivel": "leve",
    },
    # Château do Encontro
    {
        "apartamento_a_idx": 16,  # Doutor Metido / Doguinho (1201 A)
        "apartamento_b_idx": 17,  # Dona Reclamação Profissional (1202 A)
        "motivo": "Doguinho late e Doutor Metido não faz nada. Dona Reclamação reclama de tudo.",
        "nivel": "moderado",
    },
    {
        "apartamento_a_idx": 18,  # Influencer do Condomínio (1301 A)
        "apartamento_b_idx": 20,  # Madame do Andar de Cima (1402 B)
        "motivo": "Influencer gravou a Madame sem permissão no salão de festas",
        "nivel": "intenso",
    },
    {
        "apartamento_a_idx": 16,  # Doutor Metido / Doguinho (1201 A)
        "apartamento_b_idx": 21,  # Estudante Noturno (1501 B)
        "motivo": "Doguinho late para o Estudante toda noite quando ele chega",
        "nivel": "leve",
    },
    # Conjunto Quem Cala
    {
        "apartamento_a_idx": 22,  # Fiscal de Portaria (A1)
        "apartamento_b_idx": 24,  # Padre da Paróquia (B1)
        "motivo": "Fiscal barrou a mãe do Padre na portaria. Padre não perdoa.",
        "nivel": "moderado",
    },
    {
        "apartamento_a_idx": 23,  # Dona Calada (A2)
        "apartamento_b_idx": 25,  # Vizinho Misterioso (B2)
        "motivo": "Dona Calada acha que Vizinho Misterioso é agiota. Vizinho nunca respondeu.",
        "nivel": "leve",
    },
    {
        "apartamento_a_idx": 24,  # Padre da Paróquia (B1)
        "apartamento_b_idx": 26,  # Aspirante a Síndico (C1)
        "motivo": "Vazamento do teto do B1 — Aspirante prometeu resolver na campanha, Padre quer rezar missa no local.",
        "nivel": "moderado",
    },
    # Cross-condomínio (brigas que atravessam fronteiras)
    {
        "apartamento_a_idx": 5,   # DJ Paredão (01 Norte — Barulho)
        "apartamento_b_idx": 18,  # Influencer do Condomínio (1301 A — Château)
        "motivo": "Disputa de quem faz mais barulho: som alto vs desafios de dança às 3h",
        "nivel": "intenso",
    },
    {
        "apartamento_a_idx": 0,   # Dona Fofoqueira (101 A — Fofoca Feliz)
        "apartamento_b_idx": 22,  # Fiscal de Portaria (A1 — Quem Cala)
        "motivo": "Dona Fofoqueira descobriu que Fiscal de Portaria tem um caso e espalhou pelo condomínio inteiro",
        "nivel": "belico",
    },
    {
        "apartamento_a_idx": 20,  # Madame do Andar de Cima (1402 B — Château)
        "apartamento_b_idx": 3,   # Tia do Andar de Cima (202 B — Fofoca Feliz)
        "motivo": "Disputa pelo título não-oficial de 'Madame mais chique do condomínio'",
        "nivel": "leve",
    },
    {
        "apartamento_a_idx": 1,   # Maria Barulho (102 A — Fofoca Feliz)
        "apartamento_b_idx": 5,   # DJ Paredão (01 Norte — Barulho)
        "motivo": "Qual dos dois faz mais barulho? Maria com o gato, DJ com a caixa de som. Vizinhaça já fez aposta.",
        "nivel": "moderado",
    },
]