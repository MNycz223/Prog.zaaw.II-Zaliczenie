export interface CurrencyRate {
    id: number;
    code: string;
    currency: string;
    rate: number;
    rate_date: string;
}

export interface FetchResponse {
    message: string;
    count: number;
}