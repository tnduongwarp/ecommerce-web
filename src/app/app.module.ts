import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyordersComponent } from './myorders/myorders.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RestApiService } from './service/rest-api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { setInjector } from './service/injector';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { TokenInterceptor } from './http-interceptor';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ForgotPWForm } from './modals/forgot-pw';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { Order } from './modals/order';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { RouterModule } from '@angular/router';
import { NzResultModule } from 'ng-zorro-antd/result';
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from "ngx-timeago";
import { ChatComponent } from './modals/chat/views/chat/chat.component';
import { ChannelComponent } from './modals/chat/views/channel/channel.component';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { ReviewModal } from './modals/review';
import { ReceiverComponent } from './modals/chat/views/receiver/receiver.component';

registerLocaleData(en);

export class MyIntl extends TimeagoIntl {
  // do extra stuff here...
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
    AddressComponent,
    ProductComponent,
    CartComponent,
    MyordersComponent,
    OrderdetailsComponent,
    ForgotPWForm,
    Order,
    ChatComponent,
    ChannelComponent,
    ReviewModal,
    ReceiverComponent
  ],
  imports: [
    TimeagoModule.forRoot({
      intl: { provide: TimeagoIntl, useClass: MyIntl },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    }),
    BrowserModule,
    BrowserAnimationsModule,
    // NgbModalModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzCheckboxModule,
    NzAvatarModule,
    NzNotificationModule,
    NzModalModule,
    NzRadioModule,
    NzSelectModule,
    NzPaginationModule,
    NzImageModule,
    NzCarouselModule,
    NzRateModule,
    NzDividerModule,
    NzInputNumberModule,
    NzMessageModule,
    NzPopconfirmModule,
    NzDatePickerModule,
    NzPageHeaderModule,
    NzTagModule,
    NzTabsModule,
    NzBadgeModule,
    NzResultModule,
    NzTimelineModule
  ],
  providers: [RestApiService, AuthGuardService,
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector){
    setInjector(injector)
  }
 }
