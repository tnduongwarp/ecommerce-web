//Address component.ts - Type Script file that contains code to render adddress feature to elearning application


//including the required files and services
import { Component, OnInit } from '@angular/core';
import { FormControl, FormRecord, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { Const } from '../const/const';
import { NzMessageService } from 'ng-zorro-antd/message';


//componnet files specifications
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})


//exporting the addtess component
export class AddressComponent extends BaseComponent {
  addressForm: FormRecord<FormControl<string>> = this.fb.record({});
  listOfControl: Array<{ id: number; controlInstance: string }> = [];
  isEditting = false;
  defaultAddr: string = '';
  address: any = [];
  addField(addr? : string,e?: MouseEvent): void {
    e?.preventDefault();

    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `addr${id}`
    };
    const index = this.listOfControl.push(control);
    this.addressForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      this.fb.control(addr? addr : '', Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.addressForm.removeControl(i.controlInstance);
    }
  }

  submitForm(): void {
    if (this.addressForm.valid) {
      const address = Object.values(this.addressForm.value);
      console.log(address);
      const id = JSON.parse(localStorage.getItem('user')!)._id;
      if(!id) return;
      this.api.post(`${Const.API_USER}/${id}`, {address}).then(
        (res: any) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.address = res.data?.address;
          this.defaultAddr = res.data?.metadata?.defaultAddress;
          this.onBtnEdit();
          this.message.success('Chỉnh sửa địa chỉ thành công')
        }
      ).catch((err: any) => {
        console.log(err);
        this.message.error(err.error.message)
      })
    } else {
      Object.values(this.addressForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onBack(){
    this.router.navigate(['/profile/account'])
  }
  constructor(private fb: NonNullableFormBuilder, private router: Router, private message: NzMessageService) {
    super();
  }

  override ngOnInit(): void {
    this.address = JSON.parse(localStorage.getItem('user')!)?.address;
    this.defaultAddr = JSON.parse(localStorage.getItem('user')!)?.metadata?.defaultAddress;
    if(!this.address)
      this.addField();
    else{
      for(let item of this.address){
        this.addField(item);
      }
    }
    Object.values(this.addressForm.controls).forEach(control => {
     control.disable();
    });
  }
  onBtnEdit(){
    this.isEditting = !this.isEditting
    Object.values(this.addressForm.controls).forEach(control => {
      if(this.isEditting) control.enable();
      else control.disable()
     });
  }

  isDefaultAddress(listOfControlItem: {id: number; controlInstance: string}){
    return this.addressForm.get(listOfControlItem.controlInstance)?.value == this.defaultAddr
  }

  changeDefaultAddress(event: string){
    let metadata = JSON.parse(localStorage.getItem('user')!)?.metadata;
    metadata['defaultAddress'] = event;
    const id = JSON.parse(localStorage.getItem('user')!)._id;
      if(!id) return;
      this.api.post(`${Const.API_USER}/${id}`, {metadata}).then(
        (res: any) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.address = res.data?.address;
          this.defaultAddr = res.data?.metadata?.defaultAddress;
          this.message.success('Chỉnh sửa địa chỉ mặc định thành công')
        }
      ).catch((err: any) => {
        console.log(err);
        this.message.error(err.error.message)
      })
  }
}
