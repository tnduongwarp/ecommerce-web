//Order Details component.ts - Type Script file that contains code to render details of the order to elearning application


//including the required files and services
import { Component, OnInit } from '@angular/core';
import format from 'date-fns/format';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../service/rest-api.service';
import { BaseComponent } from '../base/base.component';
import { Const } from '../const/const';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChatComponent } from '../modals/chat/views/chat/chat.component';
import { ReviewModal } from '../modals/review';

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
  public modalInstance : any;
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
    private modalService: NzModalService
  ) {
    super();
    this.getData = this.getData.bind(this);
  }


  override ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params['id'];
    this.getData();
  }


async getData() {
  if(this.modalInstance) this.modalInstance.close()
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
        if(this.order.status === 'completed') index = 4
        const cssString = `calc(${index*23}% - 30px)`
        let line  = document.getElementById('line-progress');
        line?.style.setProperty('width', cssString)
       },1)
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err)
      })

    }catch (error: any) {
      console.log(error)
    }
  }

  getTextStatus(status: string){
    let tmp = this.statusOrder.find((it: any) => (it.linkStatus === status));
    if(tmp) return tmp?.name.toUpperCase();
    else if(status === 'completed') return 'ĐƠN HÀNG ĐÃ HOÀN THÀNH';
    return 'N/A'
  }

  checkStatusFinish(status: string, statusHistory: any){
    if(this.order.status === 'completed') return true;
    let sth = statusHistory.find((it: any) => (it.status === status));
    if(sth && sth?.when) return true;
    return false;
  }

  getPaymentTypeText(){
    switch(this.order.paymentType){
      case 1: return 'Thanh toán khi nhận hàng';
      case 2: return 'Thanh toán qua Paypal'
    }
  }

  public chatWithShop(shop: any){
    let userId = JSON.parse(localStorage.getItem('user')!)._id;
    this.api.post(`${Const.API_CHAT}/add_receiver/${userId}`, {receiver: shop._id})
    .then((res: any) => {
      this.modalService.create({
        nzTitle: 'Chat',
        nzFooter: null,
        nzMask: false,
        nzWidth: 850,
        nzBodyStyle:{
          padding: '0',
        },
        nzContent: ChatComponent,
        nzData: {
          presentReceiver: shop._id,
          receiver: res.data
        },
      })
    })
    .catch(err => console.log(err))
  }

  openReviewModal(){
    let userId = JSON.parse(localStorage.getItem('user')!)._id;
    this.modalInstance = this.modalService.create({
      nzTitle: 'Đánh giá sản phẩm',
      nzMask: false,
      nzWidth: 600,
      nzStyle: {
        top: '200px'
      },
      nzContent: ReviewModal,
      nzData: {
        owner:userId,
        productId: this.order.products.map((it: any) => it.product._id),
        orderId: this.orderId,
        onOk: () => this.getData()
      }
    })
  }

  getTimeStatusHistory(index: number){
    let status = this.statusOrder[index];
    let s = this.order.statusHistory.find((it: any) => (it.status === status.linkStatus));
    if(s) return this.formatDate(s.when);
    return ''
  }

  isReviewDisabled(){
    return this.order.status === 'completed'
  }

}
