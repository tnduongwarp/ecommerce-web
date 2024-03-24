import { Component, Inject, Input } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Router } from '@angular/router';
import { Const } from '../../const/const';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
export interface ModalData {
  cartItems: string;
}
@Component({
  selector: 'order',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
})

export class Order extends BaseComponent {
  public cartItems: any = []
  btnDisabled = false;
  handler: any;
  public orderAddress: string;
  public address: string[];
  public paymentType = 1;
  constructor(private router: Router, @Inject(NZ_MODAL_DATA) public  dataInput: ModalData) {
    super();
    this.orderAddress = JSON.parse(localStorage.getItem('user')!)?.metadata?.defaultAddress || JSON.parse(localStorage.getItem('user')!)?.address[0];
    this.address = JSON.parse(localStorage.getItem('user')!)?.address;
  }

  trackByCartItems(index: number, item: any) {
    return item._id;
  }


  get cartTotal() {
    let total = 0;
    this.cartItems.forEach((data: any, index: any) => {
      total += data.product.price * data.quantity;
    });
    return total + 20000;
  }


  override ngOnInit() {
    console.log("modal", this.dataInput)
    let userId = JSON.parse(localStorage.getItem('user')!)._id;
    if(!userId) this.cartItems = [];
    else this.cartItems = this.dataInput.cartItems;
  }


  checkout() {
    if(this.paymentType === 1){
      let body: any = {};
      body['owner'] = JSON.parse(localStorage.getItem('user')!)._id;
      body['address'] = this.orderAddress;
      body['totalPrice'] = this.cartTotal;
      body['products'] = this.cartItems.map((item: any) => {
        return {
          productId: item.product._id,
          quantity: item.quantity
        }
      });
      body['paymentType'] = this.paymentType;
      this.api.post(Const.API_ORDER, body)
      .then(data => console.log(data))
      .catch(err => console.log(err))
    }
  }
}
