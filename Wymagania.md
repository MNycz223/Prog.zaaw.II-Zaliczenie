Celem projektu jest stworzenie aplikacji internetowej umożliwiającej pobieranie i wyświetlanie kursów walut z podziałem na lata, kwartały, miesiące i dni. Projekt skupia się na implementacji testów automatycznych w podejściu BDD (Behavior-Driven Development) oraz na konteneryzacji aplikacji przy użyciu Dockera.

Technologie i narzędzia


Frontend: Angular
Backend: Django Rest Framework (DRF) lub FastAPI
Baza danych: SQL lub PostgreSQL
Konteneryzacja: Docker
API: NBP API (https://api.nbp.pl)


Testy jednostkowe:
Frontend: Jasmine/Karma
Backend: Pytest/Unittest


Wymagania funkcjonalne aplikacji
Aplikacja powinna być zbudowana z dwóch niezależnych modułów:
Frontend: Angular, z interfejsem użytkownika umożliwiającym interakcję z API oraz wyświetlanie danych.
Backend: Django Rest Framework lub FastAPI jako API, które obsłuży zapytania od frontendu i połączy się z bazą danych.
Aplikacja powinna działać w kontenerach Docker.

Funkcjonalności:
 - Pobieranie kursów walut z API NBP za pomocą przycisku w aplikacji frontendowej.
 - Wyświetlanie danych w formie podziału na:
 - Lata
 - Kwartały
 - Miesiące
 - Dni

Testy jednostkowe:
 - Frontend: Testowanie logiki komponentów i usług Angular.
 - Backend: Testowanie punktów końcowych API oraz połączeń z bazą danych.
 - Architektura projektu

Projekt składa się z dwóch głównych modułów:

Frontend:
 - Zawiera komponent do pobierania kursów walut.
 - Wyświetla dane w formie tabel lub wykresów (opcjonalnie).
 - Komunikuje się z backendem za pomocą żądań HTTP.

Backend:
 - Obsługuje zapytania przychodzące z frontendu.
 - Łączy się z bazą danych w celu zapisu i odczytu kursów walut.
 - Korzysta z API NBP w celu pobierania danych.

Wymagania techniczne

Docker:
 - Każdy moduł (frontend, backend, baza danych) znajduje się w osobnym kontenerze.
 - Plik docker-compose.yml pozwala na uruchomienie całej aplikacji jednym poleceniem.

Baza danych:
 - Struktura tabel powinna umożliwiać przechowywanie danych o kursach walut z podziałem na daty i waluty.
 - Dopuszczalne użycie PostgreSQL lub innego systemu relacyjnego (SQL).

Testy jednostkowe:
 - Frontend: Przetestowane funkcje i komponenty (przykładowo: poprawne działanie przycisku pobierania danych).
 - Backend: Przetestowane punkty końcowe (np. poprawność odpowiedzi dla danych żądań).

API NBP:
 - Korzystanie z odpowiednich endpointów do pobierania kursów walut (np. średni kurs z wybranego dnia).
 - Szczegóły implementacji
 - Backend

Struktura punktów końcowych (endpoints):
 - GET /currencies: Zwraca listę dostępnych walut.
 - GET /currencies/<date>: Zwraca kursy walut z wybranej daty.
 - POST /currencies/fetch: Pobiera dane z API NBP i zapisuje je do bazy danych.

Testy jednostkowe backendu:
 - Testowanie poprawności odpowiedzi API.
 - Testowanie połączenia z bazą danych.
 - Frontend

Interfejs użytkownika:
 - Przyciski do wyboru zakresu dat.
 - Wyświetlanie kursów walut w tabeli z możliwością filtrowania według lat, kwartałów, miesięcy i dni.

Testy jednostkowe frontendu:
 - Testowanie działania przycisku pobierania kursów walut.
 - Testowanie poprawności wyświetlania danych w tabeli.


Rezultat końcowy
 - Aplikacja:
    - Działająca aplikacja webowa dostępna w kontenerach Docker.
    - Możliwość pobierania i wyświetlania kursów walut na podstawie zakresu dat.
 - Kod źródłowy:
    - Udostępniony w repozytorium Git (np. GitHub).
 - Testy:
    - Wszystkie testy jednostkowe przechodzą pomyślnie.
 - Dokumentacja:
    - Opis funkcjonalności aplikacji, instrukcja uruchomienia oraz raport z testów.
 - Kryteria oceny
    - Działająca aplikacja zgodna z wymaganiami.
    - Poprawność implementacji backendu i frontendu.
    - Działające testy jednostkowe.
    - Użycie Docker do konteneryzacji.
    - Czytelność kodu i zgodność z najlepszymi praktykami.
