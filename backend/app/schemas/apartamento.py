from pydantic import BaseModel, ConfigDict


class ApartamentoBase(BaseModel):
    numero: str
    bloco: str | None = None
    torre: str | None = None
    area: float | None = None
    condominio_id: int


class ApartamentoCreate(ApartamentoBase):
    pass


class ApartamentoUpdate(BaseModel):
    numero: str | None = None
    bloco: str | None = None
    torre: str | None = None
    area: float | None = None


class ApartamentoRead(ApartamentoBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
