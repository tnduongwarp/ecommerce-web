//Homecomponent.ts - Type Script file that contains code to render home page  to elearning application

//including the required files and services
import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { RestApiService } from '../service/rest-api.service';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Const } from '../const/const';

//component specific details
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

//Exporting the HomeComponent
export class HomeComponent extends BaseComponent {
  public products: any  = [];
  public isLoading: boolean = false;
  public sortBy: any;
  public sortByPrice: any;
  public pageIndex = 1;
  public pageSize = 12;
  public total: number = 0;
  public skip = 0;
  constructor(public router : Router, public activatedRoute: ActivatedRoute) {
    super();
  }

  override ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams: any) => {

      this.sortByPrice = queryParams['price'];
      this.sortBy = queryParams['sortBy'];
      let condition: any = {}
      if(queryParams?.page){
        condition.skip = (this.pageIndex - 1)*this.pageSize;
        condition.limit = this.pageSize
      }else{
        this.routeWithQueryUrl({page: 1})
      }
      if(queryParams?.product) {
        condition['product'] = queryParams.product
      }else{
        return this.routeWithQueryUrl({product: 'all'});
      };
      if(queryParams?.search) condition['search'] = queryParams.search;
      if(queryParams?.price || queryParams?.sortBy){
        let sort: any = {}
        if(queryParams?.price) sort.price = queryParams.price;
        if(queryParams?.sortBy) sort.sortBy = queryParams.sortBy;
        condition['sort'] = JSON.stringify(sort);
      };
      let qs = new URLSearchParams(condition).toString();
      this.isLoading = true;
      this.api.get(`${Const.API_GET_LIST_PRODUCT}`+'?'+qs)
      .then((res: any) => {
        this.total=50
        console.log(res);
        this.isLoading = false;
        // this.products = res.list_data;
        this.skip = res.skip;
        this.total = res.total;
        this.products = [...res.list_data,...res.list_data,...res.list_data,...res.list_data,...res.list_data];
      })
      .catch(err => console.log(err))
    });


  }

  public get queryParams(){
    let q = JSON.parse(JSON.stringify(this.activatedRoute?.snapshot?.queryParams))
    return q;
  }
  protected routeWithQueryUrl(query: any, replace = false) {
    let url = this.router.url.split('?')[0];
    let q = replace ? query : Object.assign(this.queryParams || {}, query);
    this.router.navigate([url], { queryParams: q });
  }
  public filterByPriceChange(event: any){
    console.log(event)

    let currentQ = this.queryParams;
    if(event){
      let q = Object.assign({}, currentQ, {price: event});
      this.routeWithQueryUrl(q);
    }else{
      if(currentQ?.price) delete currentQ.price;
      this.routeWithQueryUrl(currentQ, true);
    }
  }
  public filterRadioChange(event: any){
    let currentQ = this.queryParams;
    if(event){
      let q = Object.assign({}, currentQ, {sortBy: event});
      this.routeWithQueryUrl(q);
    }else{
      if(currentQ?.sortBy) delete currentQ.sortBy;
      this.routeWithQueryUrl(currentQ, true);
    }
  }
  onChangePage(event: any){
    this.pageIndex = event;
    let currentQ = this.queryParams;
    let q = Object.assign({}, currentQ, {page: event});
    this.routeWithQueryUrl(q);
  }
}