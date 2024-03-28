//my-orders component.ts - Type Script file that contains code to render orders to elearning application

//including the required files and services
import { Component, OnInit } from '@angular/core';

import { RestApiService } from '../service/rest-api.service';
import { DataService } from '../service/data.service';
import { BaseComponent } from '../base/base.component';
import { Const } from '../const/const';
import { ActivatedRoute, Router } from '@angular/router';

//component specific details
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})

//exporting orders component
export class MyordersComponent extends BaseComponent {

  public myorders: any = [];
  public presentTab = null;
  public isLoading: boolean = true;
  public OrderTab = [
    {
      name: 'Tất cả',
      total: 0,
      link:'all'
    },
    {
      name: 'Chờ lấy hàng',
      total: 0,
      link:'created'
    },
    {
      name: 'Đang giao hàng',
      total: 0,
      link:'inProgress'
    },
    {
      name: 'Hoàn thành',
      total: 0,
      link:'completed'
    }
  ]
  constructor(public router : Router, private activatedRoute: ActivatedRoute) {
    super();
    if(!this.activatedRoute?.snapshot?.queryParams['tab']){
      let url = this.router.url;
      this.router.navigate([url], {queryParams: {tab: 'all'}})
    }
  }

  override ngOnInit() {
    this.activatedRoute.queryParams.subscribe(q => {
      let status = q['tab'];
      if(status !== this.presentTab){
        this.presentTab = status;
        this.getData(q)
      }
    })

  }

  public getData(q: any){
    this.isLoading = true;
    const userId = JSON.parse(localStorage.getItem('user')!)._id;
    let qs = new URLSearchParams(q).toString();
    this.api.get(`${Const.API_ORDER}/${userId}?${qs}`).then(
      (res: any) => {
        this.myorders = res.data.orderItems;
        for(let tab of this.OrderTab){
          tab.total = res.data.sumary[tab.link];
        }
        this.isLoading = false
      }
    ).catch(err => {
      console.log(err);
      this.isLoading = false
    })
  }

  public getStatusText(status: string){
    switch(status){
      case 'created': return 'Người bán đang chuẩn bị hàng'
      case 'inProgress': return 'Đang giao hàng'
      case 'completed': return 'Đã hoàn thành'
    }
  }

}
