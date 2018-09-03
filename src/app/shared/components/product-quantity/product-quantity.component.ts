import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { CartService } from 'shared/services/cart.service';
import { Cart } from 'shared/models/cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product: Product;
  @Input('cart') cart: Cart;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
