import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    CartService,
    OrderService
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
  ]
})
export class SharedModule { }
