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
  constructor(private router: Router, @Inject(NZ_MODAL_DATA) public  dataInput: ModalData) {
    super();
  }

  trackByCartItems(index: number, item: any) {
    return item._id;
  }


  get cartTotal() {
    let total = 0;
    this.cartItems.forEach((data: any, index: any) => {
      total += data.product.price * data.quantity;
    });
    return total;
  }


  override ngOnInit() {
    console.log("modal", this.dataInput)
    let userId = JSON.parse(localStorage.getItem('user')!)._id;
    if(!userId) this.cartItems = [];
    else this.cartItems = this.dataInput.cartItems;
  }


  checkout() {
  }
}
