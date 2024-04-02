//Order Details component.ts - Type Script file that contains code to render details of the order to elearning application


//including the required files and services
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../service/rest-api.service';
import { DataService } from '../service/data.service';
import { BaseComponent } from '../base/base.component';
import { Const } from '../const/const';

//component specific details
@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})

//exporting OrderDetails component for reuse
export class OrderdetailsComponent extends BaseComponent {

  orderId: any;
  order: any;
  public isLoading = false;
  public statusOrder: any;
  public statusorderPaymentType2 = [
    {
      name: 'Đơn Hàng Đã Đặt',
      iconType: 'profile',
      linkStatus: 'created'
    },
    {
      name: 'Đơn hàng đã thanh toán',
      iconType: 'dollar-circle',
      linkStatus: 'paid'
    },
    {
      name: 'Đã giao cho ĐVVC',
      iconType: 'car',
      linkStatus: 'inTransit'
    },
    {
      name: 'Đã nhận được hàng',
      iconType: 'download',
      linkStatus: 'getted'
    },
    {
      name: 'Đánh Giá',
      iconType: 'star',
      linkStatus: 'needReview'
    }
  ];
  public statusorderPaymentType1 = [
    {
      name: 'Đơn Hàng Đã Đặt',
      iconType: 'profile',
      linkStatus: 'created'
    },
    {
      name: 'Đã giao cho ĐVVC',
      iconType: 'car',
      linkStatus: 'inTransit'
    },
    {
      name: 'Đã nhận được hàng',
      iconType: 'download',
      linkStatus: 'getted'
    },
    {
      name: 'Đơn hàng đã thanh toán',
      iconType: 'dollar-circle',
      linkStatus: 'paid'
    },
    {
      name: 'Đánh Giá',
      iconType: 'star',
      linkStatus: 'needReview'
    }
  ]
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    super()
  }


  override ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params['id'];
    console.log( this.activatedRoute.snapshot.params)
    this.getData();
  }


async getData() {
    if (!this.orderId) {
      return
    }
    try {
      this.isLoading = true;
      this.api.get(`${Const.API_ORDER}/${this.orderId}`)
      .then((res: any) => {
        this.isLoading = false;
        this.order = res.data;
        if(this.order.paymentType ===1) this.statusOrder = this.statusorderPaymentType1;
        else this.statusOrder = this.statusorderPaymentType2
        console.log(this.order);
       setTimeout(() => {
        let index = 0;
        for(let i = 0; i< this.statusOrder.length; i++){
          if(this.statusOrder[i].linkStatus === this.order.status){
            index = i;
            break;
          };
        }
        const cssString = `calc(${index*25}% - 30px)`
        let line  = document.getElementById('line-progress');
        line?.style.setProperty('width', cssString)
        console.log(line);
       },1)
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err)
      })

    }catch (error: any) {
      this.data.error(error['message']);
    }
  }

  getTextStatus(status: string){
    let tmp = this.statusOrder.find((it: any) => (it.linkStatus === status));
    return tmp?.name.toUpperCase()
  }

  checkStatusFinish(status: string, statusHistory: any){
    let sth = statusHistory.find((it: any) => (it.status === status));
    if(sth && sth?.when) return true;
    return false;
  }

}
