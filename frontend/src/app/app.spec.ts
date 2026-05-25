import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CurrencyRate, FetchResponse } from './currency.model';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let httpMock: HttpTestingController;

  const mockRates: CurrencyRate[] = [
    { id: 101, code: 'EUR', currency: 'Euro', rate: 4.30, rate_date: '2026-05-25' },
    { id: 102, code: 'USD', currency: 'Dolar Amerykański', rate: 4.00, rate_date: '2026-05-25' },
    { id: 103, code: 'GBP', currency: 'Funt Brytyjski', rate: 5.10, rate_date: '2026-05-25' }
  ];

  const mockFetchResponse: FetchResponse = {
    message: 'Kursy walut pobrane i zapisane',
    count: 3
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, FormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges(); // Wywołuje ngOnInit -> pierwsze pobranie danych (GET)

    // Obsługa automatycznego strzału GET z ngOnInit()
    const req = httpMock.expectOne('http://backend:8000/currencies/2026-05-25');
    req.flush(mockRates);
  });

  afterEach(() => {
    httpMock.verify(); // Upewnia się, że nie ma wiszących zapytań
  });

  it('powinien poprawnie zainicjalizować aplikację i załadować tabelę z mock danymi', () => {
    fixture.detectChanges();
    expect(component.allRates.length).toBe(3);
    
    const rows = fixture.debugElement.queryAll(By.css('.currency-row'));
    expect(rows.length).toBe(3);

    const firstRowCode = fixture.debugElement.query(By.css('.currency-code')).nativeElement.textContent;
    expect(firstRowCode.trim()).toBe('EUR');
  });

  it('powinien wyświetlić wszystkie kolumny w tabeli z poprawnymi danymi', () => {
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('.currency-row'));
    const firstRow = rows[0];

    const cells = firstRow.queryAll(By.css('td'));
    expect(cells[0].nativeElement.textContent).toContain('101');
    expect(cells[1].nativeElement.textContent).toContain('EUR');
    expect(cells[2].nativeElement.textContent).toContain('Euro');
    expect(cells[3].nativeElement.textContent).toContain('4.3000');
    expect(cells[4].nativeElement.textContent).toContain('2026-05-25');
  });

  it('powinien wyświetlić przycisk fetch-btn', () => {
    fixture.detectChanges();
    const fetchBtn = fixture.debugElement.query(By.css('#fetch-btn'));
    expect(fetchBtn).toBeTruthy();
    expect(fetchBtn.nativeElement.textContent).toContain('Pobierz i zapisz kursy walut');
  });

  it('przycisk fetch-btn powinien być włączony gdy isLoading = false', () => {
    expect(component.isLoading).toBe(false);
    fixture.detectChanges();
    
    const fetchBtn = fixture.debugElement.query(By.css('#fetch-btn'));
    expect(fetchBtn.nativeElement.disabled).toBe(false);
  });

  it('przycisk fetch-btn powinien być wyłączony gdy isLoading = true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    
    const fetchBtn = fixture.debugElement.query(By.css('#fetch-btn'));
    expect(fetchBtn.nativeElement.disabled).toBe(true);
  });

  it('powinien zmienić tekst przycisku na "Pobieranie..." gdy isLoading = true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    
    const fetchBtn = fixture.debugElement.query(By.css('#fetch-btn'));
    expect(fetchBtn.nativeElement.textContent).toContain('Pobieranie...');
  });

  it('powinien wysłać POST żądanie po kliknięciu na przycisk fetch-btn', () => {
    fixture.detectChanges();
    const fetchBtn = fixture.debugElement.query(By.css('#fetch-btn'));
    
    fetchBtn.nativeElement.click();

    const postReq = httpMock.expectOne('http://backend:8000/currencies/fetch');
    expect(postReq.request.method).toBe('POST');
    postReq.flush(mockFetchResponse);

    const getReq = httpMock.expectOne('http://backend:8000/currencies/2026-05-25');
    getReq.flush(mockRates);
    fixture.detectChanges();

    expect(component.infoMessage).toContain('Sukces');
    expect(component.infoMessage).toContain('Pobrano: 3');
  });

  it('powinien ustawić isLoading na true przed wysłaniem POST żądania', () => {
    fixture.detectChanges();
    expect(component.isLoading).toBe(false);
    
    const fetchBtn = fixture.debugElement.query(By.css('#fetch-btn'));
    fetchBtn.nativeElement.click();

    expect(component.isLoading).toBe(true);

    const postReq = httpMock.expectOne('http://backend:8000/currencies/fetch');
    postReq.flush(mockFetchResponse);

    const getReq = httpMock.expectOne('http://backend:8000/currencies/2026-05-25');
    getReq.flush(mockRates);

    expect(component.isLoading).toBe(false);
  });

  it('powinien obsługiwać błąd POST żądania', () => {
    fixture.detectChanges();
    const fetchBtn = fixture.debugElement.query(By.css('#fetch-btn'));
    
    fetchBtn.nativeElement.click();

    const postReq = httpMock.expectOne('http://backend:8000/currencies/fetch');
    postReq.error(new ErrorEvent('Network error'));

    fixture.detectChanges();

    expect(component.isLoading).toBe(false);
    expect(component.infoMessage).toContain('Błąd');
  });

  it('powinien zmienić datę i pobrać nowe dane', () => {
    const newMockRates: CurrencyRate[] = [
      { id: 201, code: 'CHF', currency: 'Frank Szwajcarski', rate: 4.50, rate_date: '2026-05-24' }
    ];

    component.selectedDate = '2026-05-24';
    component.loadRates();

    const getReq = httpMock.expectOne('http://backend:8000/currencies/2026-05-24');
    getReq.flush(newMockRates);
    fixture.detectChanges();

    expect(component.allRates.length).toBe(1);
    expect(component.allRates[0].code).toBe('CHF');
  });

  it('powinien wyświetlić wiadomość "Brak danych" gdy tabela jest pusta', () => {
    component.allRates = [];
    fixture.detectChanges();

    const emptyMessage = fixture.debugElement.query(By.css('.no-data'));
    expect(emptyMessage).toBeTruthy();
    expect(emptyMessage.nativeElement.textContent).toContain('Brak danych');
  });
});