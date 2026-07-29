"""Unit tests for MoradorService."""

from unittest.mock import AsyncMock, MagicMock

import pytest

from app.repositories.morador import MoradorRepository
from app.services.morador import (
    MoradorComCPFJaExiste,
    MoradorComEmailJaExiste,
    MoradorNaoEncontrado,
    MoradorService,
)


@pytest.fixture
def repo() -> MagicMock:
    return MagicMock(spec=MoradorRepository)


@pytest.fixture
def service(repo: MagicMock) -> MoradorService:
    return MoradorService(repo)


class TestCriar:
    async def test_cria_morador_sem_cpf_email_repetido(self, service: MoradorService, repo: MagicMock) -> None:
        repo.get_by_cpf = AsyncMock(return_value=None)
        repo.get_by_email = AsyncMock(return_value=None)
        repo.create = AsyncMock(return_value=MagicMock(id=1))

        result = await service.criar(
            nome="João",
            cpf="111.222.333-44",
            email="joao@email.com",
            apartamento_id=1,
        )

        assert result.id == 1
        repo.create.assert_awaited_once()

    async def test_rejeita_cpf_duplicado(self, service: MoradorService, repo: MagicMock) -> None:
        repo.get_by_cpf = AsyncMock(return_value=MagicMock())
        repo.get_by_email = AsyncMock(return_value=None)

        with pytest.raises(MoradorComCPFJaExiste):
            await service.criar(
                nome="João",
                cpf="111.222.333-44",
                email="joao@email.com",
                apartamento_id=1,
            )
        repo.create.assert_not_called()

    async def test_rejeita_email_duplicado(self, service: MoradorService, repo: MagicMock) -> None:
        repo.get_by_cpf = AsyncMock(return_value=None)
        repo.get_by_email = AsyncMock(return_value=MagicMock())

        with pytest.raises(MoradorComEmailJaExiste):
            await service.criar(
                nome="João",
                cpf="111.222.333-44",
                email="joao@email.com",
                apartamento_id=1,
            )
        repo.create.assert_not_called()


class TestListar:
    async def test_lista_todos(self, service: MoradorService, repo: MagicMock) -> None:
        repo.get_all = AsyncMock(return_value=[MagicMock(), MagicMock()])

        result = await service.listar()

        assert len(result) == 2

    async def test_lista_vazio(self, service: MoradorService, repo: MagicMock) -> None:
        repo.get_all = AsyncMock(return_value=[])

        result = await service.listar()

        assert result == []


class TestBuscar:
    async def test_retorna_morador_quando_encontrado(self, service: MoradorService, repo: MagicMock) -> None:
        repo.get_by_id = AsyncMock(return_value=MagicMock(id=1))

        result = await service.buscar(1)

        assert result.id == 1

    async def test_lanca_excecao_quando_nao_encontrado(self, service: MoradorService, repo: MagicMock) -> None:
        repo.get_by_id = AsyncMock(return_value=None)

        with pytest.raises(MoradorNaoEncontrado):
            await service.buscar(999)


class TestListarPorApartamento:
    async def test_retorna_moradores_do_apto(self, service: MoradorService, repo: MagicMock) -> None:
        repo.get_by_apartamento = AsyncMock(return_value=[MagicMock(), MagicMock()])

        result = await service.listar_por_apartamento(1)

        assert len(result) == 2

    async def test_retorna_vazio_quando_sem_moradores(self, service: MoradorService, repo: MagicMock) -> None:
        repo.get_by_apartamento = AsyncMock(return_value=[])

        result = await service.listar_por_apartamento(999)

        assert result == []


class TestAtualizar:
    async def test_atualiza_morador(self, service: MoradorService, repo: MagicMock) -> None:
        repo.get_by_id = AsyncMock(return_value=MagicMock(id=1, cpf="111.222.333-44"))
        repo.update = AsyncMock(return_value=MagicMock(id=1, nome="Novo"))

        result = await service.atualizar(1, {"nome": "Novo"})

        assert result.id == 1

    async def test_nao_permite_cpf_ja_existente(self, service: MoradorService, repo: MagicMock) -> None:
        existente = MagicMock(id=1, cpf="111.222.333-44")
        repo.get_by_id = AsyncMock(return_value=existente)
        repo.get_by_cpf = AsyncMock(return_value=MagicMock(id=2))

        with pytest.raises(MoradorComCPFJaExiste):
            await service.atualizar(1, {"cpf": "999.999.999-99"})

    async def test_nao_permite_email_ja_existente(self, service: MoradorService, repo: MagicMock) -> None:
        existente = MagicMock(id=1, email="joao@email.com")
        repo.get_by_id = AsyncMock(return_value=existente)
        repo.get_by_email = AsyncMock(return_value=MagicMock(id=2))

        with pytest.raises(MoradorComEmailJaExiste):
            await service.atualizar(1, {"email": "outro@email.com"})

    async def test_lanca_excecao_quando_nao_encontrado(self, service: MoradorService, repo: MagicMock) -> None:
        repo.get_by_id = AsyncMock(return_value=None)

        with pytest.raises(MoradorNaoEncontrado):
            await service.atualizar(999, {"nome": "X"})


class TestRemover:
    async def test_remove_morador(self, service: MoradorService, repo: MagicMock) -> None:
        repo.delete = AsyncMock(return_value=True)

        await service.remover(1)

        repo.delete.assert_awaited_once_with(1)

    async def test_lanca_excecao_quando_nao_encontrado(self, service: MoradorService, repo: MagicMock) -> None:
        repo.delete = AsyncMock(return_value=False)

        with pytest.raises(MoradorNaoEncontrado):
            await service.remover(999)
