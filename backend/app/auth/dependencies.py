from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.auth.schemas import UserRead
from app.auth.utils import MOCK_USERS, decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserRead:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciais inválidas",
        headers={"WWW-Authenticate": "Bearer"},
    )

    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception

    email: str | None = payload.get("sub")
    if email is None:
        raise credentials_exception

    user_data = MOCK_USERS.get(email)
    if user_data is None:
        raise credentials_exception

    return UserRead(
        id=user_data["id"],
        nome=user_data["nome"],
        email=user_data["email"],
        tipo=user_data["tipo"],
    )
