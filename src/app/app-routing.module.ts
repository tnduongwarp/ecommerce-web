import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { AuthGuardService } from './service/auth-guard.service';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { MyordersComponent } from './myorders/myorders.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { PostProductComponent } from './post-product/post-product.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'categories/:id',
    component: CategoryComponent,
  },
  {
    path: 'product/:id',
    component: ProductComponent,
  },
  {
    path: 'orders/:id',
    component: OrderdetailsComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'account',
        component: SettingsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'address',
        component: AddressComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'postproduct',
        component: PostProductComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'myproducts',
        component: MyProductsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'orders',
        component: MyordersComponent,
        canActivate: [AuthGuardService],
      },
    ]
  },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
