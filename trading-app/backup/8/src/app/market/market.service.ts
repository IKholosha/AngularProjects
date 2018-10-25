import { Injectable } from '@angular/core';
import {Stock} from '../domain/Stock';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  stocks: Stock[];
  constructor() { this.stocks = this.getMockStocks(); }
  private getMockStocks(): Stock[]
  {
    let stocks: Stock[] = [];
    stocks.push(new Stock('BA', 'Boeing'));
    stocks.push(new Stock('CAT', 'Caterpillar'));
    stocks.push(new Stock('KO', 'Coca-Cola'));
    return stocks;
  }
  getStocks(): Stock[]
  {
    return this.stocks;
  }
  add(symbol: string, company: string)
  {
    this.stocks.push(new Stock(symbol, company));
  }
}
