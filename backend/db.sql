CREATE TABLE currencies (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL,
    currency VARCHAR(100) NOT NULL,
    rate NUMERIC(10, 4) NOT NULL,
    rate_date DATE NOT NULL
);

CREATE INDEX idx_currency_date
ON currencies(rate_date);