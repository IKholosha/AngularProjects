import { Component, OnInit } from '@angular/core';
import {Trader} from '../domain/Trader';
import {TradersService} from '../traders/traders.service';
import {FormControl} from '@angular/forms';
import {Trade} from '../domain/Trade';

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {

  trader: Trader;
  countInput = new FormControl();
  symbolInput = new FormControl();

  constructor(private tradersService: TradersService)
  {
    this.trader = new Trader('');
  }
  ngOnInit()
  {
    this.tradersService.getTrader('Oleg').then(trader => this.trader = trader);
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
}
