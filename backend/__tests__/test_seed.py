"""Tests for seed data validity and seed script execution."""

import re

import pytest
from scripts.seed_data import (
    APARTAMENTOS,
    CONDOMINIOS,
    MORADORES,
    OCORRENCIAS,
    RIVALIDADES,
)

# ── Data Integrity ────────────────────────────────────────────────────


def test_condominios_tem_dados_obrigatorios():
    """Cada condomínio deve ter nome e endereço."""
    for i, c in enumerate(CONDOMINIOS):
        assert c["nome"], f"Condomínio {i} sem nome"
        assert c["endereco"], f"Condomínio {i} sem endereço"
        assert c["cnpj"], f"Condomínio {i} sem CNPJ"


def test_condominios_cnpj_formato():
    """CNPJ deve seguir formato 99.999.999/0001-99."""
    padrao = re.compile(r"^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$")
    for c in CONDOMINIOS:
        assert padrao.match(c["cnpj"]), (
            f"CNPJ inválido: {c['cnpj']}"
        )


def test_condominios_cnpj_unicos():
    """CNPJs devem ser únicos entre condomínios."""
    cnpjs = [c["cnpj"] for c in CONDOMINIOS]
    assert len(cnpjs) == len(set(cnpjs)), "CNPJs duplicados"


def test_apartamentos_tem_dados_obrigatorios():
    """Cada apartamento deve ter número e condominio_idx."""
    for i, a in enumerate(APARTAMENTOS):
        assert a["numero"], f"Apartamento {i} sem número"
        assert "condominio_idx" in a, f"Apartamento {i} sem condominio_idx"
        assert 0 <= a["condominio_idx"] < len(CONDOMINIOS), (
            f"Apartamento {i} com condominio_idx inválido"
        )


def test_moradores_cpf_formato():
    """CPF deve seguir formato 999.999.999-99."""
    padrao = re.compile(r"^\d{3}\.\d{3}\.\d{3}-\d{2}$")
    for m in MORADORES:
        assert padrao.match(m["cpf"]), (
            f"CPF inválido: {m['cpf']} para {m['nome']}"
        )


def test_moradores_cpf_unicos():
    """CPFs devem ser únicos entre moradores."""
    cpfs = [m["cpf"] for m in MORADORES]
    assert len(cpfs) == len(set(cpfs)), "CPFs duplicados"


def test_moradores_apartamento_idx_valido():
    """apartamento_idx de moradores deve ser válido."""
    for m in MORADORES:
        assert 0 <= m["apartamento_idx"] < len(APARTAMENTOS), (
            f"apartamento_idx inválido para {m['nome']}"
        )


def test_moradores_tipos_validos():
    """tipo do morador deve ser um dos valores aceitos."""
    tipos_validos = {"proprietario", "inquilino", "sindico"}
    for m in MORADORES:
        assert m["tipo"] in tipos_validos, (
            f"Tipo inválido {m['tipo']} para {m['nome']}"
        )


def test_ocorrencias_campos_obrigatorios():
    """Cada ocorrência deve ter titulo, descricao, categoria, etc."""
    categorias_validas = {"barulho", "briga", "festa", "obra", "animal", "outra"}
    gravidades_validas = {"baixa", "media", "alta", "critica"}
    status_validos = {"aberta", "investigando", "resolvida", "arquivada"}

    for i, o in enumerate(OCORRENCIAS):
        assert o["titulo"], f"Ocorrência {i} sem título"
        assert o["descricao"], f"Ocorrência {i} sem descrição"
        assert o["categoria"] in categorias_validas, (
            f"Ocorrência {i} categoria inválida: {o['categoria']}"
        )
        assert o["gravidade"] in gravidades_validas, (
            f"Ocorrência {i} gravidade inválida: {o['gravidade']}"
        )
        assert o["status"] in status_validos, (
            f"Ocorrência {i} status inválido: {o['status']}"
        )
        assert 0 <= o["apartamento_idx"] < len(APARTAMENTOS), (
            f"Ocorrência {i} apartamento_idx inválido"
        )


def test_rivalidades_campos_obrigatorios():
    """Cada rivalidade deve ter índices e motivo."""
    niveis_validos = {"leve", "moderado", "intenso", "belico"}
    for i, r in enumerate(RIVALIDADES):
        assert "apartamento_a_idx" in r, f"Rivalidade {i} sem apartamento_a_idx"
        assert "apartamento_b_idx" in r, f"Rivalidade {i} sem apartamento_b_idx"
        assert r["motivo"], f"Rivalidade {i} sem motivo"
        assert r["nivel"] in niveis_validos, (
            f"Rivalidade {i} nível inválido: {r['nivel']}"
        )
        assert 0 <= r["apartamento_a_idx"] < len(APARTAMENTOS), (
            f"Rivalidade {i} apartamento_a_idx inválido"
        )
        assert 0 <= r["apartamento_b_idx"] < len(APARTAMENTOS), (
            f"Rivalidade {i} apartamento_b_idx inválido"
        )
        assert r["apartamento_a_idx"] != r["apartamento_b_idx"], (
            f"Rivalidade {i} tem mesmo apto A e B"
        )


def test_rivalidades_sem_duplicatas():
    """Não deve haver rivalidades duplicadas (A↔B)."""
    pares = set()
    for r in RIVALIDADES:
        par = (r["apartamento_a_idx"], r["apartamento_b_idx"])
        par_inv = (r["apartamento_b_idx"], r["apartamento_a_idx"])
        assert par not in pares and par_inv not in pares, (
            f"Rivalidade duplicada: {par}"
        )
        pares.add(par)


def test_contagem_minima():
    """Deve ter quantidade mínima de dados satíricos."""
    assert len(CONDOMINIOS) >= 2, "Mínimo 2 condomínios"
    assert len(APARTAMENTOS) >= 10, "Mínimo 10 apartamentos"
    assert len(MORADORES) >= 10, "Mínimo 10 moradores"
    assert len(OCORRENCIAS) >= 10, "Mínimo 10 ocorrências"
    assert len(RIVALIDADES) >= 3, "Mínimo 3 rivalidades"


# ── Seed Execution (Integration) ──────────────────────────────────────


@pytest.mark.skip(reason="Requer aiosqlite instalado para execução real")
async def test_seed_execution():
    """Testa que o seed roda sem erros com SQLite em memória."""
    from scripts.seed import seed_all

    await seed_all("sqlite+aiosqlite://")


async def test_seed_execution_mock():
    """Testa a lógica do seed usando mocks."""
    from unittest.mock import AsyncMock, MagicMock, patch

    from sqlalchemy.ext.asyncio import AsyncSession

    # Create a mock session that simulates empty database
    session = AsyncMock(spec=AsyncSession)
    result = MagicMock()
    result.scalar_one_or_none = MagicMock(return_value=None)
    scalars_mock = MagicMock()
    scalars_mock.all = MagicMock(return_value=[])
    result.scalars = MagicMock(return_value=scalars_mock)
    session.execute = AsyncMock(return_value=result)
    session.add = MagicMock()
    session.commit = AsyncMock()
    session.flush = AsyncMock()
    session.close = AsyncMock()

    with patch("scripts.seed.async_sessionmaker") as mock_factory:
        mock_factory.return_value = lambda: AsyncMock(
            __aenter__=AsyncMock(return_value=session),
            __aexit__=AsyncMock(),
        )
        # Test that individual seed functions handle empty state
        from scripts.seed import seed_condominios
        from scripts.seed_data import CONDOMINIOS

        cond_map = await seed_condominios(session)
        assert isinstance(cond_map, dict)
        assert len(cond_map) == len(CONDOMINIOS)
        assert session.add.call_count == len(CONDOMINIOS)
        session.commit.assert_awaited_once()
