import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent extends BaseComponent {
  public user: any;
  constructor() {
    super()
   }

  override ngOnInit() {
     this.user = JSON.parse(localStorage.getItem('user')!);
     console.log(window.location.pathname.split('/').includes('account'))
  }

  isSelected(item: string){
    return window.location.pathname.split('/').includes(item)? true: false
  }
}