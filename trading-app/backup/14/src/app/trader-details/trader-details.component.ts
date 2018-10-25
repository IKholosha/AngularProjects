import { Component, OnInit } from '@angular/core';
import {Trader} from '../domain/Trader';
import {TradersService} from '../traders/traders.service';
import {FormControl} from '@angular/forms';
import {Trade} from '../domain/Trade';
import {Stock} from '../domain/Stock';
import {MarketServiceImpl} from '../market/market.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {

  trader: Trader;
  countInput = new FormControl();
  symbolInput = new FormControl();

  constructor(private tradersService: TradersService, private marketService: MarketServiceImpl, private route: ActivatedRoute, private location: Location)
  {
    this.trader = new Trader('');
    this.countInput.setValue(10);
  }


  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.tradersService.getTrader(params.get('name')))
    );
  }

  closeTrade(trade: Trade)
  {
    this.marketService.sellStock(trade);
  }

  buyStock()
  {
    let trade: Trade =
      this.marketService.buyStock(this.symbolInput.value,
        this.countInput.value);
    if (!trade)
    {
      alert(`symbol ${this.symbolInput.value} not found`);
      return;
    }
    this.trader.addToPortfolio(trade);
    this.symbolInput.setValue('');
  }

  sellStock(trade: Trade): void
  {
    let stock: Stock = trade.getStock();
    trade.close(stock.getPrice());
  }

  goBack(): void
  {
    this.location.back();
  }
}
