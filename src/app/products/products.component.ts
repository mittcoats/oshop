import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';

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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {

    productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap
      })
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
    
  }

  ngOnInit() {
  }

}
