import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ViewLogComponent } from './components/viewlog/viewlog.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ItemTableComponent } from './components/item-table/item-table.component';
import { AccountManagementComponent } from './components/account-management/account-management.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { ItemManagementComponent } from './components/item-management/item-management.component';
import { ItemRegisterComponent } from './components/item-register/item-register.component';
import { ItemQuantityComponent } from './components/item-quantity/item-quantity.component';
import { TotalPriceComponent } from './components/total-price/total-price.component';
import { StoreManagementComponent } from './components/store-management/store-management.component';
import { StoreRegisterComponent } from './components/store-register/store-register.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ViewLogComponent,
    LoginPageComponent,
    NavbarComponent,
    UserInfoComponent,
    CheckOutComponent,
    ItemTableComponent,
    AccountManagementComponent,
    UserTableComponent,
    UserRegisterComponent,
    ItemManagementComponent,
    ItemRegisterComponent,
    ItemQuantityComponent,
    TotalPriceComponent,
    StoreManagementComponent,
    StoreRegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
