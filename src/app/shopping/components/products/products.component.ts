import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import 'rxjs/add/operator/switchMap';
import { CartService } from 'shared/services/cart.service';
import { Cart } from 'shared/models/cart';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  //products: Product[] = [];
  filteredProducts: Product[] = [];
  products$;
  category: string;
  cart$: Observable<Cart>;
  subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  async ngOnInit() {
    this.loadProducts();
    this.cart$ = await this.cartService.getCart()
  }

  private loadProducts() {
    this.productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.filterProducts();
      });
  }
  
  private filterProducts() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }

}
