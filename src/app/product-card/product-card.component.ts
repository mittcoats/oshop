import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('cart') cart;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getQuantity() {
    if(!this.cart) return 0;

    let item = this.cart.items[this.product.$key]
    return item ? item.quantity : 0;
  }
}
