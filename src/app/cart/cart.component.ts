import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';
import { Const } from '../const/const';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Order } from '../modals/order';
import isThisHour from 'date-fns/esm/isThisHour/index.js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})

export class CartComponent extends BaseComponent {
  btnDisabled = false;
  handler: any;
  public cartItems: any = [];
  public quantities: any = [];
  public modalRef: any
  constructor(private router: Router, private modalService: NzModalService) {
    super();
  }

  trackByCartItems(index: number, item: any) {
    return item._id;
  }


  get cartTotal() {
    let total = 0;
    this.cartItems.forEach((data: any, index: any) => {
      if(data.chosen)
        total += data.product.price * data.quantity;
    });
    return total;
  }

  removeProduct(index: any) {
    let productNeedRemove = this.cartItems[index];
    this.api.post(Const.API_CART_URL+'/remove-item', {userId: JSON.parse(localStorage.getItem('user')!)._id, productIds: [productNeedRemove.product._id]})
    .then((data: any) =>{
      this.cartItems = this.cartItems.filter((item: any) => (item.product._id.toString() !== productNeedRemove.product._id));
    })
    .catch((err: any) => {
      console.log(err)
    })
  }

  override ngOnInit() {
    this.getData();
  }

  getData(){
    if(this.modalRef) this.modalRef.close();
    let userId = JSON.parse(localStorage.getItem('user')!)._id;
    if(!userId) this.cartItems = [];
    else{
      this.api.get(Const.API_CART_URL + '/'+ userId).then((data: any) => {
        console.log(data)
        this.cartItems = data.data.products;
        this.cartItems.forEach((item: any) => {
          item['chosen'] = false
        })
      })
      .catch(err => console.log(err))
    }
  }

  checkout() {
    console.log(this.cartItems)
    this.modalRef = this.modalService.create({
      nzTitle: 'Mua hàng',
      nzFooter: null,
      nzWidth: '100%',
      nzMaskClosable: false,
      nzBodyStyle: {
        'height': '100%',
        'top': '0',
        'overflow': 'auto',
      },
      nzContent: Order,
      nzData: {
        cartItems: this.cartItems.filter((it: any) => (it.chosen)),
        refreshCart: () => {
          this.getData();
        },
      },
    });
  }
  public goToShop(product: any){
    return this.router.navigate(['/'],{queryParams: {shop: product.owner._id}})
  }
}
