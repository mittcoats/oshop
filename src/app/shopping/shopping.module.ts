import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
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
  declarations: [
    ProductsComponent,
    CartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    OrdersComponent,
    ProductFilterComponent,
    CartSummaryComponent,
    ShippingFormComponent
  ]
})
export class ShoppingModule { }
