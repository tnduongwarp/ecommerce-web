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
  public statusOrder = [
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
    this.getData()
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
        console.log(this.order)
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err)
      })

    }catch (error: any) {
      this.data.error(error['message']);
    }
  }

}
