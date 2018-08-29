import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs/Subscription';
import { Cart } from '../models/cart';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM',
    'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
    'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
    'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW',
    'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA',
    'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'];
  shipping = {}
  subscription: Subscription;
  cart: Cart;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  placeOrder() {
    let order = {
      time: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    }
    console.log(order);
    this.orderService.saveOrder(order);
  }
  

}
