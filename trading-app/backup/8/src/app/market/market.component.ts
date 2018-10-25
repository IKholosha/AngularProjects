import { Component, OnInit } from '@angular/core';
import {Stock} from '../domain/Stock';
import {MarketService} from './market.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  stocks: Stock[];
  constructor(private marketService: MarketService)
  {
    this.stocks = [];
  }
  ngOnInit()
  {
    this.updateStocks();
  }
  private updateStocks()
  {
    this.stocks = this.marketService.getStocks();
  }
  add(symbol: string, company: string)
  {
    this.marketService.add(symbol, company);
    this.updateStocks();
  }

}
