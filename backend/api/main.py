from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime

from .database import get_db
from .nbp import fetch_nbp_data
from api import crud
from .schemas import CurrencyResponse, CurrencyListResponse, FetchCurrenciesResponse 

app = FastAPI(title="Currencies API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/currencies", response_model=list[CurrencyListResponse])
def get_currencies(db: Session = Depends(get_db)):
    return crud.get_currencies(db)


@app.get("/currencies/{date}", response_model=list[CurrencyResponse])
def get_currencies_by_date(
    date: str,
    db: Session = Depends(get_db)
):
    try:
        parsed_date = datetime.strptime(
            date,
            "%Y-%m-%d"
        ).date()

    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid date format. Use YYYY-MM-DD"
        )

    return crud.get_currencies_by_date(db, parsed_date)


@app.post("/currencies/fetch", response_model=FetchCurrenciesResponse)
def fetch_currencies(db: Session = Depends(get_db)):
    data = fetch_nbp_data()

    crud.save_currencies(db, data)

    return {
        "message": "Currencies fetched and saved successfully",
        "count": len(data)
    }
