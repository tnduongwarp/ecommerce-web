//setting component.ts - Type Script file that contains code to provide seettings  to elearning application

//including the required files and services
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Const } from '../const/const';
import { NzMessageService } from 'ng-zorro-antd/message';

//componnet specific details
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

//exporting settings component
export class SettingsComponent extends BaseComponent {
  public btnDisabled = false;
  public user: any;
  public isEditting = false;
  public formControl: any;

  constructor(private message: NzMessageService) {
    super();
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.formControl = {
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      isSeller: this.user.isSeller,
      metadata: {
        phone: this.user?.metadata?.phone,
        gender: this.user?.metadata?.gender,
        dateOfBirth: this.user?.metadata?.dateOfBirth
      }
    }
  }

   override ngOnInit() {

  }
  onBtnSave(){
    if(!this.user._id) return
    this.api.post(`${Const.API_USER}/${this.user._id}`, this.formControl).then(
      (res: any) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        this.isEditting = false;
        this.message.success('Chỉnh sửa thông tin thành công')
      }
    ).catch((err: any) => {
      console.log(err)
      this.message.error(err.error.message)
    })
  }
}
