import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart$;

  constructor(private cart: CartService) { }

  async ngOnInit() {
    this.cart$ = await this.cart.getCart();
  }

}
