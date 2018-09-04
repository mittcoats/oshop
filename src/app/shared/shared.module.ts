import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CartService } from 'shared/services/cart.service';
import { CategoryService } from 'shared/services/category.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { UserService } from 'shared/services/user.service';

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
