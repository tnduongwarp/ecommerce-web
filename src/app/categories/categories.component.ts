//Categories component.ts - Type Script file that contains code to render Categories feature to elearning application

//including the required files and services
import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../service/rest-api.service';
import { DataService } from '../service/data.service';

//Component specifications
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

//exporting the categories component
export class CategoriesComponent implements OnInit {
  categories: any;

  newCategory = '';
  btnDisabled = false;

  constructor(
    public data: DataService,
    public rest: RestApiService
  ) { }

  async ngOnInit() {
    try {
      const data: any = await this.rest.get(
        'http://localhost:3030/api/categories'
      );
      data['success']
        ? (this.categories = data['categories'])
        : this.data.error(data['message']);
    } catch (error: any) {
      this.data.error(error['message']);
    }
  }

  async addCategory() {
    this.btnDisabled = true;
    try {
      const data: any = await this.rest.post(
        'http://localhost:3030/api/categories',
        { category: this.newCategory }
      );
      data['success']
        ? this.data.success(data['message'])
        : this.data.error(data['message']);
    } catch (error: any) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

}
