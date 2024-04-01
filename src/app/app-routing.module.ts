import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { AuthGuardService } from './service/auth-guard.service';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { MyordersComponent } from './myorders/myorders.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { PostProductComponent } from './post-product/post-product.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'orders/:id',
    component: OrderdetailsComponent,
    canActivate: [AuthGuardService]
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
