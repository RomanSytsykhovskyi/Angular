import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  _currency: any;
  _listCurrencyName: any;

  leftSelectedValue: string = '';
  leftCurrency: number = 0;

  rightSelectedValue: string = '';
  rightCurrency: number = 0;

  constructor(private httpClient: HttpClient) {}

  @Input() _apikey: string = '';

  ngOnInit(): void {
    this.getEveryCurrency();
  }

  define(data: any) {
    this._currency = data['conversion_rates'];
    this._listCurrencyName = Object.keys(this._currency);
  }

  getEveryCurrency() {
    let url = `https://v6.exchangerate-api.com/v6/${this._apikey}/latest/USD`;

    this.httpClient.get(url).subscribe((data: any) => this.define(data));
  }

  leftSelectHandler(event: any) {
    this.leftSelectedValue = event.value;

    if (!!this.rightSelectedValue && this.leftSelectedValue !== undefined) {
      this.fromTo();
    }
  }

  rightSelectHandler(event: any) {
    this.rightSelectedValue = event.value;

    if (!!this.leftSelectedValue && this.rightSelectedValue !== undefined) {
      this.reversedFromTo();
    }
  }

  leftInputHandler(event: any) {
    this.leftCurrency = event.target.value;

    this.fromTo();
  }

  rightInputHandler(event: any) {
    this.rightCurrency = event.target.value;

    this.reversedFromTo();
  }

  fromTo() {
    this.rightCurrency =
      (this.leftCurrency * this._currency[this.rightSelectedValue]) /
      this._currency[this.leftSelectedValue];
  }

  reversedFromTo() {
    this.leftCurrency =
      (this.rightCurrency * this._currency[this.leftSelectedValue]) /
      this._currency[this.rightSelectedValue];
  }
}
