import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, Directive, DoCheck, Injector, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RestApiService } from '../service/rest-api.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { getInjector } from '../service/injector';

@Directive({
  standalone: true,
  selector: '[base-app]',
})
export class BaseComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{

  protected api: RestApiService;
  protected data: DataService;
  protected injector: Injector;

  public authApiUrl: string ='auth'
  constructor(){
    this.injector = getInjector()
    this.api = this.injector.get(RestApiService);
    this.data = this.injector.get(DataService);
  }
  ngOnDestroy(): void {
  }
  ngAfterViewChecked(): void {
  }
  ngAfterViewInit(): void {
  }
  ngAfterContentChecked(): void {
  }
  ngAfterContentInit(): void {
  }
  ngDoCheck(): void {
  }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  public apiUrl(path: string){
    return `http://localhost:3000/${path}/`;
  }
  public convertNumberToCurrency(x: number){
    return x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
  }
}