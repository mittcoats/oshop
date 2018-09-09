import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Cart } from 'shared/models/cart';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: Cart;
  states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM',
    'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
    'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
    'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW',
    'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA',
    'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'];
  shipping;
  userSub: Subscription;
  userId: string;
  order: Order;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.userSub = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.cart, this.shipping, this.userId)
    let orderSaved = await this.orderService.saveOrder(order);
    this.router.navigate(['/order-success', orderSaved.key]);
  }

}
