import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';

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

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/carts/' + cartId)
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
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getCartItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      item$.update({ product: product, quantity: (item.quantity || 0) + 1});
    })
  }
}
