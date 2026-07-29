#!/usr/bin/env python3
"""Script de seed para popular o banco com dados satíricos do CondoCombat.

Uso:
    python -m scripts.seed              # usa SQLite (:memory:)
    DATABASE_URL=... python -m scripts.seed  # usa URL customizada

Idempotente: pula registros já existentes (baseado em CNPJ / CPF / unique).
"""

import asyncio
import os
import sys

from sqlalchemy import select
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.database import Base
from app.models import Apartamento, Condominio, Morador, Ocorrencia, Rivalidade
from scripts.seed_data import (
    APARTAMENTOS,
    CONDOMINIOS,
    MORADORES,
    OCORRENCIAS,
    RIVALIDADES,
)

# ── Setup ─────────────────────────────────────────────────────────────

DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "sqlite+aiosqlite:///./condocombat_seed.db",
)


async def get_or_create(session: AsyncSession, model, **filters) -> tuple:
    """Retorna (objeto, criado) — busca por filtros ou cria."""
    stmt = select(model).filter_by(**filters)
    result = await session.execute(stmt)
    instance = result.scalar_one_or_none()
    if instance is not None:
        return instance, False
    instance = model(**filters)
    session.add(instance)
    return instance, True


# ── Seed Functions ────────────────────────────────────────────────────


async def seed_condominios(
    session: AsyncSession,
) -> dict[int, Condominio]:
    """Cria condomínios e retorna dict {idx: Condominio}."""
    idx_map: dict[int, Condominio] = {}
    for i, data in enumerate(CONDOMINIOS):
        cond, _ = await get_or_create(session, Condominio, cnpj=data["cnpj"])
        if _:
            cond.nome = data["nome"]
            cond.endereco = data["endereco"]
            cond.telefone = data.get("telefone")
            cond.email = data.get("email")
        idx_map[i] = cond
    await session.commit()
    return idx_map


async def seed_apartamentos(
    session: AsyncSession,
    cond_map: dict[int, Condominio],
) -> dict[int, Apartamento]:
    """Cria apartamentos e retorna dict {idx: Apartamento}."""
    idx_map: dict[int, Apartamento] = {}
    for i, data in enumerate(APARTAMENTOS):
        cond = cond_map[data["condominio_idx"]]
        apt, _ = await get_or_create(
            session,
            Apartamento,
            numero=data["numero"],
            bloco=data.get("bloco"),
            torre=data.get("torre"),
            condominio_id=cond.id,
        )
        idx_map[i] = apt
    await session.commit()
    return idx_map


async def seed_moradores(
    session: AsyncSession,
    apt_map: dict[int, Apartamento],
) -> dict[int, Morador]:
    """Cria moradores e retorna dict {idx: Morador}."""
    idx_map: dict[int, Morador] = {}
    for i, data in enumerate(MORADORES):
        apt = apt_map[data["apartamento_idx"]]
        mor, _ = await get_or_create(session, Morador, cpf=data["cpf"])
        if _:
            mor.nome = data["nome"]
            mor.email = data["email"]
            mor.telefone = data.get("telefone")
            mor.tipo = data["tipo"]
            mor.apartamento_id = apt.id
        idx_map[i] = mor
    await session.commit()
    return idx_map


async def seed_ocorrencias(
    session: AsyncSession,
    apt_map: dict[int, Apartamento],
) -> None:
    """Cria ocorrências."""
    for i, data in enumerate(OCORRENCIAS):
        apt = apt_map[data["apartamento_idx"]]
        ocorrencia = Ocorrencia(
            titulo=data["titulo"],
            descricao=data["descricao"],
            categoria=data["categoria"],
            gravidade=data["gravidade"],
            status=data["status"],
            apartamento_id=apt.id,
        )
        session.add(ocorrencia)
    await session.commit()


async def seed_rivalidades(
    session: AsyncSession,
    apt_map: dict[int, Apartamento],
) -> None:
    """Cria rivalidades entre apartamentos."""
    for data in RIVALIDADES:
        apt_a = apt_map[data["apartamento_a_idx"]]
        apt_b = apt_map[data["apartamento_b_idx"]]

        # Verifica se rivalidade já existe (A↔B ou B↔A)
        stmt = select(Rivalidade).where(
            (
                (Rivalidade.apartamento_a_id == apt_a.id)
                & (Rivalidade.apartamento_b_id == apt_b.id)
            )
            | (
                (Rivalidade.apartamento_a_id == apt_b.id)
                & (Rivalidade.apartamento_b_id == apt_a.id)
            )
        )
        result = await session.execute(stmt)
        if result.scalar_one_or_none() is not None:
            continue

        rivalidade = Rivalidade(
            apartamento_a_id=apt_a.id,
            apartamento_b_id=apt_b.id,
            motivo=data["motivo"],
            nivel=data["nivel"],
            status="ativa",
        )
        session.add(rivalidade)

    await session.commit()


# ── Main ──────────────────────────────────────────────────────────────


async def seed_all(db_url: str | None = None) -> None:
    url = db_url or DATABASE_URL
    engine = create_async_engine(url, echo=False)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession)

    async with AsyncSessionLocal() as session:
        print("🌱 Seeding Condomínios...")
        cond_map = await seed_condominios(session)

        print("🏢 Seeding Apartamentos...")
        apt_map = await seed_apartamentos(session, cond_map)

        print("👤 Seeding Moradores...")
        await seed_moradores(session, apt_map)

        print("📋 Seeding Ocorrências...")
        await seed_ocorrencias(session, apt_map)

        print("⚔️  Seeding Rivalidades...")
        await seed_rivalidades(session, apt_map)

    await engine.dispose()
    print("✅ Seed concluído com sucesso!")


def main() -> None:
    asyncio.run(seed_all())


if __name__ == "__main__":
    main()
