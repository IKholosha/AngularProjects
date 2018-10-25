import {Component, OnInit, ViewChild} from '@angular/core';
import {Trader} from '../domain/Trader';
import {TradersService} from '../traders/traders.service';
import {FormControl} from '@angular/forms';
import {Trade} from '../domain/Trade';
import {Stock} from '../domain/Stock';
import {MarketServiceImpl} from '../market/market.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import {StocksComponent} from './stocks/stocks.component';

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {

  trader: Trader;
  countInput = new FormControl();

  @ViewChild(StocksComponent)
  private stocksComponent: StocksComponent;

  selectedStock: Stock;

  constructor(private tradersService: TradersService, private marketService: MarketServiceImpl, private route: ActivatedRoute, private location: Location)
  {
    this.trader = new Trader('');
    this.countInput.setValue(10);
  }


  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.tradersService.getTrader(params.get('name')))
    ).subscribe((trader: Trader) => this.trader = trader);
  }

  closeTrade(trade: Trade)
  {
    this.marketService.sellStock(trade);
  }

  buyStock()
  {
    if (this.selectedStock == null)
    {
      window.alert('Please select the stock');
      return;
    }
    let trade: Trade =
      this.marketService.buyStock(this.selectedStock.getSymbol(),
        this.countInput.value);
    this.trader.addToPortfolio(trade);

    this.stocksComponent.clean();
    this.selectedStock = null;
  }

  sellStock(trade: Trade): void
  {
    let stock: Stock = trade.getStock();
    trade.close(stock.getPrice());
  }

  onStockSelect(stock: Stock)
  {
    this.selectedStock = stock;
  }

  goBack(): void
  {
    this.location.back();
  }
}
