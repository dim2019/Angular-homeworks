import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HTTPdata, HTTPdataBindedRates } from './currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  currencyArray: string[]   = []
  selectedValue: any
  form: FormGroup = new FormGroup({});
  protected regex = "^[0-9.]*$"



  cuarrencyValue1: string = 'EUR'
  cuarrencyValue2: string = 'EUR'
  AllDataAboutCurrency: any



  firstInputValue: number = 1;
  SecondInputValue: number = 1;


  ExchangeRateFirst: number = 1;
  ExchangeRateSecond: number = 1;


  SumSecondInput: number = 1;
  SumFirstInput: number = 1;


  


  constructor(private http: HttpClient, public fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      curencyType1: [this.SumFirstInput,[Validators.pattern(this.regex)]],
      curencyType2: [this.SumSecondInput,[Validators.pattern(this.regex)]]
    })
  const data = this.http.get<HTTPdata>('http://api.exchangeratesapi.io/v1/latest?access_key=43ebf96c29fd3b1dadb7503706db5605&format=1&fbclid=IwAR29psA_a2VD4HmECqbJftUM5wxCKbpLYS7CEGyL-0oUTowe9TYDZMdzx3U')

  data
  .subscribe(e=>{
    this.AllDataAboutCurrency = e.rates   
    for(let key in e.rates){    
      this.currencyArray.push(key)
    }
  })

  
  }


  onKeyUpInputOne(event: any){
    this.firstInputValue = event.target.value
    let sum = this.firstInputValue / this.ExchangeRateFirst * this.ExchangeRateSecond
    this.SumSecondInput = sum
    

    this.SumFirstInput = this.firstInputValue
  
    
    
  }
  onKeyUpInputTwo(event: any){
    this.SecondInputValue = event.target.value
    let sum = this.SecondInputValue / this.ExchangeRateSecond *this.ExchangeRateFirst
    this.SumFirstInput = sum
    

    this.SumSecondInput = this.SecondInputValue

    
  }
  activitySelectorForFirstInput(clickedCurrency: any){
    this.cuarrencyValue1 = clickedCurrency.target.value
    const rateData = this.http.get<HTTPdataBindedRates>(`http://api.exchangeratesapi.io/v1/latest?access_key=43ebf96c29fd3b1dadb7503706db5605&symbols=${this.cuarrencyValue1}&format=1`)    
    rateData.subscribe(e=>{
      let curent = this.cuarrencyValue1   
      let intedValue = e.rates[curent]

      this.ExchangeRateFirst = intedValue

      let sum = (this.SumFirstInput / this.ExchangeRateFirst ) * this.ExchangeRateSecond
      this.SumSecondInput = sum
      this.SecondInputValue = sum
    })    
  }
  activitySelectorForSecondInput(clickedCurrency: any){
    this.cuarrencyValue2 = clickedCurrency.target.value
    const rateData = this.http.get<HTTPdataBindedRates>(`http://api.exchangeratesapi.io/v1/latest?access_key=43ebf96c29fd3b1dadb7503706db5605&symbols=${this.cuarrencyValue2}&format=1`)    
    rateData.subscribe(e=>{
      let curent = this.cuarrencyValue2
      let intedValue = e.rates[curent]
      
      this.ExchangeRateSecond = intedValue  

      let sum = (this.SumSecondInput / this.ExchangeRateSecond) * this.ExchangeRateFirst
      this.SumFirstInput = sum
      this.firstInputValue = sum
    })    
    
  }

}

