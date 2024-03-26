//product component.ts - Type Script file that contains code to render products to elearning application

//including the required files and services
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { RestApiService } from '../service/rest-api.service';
import { BaseComponent } from '../base/base.component';
import { Const } from '../const/const';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Order } from '../modals/order';

//component specific details
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})

//exporting Product component for reuse
export class ProductComponent extends BaseComponent {
  btnDisabled = false;
  quantity = 1;
  product: any;
  public id: string;
  public modalRef: any

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
    super();
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  override ngOnInit() {
    this.getData()
  }
  public getData(){
    if(this.modalRef) this.modalRef.close();
    if(this.id) this.api.get(Const.API_GET_LIST_PRODUCT + '/' + this.id)
    .then((res: any) => {
      console.log(res.data)
      this.product = res.data;
      setTimeout(() => {
        console.log(this.product)
        let formattedStr = this.product.description.replace(/\n/g, '<br>');
        let description = document.getElementById('description')|| null;
        console.log(description)
        description!.innerHTML = formattedStr;
      }, 2)
    })
    .catch(err => console.log(err))
  }
  addToCart() {
    let userId = JSON.parse(localStorage.getItem('user')!)._id;
    const body = {
      owner: userId,
      productId: this.product._id,
      quantity: this.quantity
    };
    console.log(JSON.parse(localStorage.getItem('user')!))
    this.api.post(Const.API_GET_LIST_PRODUCT + '/add-to-cart',body)
    .then((data: any) => {
      this.message.success('Thêm sản phẩm vào giỏ hàng thành công')
    })
    .catch((err: any) => {
      console.log(err);
      this.message.error(err.error.message)
    })
  }

  public buyNow(){
    let product = {...this.product};
    product.image = product.image[0]
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
        cartItems: [
          {
            product: product,
            quantity: this.quantity
          }
        ],
        refreshCart: () => {
          this.getData();
        },
      },
    });
  }
  async postReview() {
    this.btnDisabled = true;
  }

}
