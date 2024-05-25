import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './components/address/address.component';
import { AuthGuardService } from './service/auth-guard.service';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyordersComponent } from './components/myorders/myorders.component';
import { OrderdetailsComponent } from './components/orderdetails/orderdetails.component';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SettingsComponent } from './components/settings/settings.component';

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
