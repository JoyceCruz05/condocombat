"""Unit tests for MoradorRepository."""

from unittest.mock import AsyncMock, MagicMock

import pytest
from app.models.morador import Morador
from app.repositories.morador import MoradorRepository
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


@pytest.fixture
def session() -> MagicMock:
    mock = AsyncMock(spec=AsyncSession)
    mock.add = MagicMock()
    mock.commit = AsyncMock()
    mock.refresh = AsyncMock()
    mock.delete = AsyncMock()
    mock.execute = AsyncMock()
    # execute() returns a sync Result (scalar_one_or_none, scalars() are sync)
    result_mock = MagicMock()
    result_mock.scalar_one_or_none = MagicMock()
    result_mock.scalars = MagicMock()
    result_mock.scalars.return_value.all = MagicMock()
    mock.execute.return_value = result_mock
    return mock


@pytest.fixture
def repo(session: MagicMock) -> MoradorRepository:
    return MoradorRepository(session)


def _make_morador(**kwargs) -> MagicMock:
    vals = {"id": 1, "nome": "João", "cpf": "111.222.333-44", "email": "joao@email.com", "apartamento_id": 1, "telefone": None, "tipo": "proprietario"} | kwargs
    m = MagicMock(spec=Morador)
    for k, v in vals.items():
        setattr(m, k, v)
    return m


class TestCreate:
    async def test_creates_morador(self, repo: MoradorRepository, session: MagicMock) -> None:
        m = _make_morador()
        result = await repo.create(m)
        session.add.assert_called_once_with(m)
        session.commit.assert_awaited_once()
        session.refresh.assert_awaited_once_with(m)
        assert result == m


class TestGetById:
    async def test_returns_morador_when_found(self, repo: MoradorRepository, session: MagicMock) -> None:
        expected = _make_morador()
        session.execute.return_value.scalar_one_or_none.return_value = expected

        result = await repo.get_by_id(1)

        assert result == expected
        session.execute.assert_awaited_once()

    async def test_returns_none_when_not_found(self, repo: MoradorRepository, session: MagicMock) -> None:
        session.execute.return_value.scalar_one_or_none.return_value = None

        result = await repo.get_by_id(999)

        assert result is None

    async def test_executes_select_query(self, repo: MoradorRepository, session: MagicMock) -> None:
        await repo.get_by_id(1)
        call = session.execute.call_args
        stmt = call[0][0]
        assert isinstance(stmt, type(select(Morador)))


class TestGetAll:
    async def test_returns_all(self, repo: MoradorRepository, session: MagicMock) -> None:
        a = _make_morador(id=1)
        b = _make_morador(id=2, nome="Maria")
        session.execute.return_value.scalars.return_value.all.return_value = [a, b]

        result = await repo.get_all()

        assert len(result) == 2

    async def test_returns_empty(self, repo: MoradorRepository, session: MagicMock) -> None:
        session.execute.return_value.scalars.return_value.all.return_value = []

        result = await repo.get_all()

        assert result == []


class TestGetByCpf:
    async def test_finds_by_cpf(self, repo: MoradorRepository, session: MagicMock) -> None:
        expected = _make_morador()
        session.execute.return_value.scalar_one_or_none.return_value = expected

        result = await repo.get_by_cpf("111.222.333-44")

        assert result == expected

    async def test_returns_none_when_not_found(self, repo: MoradorRepository, session: MagicMock) -> None:
        session.execute.return_value.scalar_one_or_none.return_value = None

        result = await repo.get_by_cpf("000.000.000-00")

        assert result is None


class TestGetByEmail:
    async def test_finds_by_email(self, repo: MoradorRepository, session: MagicMock) -> None:
        expected = _make_morador()
        session.execute.return_value.scalar_one_or_none.return_value = expected

        result = await repo.get_by_email("joao@email.com")

        assert result == expected

    async def test_returns_none_when_not_found(self, repo: MoradorRepository, session: MagicMock) -> None:
        session.execute.return_value.scalar_one_or_none.return_value = None

        result = await repo.get_by_email("x@y.com")

        assert result is None


class TestGetByApartamento:
    async def test_returns_moradores_do_apartamento(self, repo: MoradorRepository, session: MagicMock) -> None:
        a = _make_morador(id=1)
        b = _make_morador(id=2, nome="Maria")
        session.execute.return_value.scalars.return_value.all.return_value = [a, b]

        result = await repo.get_by_apartamento(1)

        assert len(result) == 2

    async def test_returns_empty_when_sem_moradores(self, repo: MoradorRepository, session: MagicMock) -> None:
        session.execute.return_value.scalars.return_value.all.return_value = []

        result = await repo.get_by_apartamento(999)

        assert result == []


class TestUpdate:
    async def test_updates_existing(self, repo: MoradorRepository, session: MagicMock) -> None:
        morador = _make_morador()
        repo.get_by_id = AsyncMock(return_value=morador)

        result = await repo.update(1, {"nome": "Novo Nome"})

        assert morador.nome == "Novo Nome"  # type: ignore[attr-defined]
        session.commit.assert_awaited_once()
        session.refresh.assert_awaited_once_with(morador)
        assert result == morador

    async def test_returns_none_when_not_found(self, repo: MoradorRepository, session: MagicMock) -> None:
        repo.get_by_id = AsyncMock(return_value=None)

        result = await repo.update(999, {"nome": "X"})

        assert result is None
        session.commit.assert_not_called()


class TestDelete:
    async def test_deletes_existing(self, repo: MoradorRepository, session: MagicMock) -> None:
        morador = _make_morador()
        repo.get_by_id = AsyncMock(return_value=morador)

        result = await repo.delete(1)

        assert result is True
        session.delete.assert_awaited_once_with(morador)
        session.commit.assert_awaited_once()

    async def test_returns_false_when_not_found(self, repo: MoradorRepository, session: MagicMock) -> None:
        repo.get_by_id = AsyncMock(return_value=None)

        result = await repo.delete(999)

        assert result is False
        session.delete.assert_not_called()
        session.commit.assert_not_called()
