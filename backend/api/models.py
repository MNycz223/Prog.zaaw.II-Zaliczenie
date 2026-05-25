from sqlalchemy import Column, Integer, String, Numeric, Date
from .database import Base


class Currency(Base):
    __tablename__ = "currencies"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, nullable=False)
    currency = Column(String, nullable=False)
    rate = Column(Numeric(10, 4), nullable=False)
    rate_date = Column(Date, nullable=False)
