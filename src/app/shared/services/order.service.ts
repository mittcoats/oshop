import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { CartService } from './cart.service';

@Injectable()
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private cart: CartService
  ) { }

  async saveOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.cart.clearCart();
    return result
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrderbyUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    });
  }
}
