import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from './models/product';
import { Cart } from './models/cart';
import 'rxjs/add/operator/map';
import { Observable } from '../../node_modules/rxjs/Observable';

@Injectable()
export class CartService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  private create() {
    return this.db.list('/carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<Cart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/carts/' + cartId)
      .map(x => new Cart(x.items));
  }

  private getCartItem(cartId: string, productId: string) {
    return this.db.object('/carts/' + cartId + '/items/' + productId)
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    this.updateQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateQuantity(product, -1);
  }

  private async updateQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getCartItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      item$.update({ product: product, quantity: (item.quantity || 0) + change});
    })
  }
}
