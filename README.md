# Aplikacja Kursów Walut NBP

Aplikacja webowa do pobierania, przechowywania i wyświetlania kursów walut z Narodowego Banku Polskiego (NBP).

## Technologia

- **Frontend**: Angular (TypeScript)
- **Backend**: FastAPI (Python)
- **Baza danych**: PostgreSQL
- **Konteneryzacja**: Docker & Docker Compose
- **API źródłowe**: [NBP API](https://api.nbp.pl)

## Funkcjonalności

- Pobieranie kursów walut z API NBP
- Wyświetlanie danych z określonego dnia
- Przechowywanie danych w bazie PostgreSQL
- Testy jednostkowe
- Wdrażanie w kontenerach Docker

## Uruchomienie

### Wymagania
- Docker & Docker Compose

### Uruchomienie aplikacji

```bash
docker-compose up --build
```

Aplikacja będzie dostępna pod adresem:
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8000
- **Dokumentacja API**: http://localhost:8000/docs

## Struktura projektu

```
├── backend/           # API FastAPI
│   ├── api/          # Logika aplikacji (CRUD, modele, schematy)
│   └── tests/        # Testy jednostkowe
├── frontend/         # Aplikacja Angular
│   └── src/          # Komponenty i serwisy
├── compose.yaml      # Konfiguracja Docker Compose
└── db.sql            # Schemat bazy danych
```

## Endpoints API

- `GET /currencies` - Lista dostępnych walut
- `GET /currencies/{date}` - Kursy walut z wybranej daty (format: YYYY-MM-DD)
- `POST /currencies/fetch` - Pobranie danych z API NBP i zapisanie do bazy