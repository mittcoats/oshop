import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs/Subscription';
import { Cart } from '../models/cart';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';

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
  cartSub: Subscription;
  userSub: Subscription;
  cart: Cart;
  userId: string;
  order: Order;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSub = cart$.subscribe(cart => this.cart = cart)
    this.userSub = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  placeOrder() {
    let order = new Order(this.cart, this.shipping, this.userId)
    this.orderService.saveOrder(order);
  } 

}
