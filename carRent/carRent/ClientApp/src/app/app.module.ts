import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { IntlModule } from '@progress/kendo-angular-intl';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import '@progress/kendo-angular-intl/locales/ru/all';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { orderComponent } from './order/order.component';
import { userComponent } from './user/user.component';
import { carComponent } from './car/car.component';
import { OrderServices } from '../Services/services';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    orderComponent,
    userComponent,
    carComponent
    ],
    providers: [OrderServices, { provide: LOCALE_ID, useValue: 'ru'}],

    imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ButtonsModule,
    GridModule,
    IntlModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: orderComponent, pathMatch: 'full' },
      { path: 'user', component: userComponent },
      { path: 'car', component: carComponent },
        ]),
    BsDatepickerModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
