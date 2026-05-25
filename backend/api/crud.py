from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import insert
from .models import Currency
from datetime import date


def get_currencies(db: Session):
    return [
        {"code": row.code, "currency": row.currency}
        for row in db.query(
            Currency.code,
            Currency.currency
        )
        .distinct()
        .order_by(Currency.code)
        .all()
    ]

def get_currencies_by_date(db: Session, selected_date: date):
    return (
        db.query(Currency)
        .filter(Currency.rate_date == selected_date)
        .all()
    )

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
