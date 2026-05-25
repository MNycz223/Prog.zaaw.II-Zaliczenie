from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import insert
from .models import Currency
from datetime import date

def save_currencies(db: Session, currencies_data):
    for item in currencies_data:
        currency = {
            "code": item["code"],
            "currency": item["currency"],
            "rate": item["mid"],
            "rate_date": item["effectiveDate"]
        }

        sql = insert(Currency).values(**currency)
        sql = sql.on_conflict_do_nothing()
        db.execute(sql)

    db.commit()
