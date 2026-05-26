import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CurrencyRate, FetchResponse } from './currency.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  private apiUrl = 'http://localhost:8000/currencies';

  allRates: CurrencyRate[] = [];

  // Domyślna data i filtry
  selectedDate: string = '2026-05-25';

  isLoading = false;
  infoMessage = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadRates();
  }

  // Akcja przycisku: POST /currencies/fetch
  fetchNewRates(): void {
    this.isLoading = true;
    this.http.post<FetchResponse>(`${this.apiUrl}/fetch`, {}).subscribe({
      next: (res) => {
        this.infoMessage = `Sukces: ${res.message} (Pobrano: ${res.count})`;
        this.isLoading = false;
        this.loadRates();
      },
      error: () => {
        this.infoMessage = 'Błąd podczas pobierania danych z zewnętrznego API.';
        this.isLoading = false;
      }
    });
  }

  // Pobieranie danych: GET /currencies/{date}
  loadRates(): void {
    if (!this.selectedDate) return;

    this.http.get<CurrencyRate[]>(`${this.apiUrl}/${this.selectedDate}`).subscribe({
      next: (data) => {
        this.allRates = data;
      },
      error: () => {
        this.infoMessage = 'Nie udało się załadować kursów walut dla wybranej daty.';
      }
    });
  }
}