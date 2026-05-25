from pydantic import BaseModel
from datetime import date


class CurrencyResponse(BaseModel):
    id: int
    code: str
    currency: str
    rate: float
    rate_date: date

    class Config:
        from_attributes = True


class CurrencyListResponse(BaseModel):
    code: str
    currency: str

    class Config:
        from_attributes = True


class FetchCurrenciesResponse(BaseModel):
    message: str
    count: int
