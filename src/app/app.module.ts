import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular5-data-table';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'environments/environment';
import { CustomFormsModule } from 'ng2-validation';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { AppComponent } from './app.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductsComponent } from './products/products.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    OrdersComponent,
    ProductFilterComponent,
    CartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    AdminModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CustomFormsModule,
    DataTableModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'order-success/:id',
        component: OrderSuccessComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'my/orders',
        component: OrdersComponent,
        canActivate: [AuthGuardService]
      },
    ])
  ],
  providers: [AdminAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
