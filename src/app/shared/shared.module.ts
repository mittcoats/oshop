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

import { FormsModule } from '../../../node_modules/@angular/forms';
import { NgbModule } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from '../../../node_modules/angular5-data-table';
import { AngularFireAuthModule } from '../../../node_modules/angularfire2/auth';
import { AngularFireDatabaseModule } from '../../../node_modules/angularfire2/database';
import { CustomFormsModule } from '../../../node_modules/ng2-validation';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    CustomFormsModule,
    NgbModule.forRoot(),
    AngularFireAuthModule,
    AngularFireDatabaseModule
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

    CommonModule,
    FormsModule,
    DataTableModule,
    CustomFormsModule,
    NgbModule.forRoot().ngModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ]
})
export class SharedModule { }
