import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class Header implements OnInit {
  _USD: string = 'USD';
  _EUR: string = 'EUR';
  _UAH: string = 'UAH';

  dollar: number = 0;
  euro: number = 0;

  constructor(private httpClient: HttpClient) {}

  @Input() _apikey: string = '';

  ngOnInit(): void {
    this.getList();
  }

  define(data: any) {
    this.dollar = 1 / data['conversion_rates'][this._USD];
    this.euro = 1 / data['conversion_rates'][this._EUR];

    //toFixed
    this.dollar = Math.floor(this.dollar * 10000) / 10000;
    this.euro = Math.floor(this.euro * 10000) / 10000;
  }

  getList() {
    let url = `https://v6.exchangerate-api.com/v6/${this._apikey}/latest/${this._UAH}`;

    this.httpClient.get(url).subscribe((data: any) => this.define(data));
  }
}
