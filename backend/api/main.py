from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from .database import get_db
from .nbp import fetch_nbp_data
from api import crud

app = FastAPI(title="Currencies API")

@app.post("/currencies/fetch")
def fetch_currencies(db: Session = Depends(get_db)):
    data = fetch_nbp_data()

    crud.save_currencies(db, data)

    return {
        "message": "Currencies fetched and saved successfully",
        "count": len(data)
    }
