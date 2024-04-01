//app.component.ts- TypeScript file which facilitates authorization and provides logout and search functionality to e learning client application ///


//including required services and modules
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { Const } from './const/const';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as vnStrings } from "ngx-timeago/language-strings/vi";
//Component specific details
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

//exporting the AppComponnet for reuse
export class AppComponent extends BaseComponent{
  searchTerm = '';
  isCollapsed = true;
  public categories = [];
  public presentCategory: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, intl: TimeagoIntl) {
    super();
    intl.strings = vnStrings;
    intl.changes.next();
    this.data.cartItems = this.data.getCart().length;
    this.data.getProfile();
  }

  override ngOnInit(): void {
    this.api.get(Const.API_GET_LIST_CATEGORY)
    .then((res: any) => {
      this.categories = res.data;
    })
    .catch((err) => console.log(err));
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.searchTerm = queryParams['search'];
      this.presentCategory = queryParams['product'];
    })
  }
  get token() {
    return localStorage.getItem('accessToken');
  }

  get avatar(){
    return JSON.parse(localStorage.getItem('user')!).picture;
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown: any) {
    dropdown.close();
  }

  logout() {
    let bodyLogout = {
      refreshToken: localStorage.getItem('refreshToken')
    }
    this.api.post(this.apiUrl(this.authApiUrl)+'logout',bodyLogout)
    .then((res: any) => {
      if(!res.error){
        this.data.user = {};
        this.data.cartItems = 0;
        localStorage.clear();
        this.router.navigate(['']);
      }
    })
    .catch(err => console.log(err))

  }

  search() {
      this.collapse();
      this.routeWithQueryUrl({search: this.searchTerm})
  }

  getCategoryText(name: string){
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  public get queryParams(){
    return this.activatedRoute?.snapshot?.queryParams;
  }
  protected routeWithQueryUrl(query: any, replace = false) {
    let url = this.router.url.split('?')[0];
    let q = replace ? query : Object.assign({},this.queryParams || {}, query);
    this.router.navigate([url], { queryParams: q });
  }
}
